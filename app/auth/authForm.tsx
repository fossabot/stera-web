"use client";

import { SignupPassword } from "./SignupPassword";
import { login, signup } from "./actions";
import {
  Button,
  Divider,
  Title,
  Text,
  Input,
  PinInput,
  Modal,
  LoadingOverlay,
  Box,
} from "@mantine/core";
import styles from "./authForm.module.css";
import i18nDictionaries from "@/i18n/interface";
import { VAR_SERVER_NAME } from "@/libs/common/commonVar";
import { useEffect, useLayoutEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

export function AuthMainForm({ dict }: { dict: i18nDictionaries }) {
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAllValid, setIsAllValid] = useState<boolean>(false);
  const [urlOrigin, setUrlOrigin] = useState<string>("");
  const [signupPIN, setSignupPIN] = useState<number | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

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
    setProcessing(true);
    try {
      await login(email, password);
    } catch (error: any) {
      console.error(error.message);
      alert(error.message);
    }
  }

  return (
    <Box pos="relative">
      <LoadingOverlay
        visible={processing}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
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
            signupPIN={signupPIN}
            setSignupPIN={(newState: number) => setSignupPIN(newState)}
            urlOrigin={urlOrigin}
            setProcessing={(newState: boolean) => setProcessing(newState)}
          />
        )}
      </div>
      <Divider my={10} />
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
        <Button fullWidth my={3} variant="default" onClick={() => toggle()}>
          {dict.auth.form.switch.toLogin}
        </Button>
      )}
    </Box>
  );
}

function SignupForm({
  dict,
  email,
  setEmail,
  password,
  setPassword,
  signupPIN,
  setSignupPIN,
  urlOrigin,
  setProcessing
}: {
  dict: i18nDictionaries;
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
  signupPIN: number | null;
  setSignupPIN: any;
  urlOrigin: string;
  setProcessing: any;
}) {
  const [isAllValid, setIsAllValid] = useState<boolean>(false);
  const [confirmPIN, setConfirmPIN] = useState<number | null>(null);
  async function callSignup() {
    setProcessing(true);
    const result = await signup(email, password, urlOrigin, signupPIN!);
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
  const [opened, { open, close }] = useDisclosure(false);
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
          inputWrapperOrder={["label", "description", "input", "error"]}
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
          inputWrapperOrder={["label", "description", "input", "error"]}
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
      <div style={{ paddingTop: 10 }}>
        <Input.Wrapper
          label="Signup PIN"
          withAsterisk
          description="新規登録を完了するために必要です"
        >
          <PinInput
            length={4}
            mask
            type="number"
            value={signupPIN?.toString()}
            onChange={(e) => setSignupPIN(Number(e))}
          />
        </Input.Wrapper>
      </div>
      <Modal opened={opened} onClose={close} title="確認" centered>
        <Input.Wrapper
          label="Retype Signup PIN"
          withAsterisk
          description="確認のために、再度PINを入力してください"
        >
          <PinInput
            length={4}
            mask
            type="number"
            value={confirmPIN?.toString()}
            onChange={(e) => setConfirmPIN(Number(e))}
          />
        </Input.Wrapper>
        <Button
          disabled={signupPIN !== confirmPIN}
          onClick={() => callSignup()}
          mt={20}
        >
          登録する
        </Button>
      </Modal>
      <div style={{ paddingTop: 10, paddingBottom: 10 }}>
        <Button fullWidth my={3} disabled={!isAllValid} onClick={() => open()}>
          {dict.auth.signup}
        </Button>
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
