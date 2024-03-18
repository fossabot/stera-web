"use client";

import { LinkButton } from "@/app/components/extendedUI";
import i18nDictionaries from "@/i18n/interface";
import { Title } from "@mantine/core";

export function AuthInitForm({
  dict,
  originalEmailAddr,
}: {
  dict: i18nDictionaries;
  originalEmailAddr?: string;
}) {
  async function callUpdate() {}
  return (
    <div>
      <Title order={2}>{dict.init.form.title}</Title>
      <p>{dict.init.form.intro}</p>
      <LinkButton href="/auth/logout" variant="default" mt={40}>
        {dict.auth.logout}
      </LinkButton>
    </div>
  );
}
