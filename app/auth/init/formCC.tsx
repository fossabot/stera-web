"use client";

import { LinkButton } from "@/app/components/extendedUI";
import i18nDictionaries from "@/i18n/interface";
import {
  Button,
  ComboboxItem,
  Modal,
  Select,
  TextInput,
  Textarea,
  Title,
  Tooltip,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

interface formInterface {
  email: string;
  username: string;
  commonBio: string;
  birthday: string;
  gender?: string;
}

export function AuthInitForm({
  dict,
  originalEmailAddr,
}: {
  dict: i18nDictionaries;
  originalEmailAddr: string;
}) {
  const [opened, { open, close }] = useDisclosure(false);
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
      <Button mt={40}>登録を続行</Button>
      <Tooltip
        label="デフォルトでは誕生日と性別は非公開です"
        opened
        position="top"
        offset={2}
      >
        <Button onClick={open} variant="default" mt={40}>
          公開設定を変更
        </Button>
      </Tooltip>
      <LinkButton href="/auth/logout" variant="default" ml="60px" mt={40}>
        {dict.auth.logout}
      </LinkButton>
      <FormShareDataSetting opened={opened} close={close} />
    </div>
  );
}

function FormShareDataSetting({
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
}) {
  const [value, setValue] = useState<ComboboxItem | null>(null);
  return (
    <Modal opened={opened} onClose={close} title="公開設定">
      <Select
        label="誕生日の公開範囲"
        placeholder="Pick value"
        data={[{ value: "0", label: "自分のみ" }]}
        value={value ? value.value : null}
        onChange={(_value, option) => setValue(option)}
        allowDeselect={false}
      />
    </Modal>
  );
}
