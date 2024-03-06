"use client";

import Image from "next/image";
import NextLink from "next/link";
import { Button, Title } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Title order={1} className="text-center">
        Stera
      </Title>
      <Button.Group>
        <NextLink href="/login" passHref>
          <Button>ログイン</Button>
        </NextLink>
        <NextLink href="/signup" passHref>
          <Button>新規登録</Button>
        </NextLink>
      </Button.Group>
    </>
  );
}
