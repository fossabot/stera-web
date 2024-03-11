"use client";

import { SignupPassword } from "./SignupPassword";
import { login, signup } from "./actions";
import { Button, Divider, Title, Text, Input } from "@mantine/core";
import styles from "./authForm.module.css";
import i18nDictionaries from "@/i18n/interface";
import { VAR_SERVER_NAME } from "@/libs/common/commonVar";
import { useEffect, useLayoutEffect, useState } from "react";

export function AuthMainForm({dict}: {dict: i18nDictionaries}) {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAllValid, setIsAllValid] = useState<boolean>(false);
  const [urlOrigin, setUrlOrigin] = useState<string>("");
  useLayoutEffect(() => {
    if (location.pathname === "/signup") setAuthMode("signup");
    else setAuthMode("login");
    setUrlOrigin(location.origin);
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
      <Title order={2} c="gray.7">
        {VAR_SERVER_NAME}{" "}
        {authMode === "login" ? dict.auth.login : dict.auth.signup}
      </Title>
      <Text>
        {VAR_SERVER_NAME}サーバーアカウント
        {authMode === "login" ? "でログイン" : "を新規登録"}しましょう!
      </Text>
      <div style={{ paddingTop: "15px" }}>
        {authMode === "login" ? (
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
          <Button fullWidth my={3} variant="default" onClick={() => toggle()}>
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
          <Button fullWidth my={3} variant="default" onClick={() => toggle()}>
            ログインに切り替える
          </Button>
        </div>
      )}
    </>
  );
}

function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
  setIsAllValid,
}: {
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
  setIsAllValid: any;
}) {
  const isValidEmail = (val: string) =>
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      val
    );
  const [isValidPassword, setIsValidPassword] = useState(false);
  useEffect(() => {
    const IAV = isValidEmail(email) && isValidPassword;
    setIsAllValid(IAV);
  }, [email, password, isValidPassword, isValidPassword]);
  return (
    <div>
      <div>
        <Input.Wrapper
          label="メールアドレス"
          description="捨てメアドは使用せず、継続的に利用できるアドレスで登録してください"
          error={isValidEmail(email) ? "" : "無効なメールアドレスです"}
          inputWrapperOrder={["label", "input", "description", "error"]}
          withAsterisk
        >
          <Input
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={isValidEmail(email) ? undefined : "p-invalid"}
            placeholder="your@email.addr"
            classNames={{ input: styles.input }}
          />
        </Input.Wrapper>
      </div>
      <div style={{ paddingTop: 10 }}>
        <Input.Wrapper
          withAsterisk
          label="パスワード"
          description="パスワードの使いまわしはお勧めしません"
          error={isValidPassword ? "" : "安全ではないパスワードです"}
          inputWrapperOrder={["label", "input", "description", "error"]}
        >
          <SignupPassword
            title=""
            placeholder="*********"
            value={password}
            setValue={(newState: string) => setPassword(newState)}
            setValid={(newState: boolean) => setIsValidPassword(newState)}
          />
        </Input.Wrapper>
      </div>
    </div>
  );
}

function LoginForm({
  email,
  setEmail,
  password,
  setPassword,
  setIsAllValid,
}: {
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
  setIsAllValid: any;
}) {
  return <></>;
}
