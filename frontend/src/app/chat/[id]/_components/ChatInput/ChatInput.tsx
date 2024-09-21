"use client";
import type { FC } from "react";
import { usePostChat } from "./use-post-chat";

export const ChatInput: FC<{ updateChat: () => void, disabled: boolean }> = ({ updateChat, disabled }) => {
  const { text, setText, handleAction, isLoading } = usePostChat(updateChat);
  return (
    <>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        disabled={disabled || isLoading}
        placeholder="ぷれーすほるだぁ"
      />
      <button onClick={handleAction} disabled={disabled || isLoading} type="button">
        ✈
      </button>
    </>
  );
};
