import { createContext, PropsWithChildren, useState } from "react";

import type {
  HistoryDateEvent,
  HistoryDates,
  HistoryDateSection,
} from "./entities";
import { defaultInitialDates } from "./default-initial-dates";

export type HistoryDatesContextValue = {
  dates: HistoryDates;
  currentSectionIdx: number;
  currentSection: HistoryDateSection;

  setSection: (idx: number) => void;
};

export const HistoryDatesContext =
  createContext<HistoryDatesContextValue | null>(null);

export type HistoryDatesContextProviderProps = {
  initialDates?: HistoryDateEvent[][];
  initialSectionIdx?: number;
};

const transformDates = (dates: HistoryDateEvent[][]): HistoryDates => {
  return dates.map((section) => ({
    start: section[0].year,
    end: section[section.length - 1].year,
    events: section,
  }));
};

export const HistoryDatesContextProvider = ({
  children,
  initialDates = defaultInitialDates,
  initialSectionIdx = 0,
}: PropsWithChildren<HistoryDatesContextProviderProps>) => {
  const [dates] = useState<HistoryDates>(transformDates(initialDates));
  const [currentSectionIdx, setCurrentSectionIdx] = useState(initialSectionIdx);

  const currentSection = dates[currentSectionIdx];

  const setSection = (idx: number) => {
    if (idx < 0 || idx >= dates.length) {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`Invalid section index: ${idx}`);
      }
      return;
    }

    setCurrentSectionIdx(idx);
  };

  return (
    <HistoryDatesContext.Provider
      value={{
        dates,
        currentSectionIdx,
        currentSection,
        setSection,
      }}
    >
      {children}
    </HistoryDatesContext.Provider>
  );
};
