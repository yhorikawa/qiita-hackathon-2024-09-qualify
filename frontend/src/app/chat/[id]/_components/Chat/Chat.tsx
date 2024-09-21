"use client";
import type { FC } from "react";
import { MessageBubble } from "#/components/MessageBubble";
import { ReplyMessage } from "#/components/ReplyMessage";
import { ChatInput } from "../ChatInput";
import { useGetConversationsList } from "./use-get-conversations-list";

export const Chat: FC = () => {
  const { data, mutate } = useGetConversationsList();
  if (!data) return null;

  return (
    <div className="flex flex-col gap-6">
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
  return position === "right" ? (
    <div className="ml-auto">
      <MessageBubble>{message}</MessageBubble>
    </div>
  ) : (
    <div className="mr-auto">
      <ReplyMessage message={message} />
    </div>
  );
};
