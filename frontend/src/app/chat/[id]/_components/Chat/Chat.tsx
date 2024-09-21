"use client";
import type { FC } from "react";
import { ChatInput } from "../ChatInput";
import { useGetConversationsList } from "./use-get-conversations-list";

export const Chat: FC = () => {
  const { data, mutate } = useGetConversationsList();
  if (!data) return null;

  const conversation = data.data.conversation
  const isCompleteChat = conversation.askCount >= 4

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
      {isCompleteChat && <a href={`/api/v1/conversations/${conversation.id}/redirect-document`}>作成した記事を表示する</a>}
      <ChatInput disabled={isCompleteChat} updateChat={mutate} />
    </div>
  );
};

const ChatItem: FC<{ position: "left" | "right"; message: string }> = ({
  position,
  message,
}) => {
  return <div style={{ textAlign: position }}>{message}</div>;
};
