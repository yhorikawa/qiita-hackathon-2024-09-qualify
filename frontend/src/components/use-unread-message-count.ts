import { useMemo } from "react";
import { useBottoleMessageList } from "./use-bottle-message-list";
import { useMarkMessageRead } from "./use-mark-message-read";

export const useUnreadMessageCount = () => {
  const { data } = useBottoleMessageList();
  const [readMessages] = useMarkMessageRead();
  const count = useMemo(() => {
    return (
      data?.messages.filter((message) => !readMessages?.includes(message.id))
        .length ?? 0
    );
  }, [data?.messages, readMessages]);

  return { count };
};
