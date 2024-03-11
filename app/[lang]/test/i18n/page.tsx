"use client";

import { Button, Title } from "@mantine/core";
import Link from "next/link";

export default function i18nTest({
  params: { lang },
}: {
  params: { lang: string };
}) {
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
