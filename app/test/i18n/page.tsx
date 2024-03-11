import { Button, Title } from "@mantine/core";
import Link from "next/link";
import { getDispLang } from "@/app/langSCscripts";

export default async function i18nTest() {
  const lang = await getDispLang()
  return (
    <>
      <Title order={1}>i18n test</Title>
      <p>Your language: {lang}</p>
      <Link href="/test">
        <Button component="a" variant="default">
          Back to Test Index
        </Button>
      </Link>
    </>
  );
}
