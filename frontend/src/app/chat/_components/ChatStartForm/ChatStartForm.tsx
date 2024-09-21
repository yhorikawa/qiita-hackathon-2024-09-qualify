"use client";
import { type FC, useId } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { usePostConversations } from "./use-post-conversations";

export const ChatStartForm: FC = () => {
  const textareaId = useId();
  const { text, setText, handleAction, isLoading } = usePostConversations();
  return (
    <>
      <div>
        <TextareaAutosize
          id={textareaId}
          value={text}
          onInput={(e) => setText(e.currentTarget.value)}
          className="py-6 px-4 block w-full border-gray-200 rounded-lg text-sm"
          minRows={30}
          cacheMeasurements={true}
          placeholder="AIに壁打ちしてもらうための骨子を入力しましょう"
          disabled={isLoading}
        />
      </div>
      <div className="text-right mt-4">
        {/** TODO:後で時間があったらコンポーネントに置き換える */}
        <button
          onClick={handleAction}
          type="button"
          disabled={isLoading}
          className="text-white rounded-md py-2 px-4 bg-violet-800 hover:bg-violet-600 focus:bg-violet-600 focus:outline-offset-[3px]"
        >
          AIアシスト開始
        </button>
      </div>
    </>
  );
};
