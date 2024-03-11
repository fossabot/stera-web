"use client";

import { Affix, Text } from "@mantine/core";
import { DateTime } from "luxon";

export function ElapsedAffix() {
  const buildTime = DateTime.fromISO(
    process.env.NEXT_PUBLIC_BUILD_TIME!
  )
    
  const buildElapsed = DateTime.now().diff(buildTime, ["days", "hours"])
    .toObject();

  return (
    <Affix position={{ bottom: 10, right: 10 }}>
      <Text c="gray.1" size="xs">
        {buildElapsed.days}days, {buildElapsed.hours?.toString().slice(0, 3)}hours
      </Text>
    </Affix>
  );
}
