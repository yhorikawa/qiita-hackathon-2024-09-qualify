import { useParams, useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const fetcher = async (
  messageId: string,
  { arg }: { arg: { content: string } },
) => {
  const res = await client.api.v1.messages[":messageId"].replies.$post({
    param: { messageId },
    json: {
      content: arg.content,
    },
  });
  if (!res.ok) throw new Error(String(res.status));
  return res.ok;
};

export const usePostComment = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params.id;
  const onSuccess = useCallback(() => {
    router.push("/messages/someone/sent");
  }, [router]);
  const { trigger } = useSWRMutation(id, fetcher, { onSuccess });
  const [text, setText] = useState<string>("");
  const action = useCallback(() => {
    trigger({ content: text });
  }, [trigger, text]);
  const handleAction = useCallback(() => action(), [action]);

  return {
    text,
    setText,
    handleAction,
  };
};
