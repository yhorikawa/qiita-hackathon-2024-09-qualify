import type { NextPage } from "next";
import { Chat } from "./_components";
import { ChatInput } from "./_components/ChatInput";

const Page: NextPage = async () => {
  return (
    <>
      <Chat />
      <ChatInput />
    </>
  );
};

export default Page;
