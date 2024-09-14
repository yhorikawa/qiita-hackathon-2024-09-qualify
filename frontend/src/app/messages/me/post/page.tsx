"use client";

import TextareaAutosize from "react-textarea-autosize";

import Link from "next/link";
import { useId } from "react";
import { twMerge } from "tailwind-merge";
import { NavigationLayout } from "#/components/NavigationLayout";
import { usePostMessage } from "./use-post-message";

export default function MessagesPage() {
  const textareaId = useId();
  const { text, setText, handleAction, isLoading } = usePostMessage();
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
      <div className={twMerge("pt-0.5", "mt-4")}>
        <label htmlFor={textareaId} className="block text-sm mb-2 font-bold">
          送るメッセージ
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
          placeholder="誰かに伝えたいことを書こう"
        />
      </div>
      <button
        type="button"
        onClick={handleAction}
        className={twMerge(
          "px-4 py-3.5 sm:p-5 flex items-center justify-center gap-x-2 text-base font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
          "mt-4 ml-auto",
        )}
      >
        メッセージを送る
      </button>
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">
          <div className="w-full h-full bg-black bg-opacity-80 flex justify-center items-center">
            <div className="inline-flex justify-center items-center h-[2.875rem] w-[2.875rem] text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
              <span
                className="animate-spin inline-block w-4 h-4 border-[3px] border-current border-t-transparent text-white rounded-full"
                role="status"
                aria-label="loading"
              >
                <span className="sr-only">Loading...</span>
              </span>
            </div>
          </div>
        </div>
      )}
    </NavigationLayout>
  );
}
