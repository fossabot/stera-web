"use client"

import Image from "next/image";
import NextLink from "next/link";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";

export default function Home() {
  return (
    <>
      <h1>Stera</h1>
      <span className="p-buttonset">
        <NextLink href="/login" passHref>
          <Button label="ログイン" />
        </NextLink>
        <NextLink href="/signup" passHref>
        <Button label="新規登録" />
        </NextLink>
      </span>
    </>
  );
}
