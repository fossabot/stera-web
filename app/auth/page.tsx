"use client";
import { deleteCookie, getCookie } from "cookies-next";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { login, signup } from "./actions";

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
          <Button label="ログイン" onClick={() => login(email, password)} />
          <Button label="新規登録" onClick={() => toggle()} />
        </div>
      ) : (
        <div>
          <Button label="新規登録" onClick={() => signup(email, password)} />
          <Button label="ログイン" onClick={() => toggle()} />
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
  const isValidPassword = (val: string) => val.length <= 6;
  return (
    <div>
      <div className="flex flex-column gap-2 mt-10">
        <span className="p-float-label">
          <InputText
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={isValidEmail(email) ? undefined : "p-invalid"}
          />
          <label htmlFor="username">Email</label>
        </span>
        {email === "" ? (
          <small id="email-help">捨てメアドでの登録は禁止しております</small>
        ) : isValidEmail(email) ? (
          <small>有効です</small>
        ) : (
          <small id="email-help">有効なメールアドレスではありません</small>
        )}
      </div>
      <div className="flex flex-column gap-2 mt-10">
        <span className="p-float-label">
          <InputText
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={isValidPassword(email) ? undefined : "p-invalid"}
          />
          <label htmlFor="password">Password</label>
        </span>
        {email === "" ? (
          <small id="email-help">6文字以上で設定してください</small>
        ) : isValidPassword(email) ? (
          <small>有効です</small>
        ) : (
          <small id="email-help">6文字以上で設定してください</small>
        )}
      </div>
    </div>
  );
}
