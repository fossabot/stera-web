import Image from "next/image";
import Link from "next/link";
import { Button, Title, Text, Center, Divider, Modal } from "@mantine/core";
import { getDictionary } from "./dicts";
import { VAR_SERVER_NAME } from "@/libs/common/commonVar";
import { getDispLang } from "./langSC";
import { LangSelectCC } from "./langCC";

import { MuseoModerno } from "next/font/google"

const classMuseoModerno = MuseoModerno({
  subsets: ['latin'],
  display: 'swap',
})

export default async function Landing() {
  const dispLang = await getDispLang()
  const dict = await getDictionary(dispLang)
  return (
    <>
      <Center>
        <Title order={1} size={45}>
          <Text
            inherit
            fw={900}
            variant="gradient"
            gradient={{ from: "blue", to: "cyan", deg: 90 }}
            pt={10}
            pb={15}
            className={classMuseoModerno.className}
          >
            {VAR_SERVER_NAME}
          </Text>
        </Title>
      </Center>
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
        <Divider my={20} />
        <LangSelectCC nowDispLang={dispLang} dict={dict} />
    </>
  );
}
