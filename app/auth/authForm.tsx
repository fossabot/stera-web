"use client";

import { SignupPassword } from "./SignupPassword";
import { login, signup } from "./actions";
import { Button, Divider, Title, Text, Input } from "@mantine/core";
import styles from "./authForm.module.css";
import i18nDictionaries from "@/i18n/interface";
import { VAR_SERVER_NAME } from "@/libs/common/commonVar";
import { useEffect, useLayoutEffect, useState } from "react";

export function AuthMainForm({ dict }: { dict: i18nDictionaries }) {
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
        {authMode === "login"
          ? dict.auth.form.intro.login
          : dict.auth.form.intro.signup}
      </Text>
      <div style={{ paddingTop: "15px" }}>
        {authMode === "login" ? (
          <LoginForm
            dict={dict}
            email={email}
            setEmail={(newState: string) => setEmail(newState)}
            password={password}
            setPassword={(newState: string) => setPassword(newState)}
            setIsAllValid={(newState: boolean) => setIsAllValid(newState)}
          />
        ) : (
          <SignupForm
            dict={dict}
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
            {dict.auth.login}
          </Button>
          <Button fullWidth my={3} variant="default" onClick={() => toggle()}>
            {dict.auth.form.switch.toSignup}
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
            {dict.auth.signup}
          </Button>
          <Button fullWidth my={3} variant="default" onClick={() => toggle()}>
            {dict.auth.form.switch.toLogin}
          </Button>
        </div>
      )}
    </>
  );
}

function SignupForm({
  dict,
  email,
  setEmail,
  password,
  setPassword,
  setIsAllValid,
}: {
  dict: i18nDictionaries;
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
  }, [email, password, isValidPassword, setIsAllValid]);
  return (
    <div>
      <div>
        <Input.Wrapper
          label={dict.auth.emailAddress}
          description={dict.auth.form.note.noTempEmailAddr}
          error={isValidEmail(email) ? "" : dict.auth.form.invalid.emailAddress}
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
          description={dict.auth.form.note.notRECSamePassword}
          error={isValidPassword ? "" : dict.auth.form.invalid.password}
          inputWrapperOrder={["label", "input", "description", "error"]}
        >
          <SignupPassword
            dict={dict}
            title={dict.auth.password}
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
  dict,
  email,
  setEmail,
  password,
  setPassword,
  setIsAllValid,
}: {
  dict: i18nDictionaries;
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
  }, [email, password, isValidPassword, setIsAllValid]);
  return (
    <>
      <div>
        <Input.Wrapper
          label={dict.auth.emailAddress}
          description={dict.auth.form.note.noTempEmailAddr}
          error={isValidEmail(email) ? "" : dict.auth.form.invalid.emailAddress}
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
          label={dict.auth.password}
          description={dict.auth.form.note.notRECSamePassword}
          error={isValidPassword ? "" : dict.auth.form.invalid.password}
          inputWrapperOrder={["label", "input", "description", "error"]}
        >
          <SignupPassword
            dict={dict}
            title=""
            placeholder="*********"
            value={password}
            setValue={(newState: string) => setPassword(newState)}
            setValid={(newState: boolean) => setIsValidPassword(newState)}
          />
        </Input.Wrapper>
      </div>
    </>
  );
}
