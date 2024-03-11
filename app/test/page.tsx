"use client";

import { Button, Title } from "@mantine/core";
import { getCookie } from 'cookies-next';
import Link from "next/link";
import { getDispLang } from "../lang";

export default function TestIndex() {
  const lang = getDispLang()
  const rooturl = "/test/";
  return (
    <>
      <Title order={1}>Test index</Title>
      <p>This pages are for testing each functions.</p>
      <Link href={`${rooturl}i18n`}>
        <Button component="a" variant="default">
          i18n
        </Button>
      </Link>
    </>
  );
}
