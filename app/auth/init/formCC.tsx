"use client";

import { LinkButton } from "@/app/components/extendedUI";
import i18nDictionaries from "@/i18n/interface";
import { TextInput, Textarea, Title } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect } from "react";
import { useForm } from "@mantine/form";

interface formInterface {
  email: string;
  username: string;
  commonBio: string;
  birthday: string;
  gender: string;
}

export function AuthInitForm({
  dict,
  originalEmailAddr,
}: {
  dict: i18nDictionaries;
  originalEmailAddr: string;
}) {
  useEffect(() => {
    window.history.replaceState(null, "", "/auth/init");
  }, []);
  const form = useForm({
    initialValues: {
      email: originalEmailAddr,
      username: "",
      handleId: "",
      commonBio: "",
      birthday: "",
      gender: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      username: (value) => value !== "",
      handleId: (value) => false,
      commonBio: (value) => true,
      birthday: (value) => true,
      gender: (value) => true,
    },
  });
  async function callUpdate(formValue: formInterface) {}
  return (
    <div>
      <Title order={2}>{dict.init.form.title}</Title>
      <p>{dict.init.form.intro}</p>
      <form
        style={{ marginTop: "10px" }}
        onSubmit={form.onSubmit((values) => callUpdate(values))}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          readOnly
          disabled
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Username"
          placeholder="Stera (Coloca)"
          error="ERROR"
          {...form.getInputProps("username")}
        />
        <TextInput
          withAsterisk
          label="Handle ID"
          description="NOTE: You can change handle ID any time, as other values"
          placeholder="stera"
          disabled
          error="ERROR"
          {...form.getInputProps("handleId")}
        />
        <Textarea
          label="Common Bio"
          description=""
          placeholder="Write your profile! This bio will be shown at each service."
          {...form.getInputProps("commonBio")}
        />
        <DateInput
          clearable
          label="Birthday"
          description="We keep it secret unless you share it"
          placeholder="****/**/**"
          {...form.getInputProps("birthday")}
        />
      </form>
      <LinkButton href="/auth/logout" variant="default" mt={40}>
        {dict.auth.logout}
      </LinkButton>
    </div>
  );
}
