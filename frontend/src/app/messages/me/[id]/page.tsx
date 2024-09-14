"use client";

import { format } from "date-fns";
import Link from "next/link";
import { NavigationLayout } from "#/components/NavigationLayout";
import { useSentMessage } from "./use-sent-message";
import { useSentMessageReplies } from "./use-sent-message-replies";

type PageProps = {
  params: { id: string };
};

export default function MessagesDetailPage({ params: { id } }: PageProps) {
  const { data, isLoading } = useSentMessage();
  const { data: repliesData, isLoading: repliesIsLoading } =
    useSentMessageReplies();

  if (repliesIsLoading || !repliesData) return null;
  if (isLoading || !data) return null;
  return (
    <NavigationLayout>
      <Link
        href="/messages/me"
        className="inline-flex items-center gap-x-2.5 text-sm text-blue-600 decoration-2 font-semibold"
      >
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          className="flex-shrink-0 w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        すべての送信メッセージ
      </Link>
      <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl py-5 px-4 md:p-5 mt-4 leading-6 text-base font-normal">
        {data.message?.content}
      </div>
      <section className="mt-8">
        <p className="text-lg font-bold leading-normal">届いたメッセージ</p>
        <ul className="space-y-2 mt-4">
          {repliesData.replies.map((reply) => (
            <li>
              <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
                {reply.content}
              </div>
              <p className="mt-1 text-xs font-medium leading-4 text-gray-500">
                {format(new Date(reply.createdAt), "yyyy/MM/dd hh:mm")}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </NavigationLayout>
  );
}
