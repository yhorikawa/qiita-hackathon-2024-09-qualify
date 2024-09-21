"use client";
import type { FC } from "react";
import { ChatInput } from "../ChatInput";
import { useGetConversationsList } from "./use-get-conversations-list";

export const Chat: FC = () => {
  const { data, mutate } = useGetConversationsList();
  if (!data) return null;

  return (
    <div>
      {data.data.messages.map(({ sender, message, id }) => {
        return (
          <ChatItem
            key={id}
            position={sender === "user" ? "right" : "left"}
            message={message}
          />
        );
      })}
      <ChatInput updateChat={mutate} />
    </div>
  );
};

const ChatItem: FC<{ position: "left" | "right"; message: string }> = ({
  position,
  message,
}) => {
  return <div style={{ textAlign: position }}>{message}</div>;
};
