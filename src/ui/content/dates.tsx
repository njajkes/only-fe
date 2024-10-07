import { useHistoryDatesContext } from "../../lib";
import { ChangingDate } from "../utils";

export const Dates = () => {
  const ctx = useHistoryDatesContext();

  return (
    <div className="hist-dates__dates">
      <div className="hist-dates__date-start">
        <ChangingDate currentDate={ctx.currentSection.start} />
      </div>
      <div className="hist-dates__date-end">
        <ChangingDate currentDate={ctx.currentSection.end} />
      </div>
    </div>
  );
};
