import { useContext } from "react";

import { HistoryDatesContext } from "./context";

export const useHistoryDatesContext = () => {
  const ctx = useContext(HistoryDatesContext);

  if (!ctx) {
    throw new Error(
      "HistoryDatesContext needs to be used within HistoryDatesContextProvider"
    );
  }

  return ctx;
};
