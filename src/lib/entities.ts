export type HistoryDateEvent = {
  year: number;
  event: string;
};

export type HistoryDateSection = {
  start: number;
  end: number;
  events: HistoryDateEvent[];
};

export type HistoryDates = readonly HistoryDateSection[];
