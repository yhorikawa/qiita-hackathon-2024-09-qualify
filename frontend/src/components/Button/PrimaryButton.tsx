import type { FC, PropsWithChildren } from "react";
import { BaseButton } from "./BaseButton";

export const PrimaryButton: FC<PropsWithChildren> = ({ children }) => {
  return <BaseButton>{children}</BaseButton>;
};
