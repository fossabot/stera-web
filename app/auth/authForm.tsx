"use client";

import { Input } from "@mantine/core";
import { SignupPassword } from "./SignupPassword";
import { useState } from "react";

export function SignupForm({
  email,
  setEmail,
  password,
  setPassword,
}: {
  email: string;
  setEmail: any;
  password: string;
  setPassword: any;
}) {
  const isValidEmail = (val: string) =>
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      val
    );
  const [isValidPassword, setIsValidPassword] = useState(false);
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
          />
        </Input.Wrapper>
      </div>
      <div style={{ paddingTop: 10 }}>
        <Input.Wrapper
          withAsterisk
          label="パスワード"
          description="パスワードの使いまわしは非推奨です"
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
