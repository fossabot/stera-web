"use client";

import { useLayoutEffect, useState } from "react";
import { login, signup } from "./actions";
import { Button, Center, Divider, Title, Text, Paper } from "@mantine/core";
import { LoginForm, SignupForm } from "./authForm";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAllValid, setIsAllValid] = useState<boolean>(false);
  const [urlOrigin, setUrlOrigin] = useState<string>("")

  useLayoutEffect(() => {
    if (location.pathname === "/signup") setAuthMode("signup");
    else setAuthMode("login");
    setUrlOrigin(location.origin)
  }, []);

  function toggle() {
    const newAuthMode = authMode === "login" ? "signup" : "login";
    setAuthMode(newAuthMode);
    window.history.replaceState(null, "", `/${newAuthMode}`);
  }

  async function callLogin() {
    try {
      await login(email, password);
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  }
  async function callSignup() {
    const result = await signup(email, password, urlOrigin);
    if (result.isError) {
      console.error(result.message);
      alert(result.message);
    } else {
      if (result.statusCode === "01") {
        alert(
          "新規登録されました!\n入力されたメールアドレスに、認証リンクが送信されています\n迷惑メールに振り分けられていないか注意してください"
        );
      } else {
        alert("存在し得ないエラーが発生しているようです");
      }
    }
  }
  return (
    <>
      <Center>
        <Paper maw="550px" w="95%" px="2.5%" shadow="sm" radius="lg" py="20px">
          <Title order={2} c="gray.7">
            Steraneml {authMode === "login" ? "ログイン" : "新規登録"}
          </Title>
          <Text>Stera・nemlサーバー共通アカウント{authMode === "login" ? "でログイン" : "を新規登録"}しましょう!</Text>
          <div style={{paddingTop: "15px"}}>{authMode === "login" ? (
            <LoginForm
              email={email}
              setEmail={(newState: string) => setEmail(newState)}
              password={password}
              setPassword={(newState: string) => setPassword(newState)}
              setIsAllValid={(newState: boolean) => setIsAllValid(newState)}
            />
          ) : (
            <SignupForm
              email={email}
              setEmail={(newState: string) => setEmail(newState)}
              password={password}
              setPassword={(newState: string) => setPassword(newState)}
              setIsAllValid={(newState: boolean) => setIsAllValid(newState)}
            />
          )}
          </div>
          <Divider my={15} />
          {authMode === "login" ? (
            <div>
              <Button
                fullWidth
                my={3}
                disabled={!isAllValid}
                onClick={() => callLogin()}
              >
                ログイン
              </Button>
              <Button
                fullWidth
                my={3}
                variant="default"
                onClick={() => toggle()}
              >
                新規登録に切り替える
              </Button>
            </div>
          ) : (
            <div>
              <Button
                fullWidth
                my={3}
                disabled={!isAllValid}
                onClick={() => callSignup()}
              >
                新規登録
              </Button>
              <Button
                fullWidth
                my={3}
                variant="default"
                onClick={() => toggle()}
              >
                ログインに切り替える
              </Button>
            </div>
          )}
        </Paper>
      </Center>
    </>
  );
}
