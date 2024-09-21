import type { FC, PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  isLoading?: boolean;
  isDisabled?: boolean;
  className?: string;
};

export const BaseButton: FC<PropsWithChildren<Props>> = ({
  className = "text-white bg-violet-800 hover:bg-violet-600",
  children,
  isLoading = false,
  isDisabled = false,
}) => {
  return (
    <button
      disabled={isDisabled}
      type="submit"
      className={twMerge(
        className,
        "py-2 px-4 rounded-md font-bold text-lg",
        "focus:outline-offset-[3px]",
        "disabled:bg-black disabled:bg-opacity-35",
        isLoading && "flex gap-2 items-center bg-black bg-opacity-35",
      )}
    >
      {isLoading && (
        <div className="animate-spin h-4 w-4 border-2 border-white rounded-full border-t-transparent" />
      )}
      {children}
    </button>
  );
};
