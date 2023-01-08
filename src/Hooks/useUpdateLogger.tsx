import { useEffect } from "react";

export const useUpdateLogger = (value: any, info: string) => {
  useEffect(() => {
    console.log(value, info);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
};
