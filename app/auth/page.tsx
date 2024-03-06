"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import { login, signup } from "./actions";
import { Button, Input } from "@mantine/core";
import { SignupPassword } from "./SignupPassword";

export default function AuthPage() {
  const [authmode, setAuthmode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  function toggle() {
    const newAuthmode = authmode === "login" ? "signup" : "login";
    setAuthmode(newAuthmode);
    window.history.replaceState(null, "", `/${newAuthmode}`);
  }

  useEffect(() => {
    const cookieAuthmode = getCookie("authmode") ?? "login";
    console.log(cookieAuthmode);
    setAuthmode(cookieAuthmode as "login" | "signup");
    window.history.replaceState(null, "", `/${cookieAuthmode}`);
    setTimeout(() => {
      deleteCookie("authmode");
    }, 10);
  }, []);

  return (
    <>
      {authmode === "login" ? undefined : (
        <SignupForm
          email={email}
          setEmail={(newState: string) => setEmail(newState)}
          password={password}
          setPassword={(newState: string) => setPassword(newState)}
        />
      )}
      {authmode === "login" ? (
        <div>
          <Button onClick={() => login(email, password)}>ログイン</Button>
          <Button onClick={() => toggle()}>新規登録</Button>
        </div>
      ) : (
        <div>
          <Button onClick={() => signup(email, password)}>新規登録</Button>
          <Button onClick={() => toggle()}>ログイン</Button>
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

  return (
    <div>
      <div>
        <Input.Wrapper
          label="メールアドレス"
          description="捨てメアドは使用せず、継続的に利用できるアドレスで登録してください"
          error="Input error"
          inputWrapperOrder={['label', 'input', 'description', 'error']}
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
      <div>
        <SignupPassword
          title="パスワード"
          placeholder="*********"
          value={password}
          setValue={(newState: string) => setPassword(newState)}
        />
      </div>
    </div>
  );
}
