import Image from "next/image";
import type { FC } from "react";
import { Textarea } from "#/components/ui/textarea";
import SendIcon from "./icon/sendIcon.png";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onClick: () => void;
  disabled: boolean;
  errorText?: string;
};

export const TextArea: FC<Props> = ({
  value,
  onChange,
  onClick,
  disabled,
  errorText,
}) => {
  return (
    <>
      <div className="flex bg-white rounded-3xl py-2 pl-4 pr-1 items-center max-h-96">
        <Textarea
          value={value}
          onChange={onChange}
          className="w-full resize-none focus-visible:ring-0 border-none focus-visible:ring-offset-0 py-1"
          placeholder="質問に対する回答を入力してください"
        />
        <button
          onClick={onClick}
          disabled={disabled}
          type="button"
          className="focus:outline-offset-[3px] rounded-full"
        >
          <Image
            src={SendIcon}
            alt="メッセージ送信ボタン"
            width={20}
            height={20}
          />
        </button>
      </div>
      {errorText && <p className="mt-1">{errorText}</p>}
    </>
  );
};
