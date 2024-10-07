import clsx from "clsx";

import { useHistoryDatesContext } from "../../../lib";
import { Arrow } from "../../arrow";

export const CardsPagination = () => {
  const { setSection, currentSectionIdx, dates } = useHistoryDatesContext();

  const totalDates = "0" + dates.length;
  const currentDate = "0" + (currentSectionIdx + 1);

  const setNextSection = () => {
    if (currentSectionIdx >= dates.length - 1) {
      return;
    }

    setSection(currentSectionIdx + 1);
  };
  const setPrevSection = () => {
    if (currentSectionIdx <= 0) {
      return;
    }

    setSection(currentSectionIdx - 1);
  };

  return (
    <div className="hist-dates-cards-pagination__wrapper">
      <div className="hist-dates-cards-pagination">
        <div className="hist-dates-cards-pagination-counter">
          {currentDate}/{totalDates}
        </div>

        <div className="hist-dates-cards-pagination-controls">
          <button onClick={setPrevSection} disabled={currentSectionIdx <= 0}>
            <Arrow transform="rotate(180)" />
          </button>
          <button
            onClick={setNextSection}
            disabled={currentSectionIdx + 1 >= dates.length}
          >
            <Arrow />
          </button>
        </div>
      </div>
      <div className="hist-dates-cards-pagination__steps__wrapper">
        <div className="hist-dates-cards-pagination__steps">
          {dates.map((_, idx) => {
            return (
              <button
                className={clsx(
                  "hist-dates-cards-pagination__steps-step",
                  idx === currentSectionIdx &&
                    "hist-dates-cards-pagination__steps-step__active"
                )}
                key={idx}
                onClick={() => setSection(idx)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
