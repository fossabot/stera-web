"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Title, Text, Center } from "@mantine/core";

export default function Home() {
  return (
    <>
      <Center>
        <Title order={1}>
          <Text
            inherit
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            py={10}
          >
            Stera
          </Text>
        </Title>
      </Center>
      <Button.Group>
        <Link href="/login">
          <Button component="a" variant="default">
            ログイン
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            新規登録
          </Button>
        </Link>
      </Button.Group>
    </>
  );
}
