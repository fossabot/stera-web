"use client";

import { Button, Title } from "@mantine/core";
import Link from "next/link";

export default function TestIndex({
  params: { lang },
}: {
  params: { lang: string };
}) {
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
