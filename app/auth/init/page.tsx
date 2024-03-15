"use server";

import { getDictionary } from "@/app/dicts";
import { getDispLang } from "@/app/langSC";
import { Center, Paper } from "@mantine/core";
import { AuthInitForm } from "./formCC";

export default async function AuthInit() {
  const lang = await getDispLang();
  const dict = await getDictionary(lang);
  return (
    <>
      <Center>
        <Paper
          maw="550px"
          w="95%"
          px="2.5%"
          shadow="sm"
          radius="lg"
          py="20px"
        ><AuthInitForm /></Paper>
      </Center>
    </>
  );
}
