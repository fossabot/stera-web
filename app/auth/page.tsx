"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { login, signup } from "./actions";
import { Box, Button, Center, Divider } from "@mantine/core";
import { SignupForm } from "./authForm";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function toggle() {
    const newAuthMode = authMode === "login" ? "signup" : "login";
    setAuthMode(newAuthMode);
    window.history.replaceState(null, "", `/${newAuthMode}`);
  }

  useEffect(() => {
    const cookieAuthMode = getCookie("authMode") ?? "login";
    console.log(cookieAuthMode);
    setAuthMode(cookieAuthMode as "login" | "signup");
    window.history.replaceState(null, "", `/${cookieAuthMode}`);
    setTimeout(() => {
      deleteCookie("authMode");
    }, 10);
  }, []);

  return (
    <>
      <Center>
        <Box>
          {authMode === "login" ? undefined : (
            <SignupForm
              email={email}
              setEmail={(newState: string) => setEmail(newState)}
              password={password}
              setPassword={(newState: string) => setPassword(newState)}
            />
          )}
          <Divider my={15} />
          {authMode === "login" ? (
            <div>
              <Button fullWidth my={3} onClick={() => login(email, password)}>
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
              <Button fullWidth my={3} onClick={() => signup(email, password)}>
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
        </Box>
      </Center>
    </>
  );
}
