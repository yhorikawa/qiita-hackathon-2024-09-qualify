"use client";

import { PropsWithChildren } from "react";
import { useAuthGuardEffect } from "#/components/use-is-signin";

export default function AuthenticatedLayout({ children }: PropsWithChildren) {
  const { isInitialized } = useAuthGuardEffect();
  if (!isInitialized) return null;
  return <>{children}</>;
}
