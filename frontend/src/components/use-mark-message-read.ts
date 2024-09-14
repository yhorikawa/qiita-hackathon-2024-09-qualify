import { useEffect } from "react";
import { useLocalStorage } from "react-use";

export const useMarkMessageRead = () => {
  return useLocalStorage("readMessages", [] as number[]);
};

export const useMarkMessageReadEffect = (id: number) => {
  const [value, setValue] = useMarkMessageRead();
  useEffect(() => {
    if (value?.includes(id)) return;
    const target = Array.isArray(value) ? value : [];
    setValue([...target, id]);
  }, [value, id, setValue]);
};
