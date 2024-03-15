import { Center, Divider, Text, Textarea, Title } from "@mantine/core";
import { fontMuseoModerno } from "../font";
import { getDispLang } from "../langSC";
import { getDictionary } from "../dicts";
import { getCookie } from "cookies-next";
import { cookies } from "next/headers";

export default async function ErrorPage() {
  const dispLang = await getDispLang();
  const dict = await getDictionary(dispLang);
  const errorCookie = getCookie("error", {cookies})
  const errorDetail = errorCookie ? decodeURIComponent(errorCookie) : dict.error.page.noDescription
  return (
    <>
      <Center>
        <Title
          order={1}
          c="red.7"
          size={50}
          pt={20}
          pb={15}
          className={fontMuseoModerno.className}
        >
          Error
        </Title>
      </Center>
      <Center>
        <Text>{dict.error.page.apologize}</Text>
      </Center>
      <Center><Divider my={40} w="90%" /></Center>
      <Center>
      <Textarea w="70%" label="Error detail" maw="600px" readOnly value={errorDetail} />
      </Center>
    </>
  );
}