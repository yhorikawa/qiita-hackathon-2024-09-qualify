"use client";
import type { FC } from "react";
import { MessageBubble } from "#/components/MessageBubble";
import { ReplyMessage } from "#/components/ReplyMessage";
import { ChatInput } from "../ChatInput";
import { useGetConversationsList } from "./use-get-conversations-list";

export const Chat: FC = () => {
  const { data, mutate } = useGetConversationsList();
  if (!data) return null;

  const conversation = data.data.conversation;
  const isCompleteChat = conversation.askCount >= 4;

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
      {isCompleteChat && (
        <a href={`/api/v1/conversations/${conversation.id}/redirect-document`}>
          作成した記事を表示する
        </a>
      )}
      <ChatInput disabled={isCompleteChat} updateChat={mutate} />
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
