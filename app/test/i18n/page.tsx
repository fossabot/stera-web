"use client";

import { Button, Title } from "@mantine/core";
import Link from "next/link";
import { getCookie } from 'cookies-next';
import { getDispLang } from "@/app/lang";

export default function i18nTest() {
  const lang = getDispLang()
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
