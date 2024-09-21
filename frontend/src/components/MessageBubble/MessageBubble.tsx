import type { FC, PropsWithChildren } from "react";

export const MessageBubble: FC<PropsWithChildren> = ({ children }) => {
  return <p className="rounded-3xl py-6 px-4 bg-violet-50">{children}</p>;
};
