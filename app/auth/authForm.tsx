"use client";

import { Input } from "@mantine/core";
import { SignupPassword } from "./SignupPassword";
import { useEffect, useState } from "react";
import styles from "./authForm.module.css";

export function SignupForm({
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

export function LoginForm({
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
