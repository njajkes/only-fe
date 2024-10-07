import { HistoryDatesContextProvider } from "../lib";
import { HistoryDatesWidgetLayout } from "./layout";
import { Cards, Dates, Title } from "./content";

export const HistoryDatesWidget = () => {
  return (
    <HistoryDatesContextProvider>
      <HistoryDatesWidgetLayout>
        <Title />
        <Dates />
        <Cards />
      </HistoryDatesWidgetLayout>
    </HistoryDatesContextProvider>
  );
};
