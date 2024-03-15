"use client";

import { Button, ButtonProps } from "@mantine/core";
import Link, { LinkProps } from "next/link";

interface LinkButtonProps extends ButtonProps {
  href: string | object;
  replace?: boolean;
  scroll?: boolean;
  prefetch?: boolean | undefined;
}
export function LinkButton({ href, replace = false, scroll = true, prefetch = undefined, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} replace={replace} scroll={scroll} prefetch={prefetch}>
      <Button {...props}>{children}</Button>
    </Link>
  );
}
