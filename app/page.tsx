"use client";

import Image from "next/image";
import Link from "next/link";
import { Button, Title, Text, Center } from "@mantine/core";
import { getDictionary } from "./dicts";
import { SERVER_NAME, VAR_DEFAULT_DISPLANG } from "@/libs/common/commonVar";
import { getDispLang } from "./lang";
import { useLayoutEffect, useState } from "react";
import enUS from "../i18n/en-US.json";

export default async function Landing() {
  const [lang, setLang] = useState(VAR_DEFAULT_DISPLANG);
  const [dict, setDict] = useState(enUS);
  useLayoutEffect(() => {
    (async () => {
      const refreshedLang = "ja";
      setLang(refreshedLang);
      setDict(await getDictionary(refreshedLang));
    })();
  }, []);
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
