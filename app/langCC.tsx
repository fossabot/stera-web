"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button } from "@mantine/core";
import i18nDictionaries from "@/i18n/interface";

export function LangSelectCC({dict}: {dict: i18nDictionaries}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={dict.settings.settings} centered>
        {/* Modal content */}
      </Modal>

      <Button variant="default" onClick={open}>{dict.settings.settings}</Button>
    </>
  );
}
