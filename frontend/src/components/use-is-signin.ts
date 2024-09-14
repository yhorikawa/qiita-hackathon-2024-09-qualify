import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { client } from "#/lib/client";

const fetcher = async () => {
  const res = await client.api.v1.users.me.$get();
  if (!res.ok) throw new Error(String(res.status));
  return await res.json();
};

export const useIsSignin = () => {
  const swr = useSWR("/api/v1/users/me", fetcher);
  return swr;
};

export const useAuthGuardEffect = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const { data, isLoading, error } = useIsSignin();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
    if (error) {
      router.push("/signin");
    }
    setIsInitialized(true);
  }, [router, isLoading, error]);

  return { isInitialized };
};

export const useShouldNotAuthGuardEffect = () => {
  const { data, isLoading, error } = useIsSignin();
  const router = useRouter();
  useEffect(() => {
    if (isLoading) return;
    if (!data) return;
    if (error) return;
    if (!data.success) return;
    router.push("/messages/me");
  }, [data, router, isLoading, error]);
};
