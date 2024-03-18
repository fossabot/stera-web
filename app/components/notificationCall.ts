"use client"

import { notifications } from "@mantine/notifications";
// import { useLayoutEffect } from "react";

const commonProp = {
  withBorder: true,
  radius: "lg",
};

export function showSuccessNotification(title: string, message: string, autoClose = true) {
    notifications.show({
      color: "green",
      title,
      message,
      ...commonProp,
    });
}

export function showErrorNotification(title: string, message: string, autoClose = true) {
  notifications.show({
    color: "red",
    title,
    message,
    autoClose,
    ...commonProp,
  });
}

export function showInfoNotification(title: string, message: string, autoClose = true) {
  notifications.show({
    color: "blue",
    title,
    message,
    ...commonProp,
  });
}