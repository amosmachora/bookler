import React, { useEffect } from "react";
import { Airport } from "../Types/Flights";

type UpdateLoggerProps = {
  item: Airport[];
};

export const useUpdateLogger = ({ item }: UpdateLoggerProps) => {
  useEffect(() => {
    console.log(item);
  }, [item]);
};
