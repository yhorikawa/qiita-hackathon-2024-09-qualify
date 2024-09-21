"use client";
import type { FC } from "react";
import { useGetConversationsList } from "./use-get-conversations-list";

export const Chat: FC = () => {
  const { data } = useGetConversationsList();
  if (!data) return null;

  return (
    <div>
      {data.data.messages.map(({ sender, message }) => {
        return (
          <ChatItem
            key={message}
            position={sender === "user" ? "right" : "left"}
            message={message}
          />
        );
      })}
    </div>
  );
};

const ChatItem: FC<{ position: "left" | "right"; message: string }> = ({
  position,
  message,
}) => {
  return <div style={{ textAlign: position }}>{message}</div>;
};
