"use client";
import { type FC, useId } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ReplyMessage } from "#/components/ReplyMessage";
import { usePostConversations } from "./use-post-conversations";

export const ChatStartForm: FC = () => {
  const textareaId = useId();
  const { text, setText, handleAction, isLoading } = usePostConversations();
  return (
    <>
      <div className="flex">
        <TextareaAutosize
          id={textareaId}
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          className=" py-3 px-4 block w-full border-gray-200 rounded-lg text-sm"
          minRows={30}
          cacheMeasurements={true}
          placeholder="AIに壁打ちしてもらうための骨子を入力しましょう"
          disabled={isLoading}
        />
      </div>
      <div className="fleo flex-row-reverse">
        <button
          onClick={handleAction}
          type="button"
          disabled={isLoading}
          className="bg-black text-white p-3"
        >
          壁打ちスタート
        </button>
      </div>
      <ReplyMessage message="AIが壁打ちを開始しました。" conversationId="1" />
    </>
  );
};
