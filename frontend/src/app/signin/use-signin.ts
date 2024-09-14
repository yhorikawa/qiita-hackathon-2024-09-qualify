import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import useSWRMutation from "swr/mutation";
import { client } from "#/lib/client";

const fetcher = async (
  _url: string,
  { arg }: { arg: { userName: string } },
) => {
  const result = await client.api.v1.auth.register.$post({
    json: { userName: arg.userName },
  });
  const data = await result.json();
  if (Object.hasOwn(data, "message")) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    throw new Error((data as any).message);
  }
  return data;
};

class AlreadySignInError extends Error {
  constructor() {
    super();
    this.name = "AlreadySignInError";
  }
}

const signInFetcher = async (
  _url: string,
  { arg }: { arg: { userName: string } },
) => {
  const result = await client.api.v1.auth.signin.$post({
    json: { userName: arg.userName },
  });
  const data = await result.json();
  if (Object.hasOwn(data, "message")) {
    if (result.status === 401) {
      throw new AlreadySignInError();
    }
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    throw new Error((data as any).message);
  }
  return data;
};

export const useSignIn = () => {
  const { trigger: signInTrigger } = useSWRMutation(
    "/v1/api/signin",
    signInFetcher,
  );
  const { trigger } = useSWRMutation("/v1/api/register", fetcher);
  const [userName, setUserName] = useState("");
  const action = useCallback(async () => {
    try {
      const isSignIn = await signInTrigger({ userName });
      if (!isSignIn) return;
      window.location.href = "/messages/me";
    } catch (error) {
      if (error instanceof AlreadySignInError) {
        const result = await trigger({ userName });
        if (!result) return;
        window.location.href = "/messages/me";
      }
    }
  }, [userName, trigger, signInTrigger]);
  const handleAction = useCallback(() => action(), [action]);

  return {
    userName,
    setUserName,
    handleAction,
  };
};
