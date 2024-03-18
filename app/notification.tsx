"use client";

import { useEffect, useLayoutEffect } from "react";
import { showSuccessNotification } from "./components/notificationCall";

export function CheckFactorParam({ factor }: { factor: string | undefined }) {
  useLayoutEffect(() => {
    if (factor === "successLogout") {
      showSuccessNotification("Logout success", "We hope we will see you again!", true);
    }
  }, []);

  return <></>;
}
