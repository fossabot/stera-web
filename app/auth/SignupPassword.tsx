"use client";

import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  rem,
  Divider,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import styles from "./authForm.module.css";
import i18nDictionaries from "@/i18n/interface";

export function SignupPassword({
  dict,
  title,
  placeholder,
  value,
  setValue,
  setValid,
}: {
  dict: i18nDictionaries;
  title: string;
  placeholder: string;
  value: string;
  setValue: any;
  setValid: any;
}) {
  // パスワード処理
  // https://mantine.dev/core/password-input/#strength-meter-example
  // TIPS: ハイフンは、最初が最後に指定しないと、範囲指定と認識されてしまう
  const requirements = [
    { re: /[0-9]/, label: dict.auth.form.requirements.includeNumber },
    { re: /[a-z]/, label: dict.auth.form.requirements.includeLowercaseAlphabet },
    { re: /[A-Z]/, label: dict.auth.form.requirements.includeUppercaseAlphabet },
    { re: /[-$&+,:;=?@#|'<>.^*()%!_"]/, label: dict.auth.form.requirements.includeSymbol },
  ];
  const [popoverOpened, setPopoverOpened] = useState(false);
  //   const [value, setValue] = useState("");
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(value)}
    />
  ));
  const strength = getStrength(value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";
  function getStrength(password: string) {
    let multiplier = password.length > 5 ? 0 : 1;

    requirements.forEach((requirement) => {
      if (!requirement.re.test(password)) {
        multiplier += 1;
      }
    });
    const resStrength = Math.max(
      100 - (100 / (requirements.length + 1)) * multiplier,
      10
    );
    const booleanStrength = resStrength == 100 ? true : false;
    setValid(booleanStrength);
    return resStrength;
  }
  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      width="target"
      transitionProps={{ transition: "pop" }}
    >
      <Popover.Target>
        <div
          onFocusCapture={() => setPopoverOpened(true)}
          onBlurCapture={() => setPopoverOpened(false)}
        >
          <PasswordInput
            withAsterisk
            label={title}
            placeholder={placeholder}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
            classNames={{ input: styles.input }}
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label={dict.auth.form.requirements.moreThan10Characters} meets={value.length >= 10} />
        {checks}
        <Divider my={10} />
        <Link
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.nisc.go.jp/pr/column/20220705.html"
        >
          <Text component="a" size="xs">
            内閣サイバーセキュリティセンター(NISC)による、「インターネットの安全・安心ハンドブック」に基づいています
          </Text>
        </Link>
      </Popover.Dropdown>
    </Popover>
  );
}

function PasswordRequirement({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}) {
  return (
    <Text
      c={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center" }}
      mt={7}
      size="sm"
    >
      {meets ? <span>*</span> : <span>X</span>} <Box ml={10}>{label}</Box>
    </Text>
  );
}
