import { PropsWithChildren } from "react";

import { ControlCircle } from "./control-circle";

export const HistoryDatesWidgetLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="hist-dates__container">
      <div className="hist-dates__container-line hist-dates__container-line__vertical hist-dates__container-line__left" />
      <div className="hist-dates__container-line hist-dates__container-line__vertical hist-dates__container-line__right" />
      <div className="hist-dates__container-line hist-dates__container-line__vertical hist-dates__container-line__center" />
      <div className="hist-dates__container-line hist-dates__container-line__horizontal hist-dates__container-line__center" />
      <div className="hist-dates__container-line__circle-wrapper">
        <ControlCircle />
      </div>
      {children}
    </div>
  );
};
