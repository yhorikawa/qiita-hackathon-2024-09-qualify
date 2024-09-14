"use client";

import Lottie from "lottie-react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { NavigationLayout } from "#/components/NavigationLayout";
import animationData from "./animation.json";

export default function MessagesSentPage() {
  return (
    <NavigationLayout>
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="w-[168px] h-[168px] rounded-3xl overflow-hidden m-auto mt-14"
      />
      <div className="mt-5 text-center">
        <p className="w-full inline-flex justify-center text-lg leading-normal font-semibold">
          メッセージが
          <br />
          送り主のもとへ流れていきました
        </p>
        <Link
          href="/messages/someone"
          className={twMerge(
            "px-4 py-3.5 sm:p-5 inline-flex min-w-52 items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none",
            "mt-16",
          )}
        >
          届いたメッセージの一覧にもどる
        </Link>
      </div>
    </NavigationLayout>
  );
}
