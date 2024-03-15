import { Center, Paper } from "@mantine/core";
import { getDictionary } from "../dicts";
import { getDispLang } from "../langSC";
import { AuthMainForm } from "./authForm";

export default async function AuthPage() {
  const lang = await getDispLang();
  const dict = await getDictionary(lang);

  return (
    <>
      <Center style={{ height: "98vh" }}>
        <Paper withBorder maw="550px" w="93%" px="2.5%" shadow="sm" radius="lg" py="20px">
          <AuthMainForm dict={dict} />
        </Paper>
      </Center>
    </>
  );
}
