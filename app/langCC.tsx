"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, NativeSelect, Text } from "@mantine/core";
import i18nDictionaries from "@/i18n/interface";
import { useEffect, useState } from "react";
import { deleteCookie, setCookie } from "cookies-next";

export function LangSelectCC({
  nowDispLang,
  dict,
}: {
  nowDispLang: string;
  dict: i18nDictionaries;
}) {
  const [opened, { open, close }] = useDisclosure(false);
  const [dispLang, setDispLang] = useState<string>(nowDispLang);

  const languages = [
    { value: "RESET", label: "Reset to default value" },
    { value: "ja", label: "日本語" },
    { value: "enUS", label: "English" },
  ];

  useEffect(() => {
    if (dispLang === "RESET") {
      deleteCookie("dispLang");
    } else {
      setCookie("dispLang", dispLang);
    }
    setTimeout(() => {
      if (nowDispLang !== dispLang) window.location.reload();
    }, 10);
  }, [dispLang, nowDispLang]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={dict.settings.settings}
        centered
        overlayProps={{
          blur: 3,
        }}
      >
        <NativeSelect
          value={dispLang}
          onChange={(event) => setDispLang(event.currentTarget.value)}
          data={languages}
        />
        <Text size="sm">
          Attention: Page will automatically reload after changing language
          setting
        </Text>
      </Modal>

      <Button variant="default" onClick={open}>
        {dict.settings.settings}
      </Button>
    </>
  );
}

// const combobox = useCombobox({
//   onDropdownClose: () => combobox.resetSelectedOption(),
//   onDropdownOpen: (eventSource) => {
//     if (eventSource === "keyboard") {
//       combobox.selectActiveOption();
//     } else {
//       combobox.updateSelectedOptionIndex("active");
//     }
//   },
// });
// const options = languages.map((item) => (
//   <Combobox.Option
//     value={item.value}
//     key={item.value}
//     active={item.value === dispLang}
//   >
//     <Group gap="xs">
//       {item.value === dispLang && <CheckIcon size={12} />}
//       <span>{item.label}</span>
//     </Group>
//   </Combobox.Option>
// ));
