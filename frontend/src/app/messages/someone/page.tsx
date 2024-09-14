"use client";

import Link from "next/link";
import { NavigationLayout } from "#/components/NavigationLayout";
import { useBottoleMessageList } from "#/components/use-bottle-message-list";

export default function MessagesSomeoneListPage() {
  const { data, isLoading } = useBottoleMessageList();
  if (isLoading || !data) return null;

  return (
    <NavigationLayout>
      <ul className="flex flex-col">
        {data.messages.map((message) => (
          <li
            key={message.id}
            className="inline-flex w-full items-center gap-x-2 text-sm font-medium bg-white border border-gray-200 text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg"
          >
            <Link
              href={`/messages/someone/${message.id}`}
              className="w-full inline-block py-3 px-4 truncate"
            >
              {message.content}
            </Link>
          </li>
        ))}
      </ul>
    </NavigationLayout>
  );
}
