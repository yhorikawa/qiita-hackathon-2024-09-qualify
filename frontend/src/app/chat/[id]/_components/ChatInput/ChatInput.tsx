"use client";
import type { FC } from "react";
import { TextArea } from "#/components/TextArea";
import { usePostChat } from "./use-post-chat";

export const ChatInput: FC<{ updateChat: () => void }> = ({ updateChat }) => {
  const { text, setText, handleAction, isLoading } = usePostChat(updateChat);
  return (
    <>
      <TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClick={handleAction}
        disabled={isLoading}
      />
    </>
  );
};
