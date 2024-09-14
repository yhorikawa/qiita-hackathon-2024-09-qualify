"use client";

import Link from "next/link";
import { useId, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { twMerge } from "tailwind-merge";
import { NavigationLayout } from "#/components/NavigationLayout";
import { useMarkMessageReadEffect } from "#/components/use-mark-message-read";
import { useBottoleMessage } from "./use-bottle-message";
import { usePostComment } from "./use-post-comment";

type PageProps = {
  params: { id: string };
};

export default function MessagesSomeoneDetailPage({
  params: { id },
}: PageProps) {
  const textareaId = useId();
  const { text, setText, handleAction } = usePostComment();
  const { data, isLoading } = useBottoleMessage();
  useMarkMessageReadEffect(Number.parseInt(id, 10));
  if (isLoading || !data) return null;
  return (
    <NavigationLayout>
      <Link
        href="/messages/someone"
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
        すべての届いたメッセージ
      </Link>
      <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-xl py-5 px-4 md:p-5 mt-4 leading-6 text-base font-normal">
        {data.message?.content}
      </div>
      <div className={twMerge("pt-0.5", "mt-4")}>
        <label htmlFor={textareaId} className="block text-sm mb-2 font-bold">
          このメッセージに返信する
        </label>
        <TextareaAutosize
          id={textareaId}
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          className={twMerge(
            "py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
          )}
          minRows={10}
          cacheMeasurements={true}
          placeholder="送り主に伝えたいことを書こう"
        />
      </div>
      <button
        type="button"
        onClick={handleAction}
        className={twMerge(
          "px-4 py-3.5 sm:p-5 flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
          "mt-4 ml-auto",
        )}
      >
        メッセージを送る
      </button>
    </NavigationLayout>
  );
}
