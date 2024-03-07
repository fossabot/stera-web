"use client";

import {
  PasswordInput,
  Progress,
  Text,
  Popover,
  Box,
  rem,
} from "@mantine/core";
import { useState } from "react";

export function SignupPassword({
  title,
  placeholder,
  value,
  setValue,
}: {
  title: string;
  placeholder: string;
  value: string;
  setValue: any;
}) {
  // パスワード処理
  // https://mantine.dev/core/password-input/#strength-meter-example
  // TIPS: ハイフンは、最初が最後に指定しないと、範囲指定と認識されてしまう
  const requirements = [
    { re: /[0-9]/, label: "数字を含む" },
    { re: /[a-z]/, label: "小文字のアルファベットを含む" },
    { re: /[A-Z]/, label: "大文字のアルファベットを含む" },
    { re: /[-$&+,:;=?@#|'<>.^*()%!_"]/, label: "記号を含む" },
  ];
  const [popoverOpened, setPopoverOpened] = useState(false);
  //   const [value, setValue] = useState("");
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

    return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
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
          />
        </div>
      </Popover.Target>
      <Popover.Dropdown>
        <Progress color={color} value={strength} size={5} mb="xs" />
        <PasswordRequirement label="6文字以上" meets={value.length > 5} />
        {checks}
      </Popover.Dropdown>
    </Popover>
  );
}
