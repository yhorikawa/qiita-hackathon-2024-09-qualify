import { useEffect } from "react";
import useSWR from "swr";
import { client } from "#/lib/client";

const fetcher = async (_: string) => {
  const res = await client.api.v1.messages.sent.$get();
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
};

export const useSentMessageList = () => {
  const swr = useSWR("/api/v1/messages/sent", fetcher);
  return swr;
};
