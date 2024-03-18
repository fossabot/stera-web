"use server";

import { getDictionary } from "@/app/dicts";
import { getDispLang } from "@/app/langSC";
import { Center, Paper } from "@mantine/core";
import { AuthInitForm } from "./formCC";
import { getUserData } from "./dataSC";

export default async function AuthInit() {
  const lang = await getDispLang();
  const dict = await getDictionary(lang);
  const userData = await getUserData()
  return (
    <>
      <Center style={{ height: "98vh" }}>
        <Paper
          maw="550px"
          w="95%"
          px="2.5%"
          shadow="sm"
          radius="lg"
          py="20px"
          withBorder
          pos="relative"
        ><AuthInitForm dict={dict} originalEmailAddr={userData!.email!} /></Paper>
      </Center>
    </>
  );
}
