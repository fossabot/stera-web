"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Title, Text, Center } from "@mantine/core";
import { getDictionary } from "./dicts";
import { SERVER_NAME } from "@/libs/common/commonVar";

export default async function Landing({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = getDictionary(lang);
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
            {SERVER_NAME}
          </Text>
        </Title>
      </Center>
      <Button.Group>
        <Link href="/login">
          <Button component="a" variant="default">
            {dict.auth.login}
          </Button>
        </Link>
        <Link href="/signup">
          <Button
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
          >
            {dict.auth.signup}
          </Button>
        </Link>
      </Button.Group>
    </>
  );
}
