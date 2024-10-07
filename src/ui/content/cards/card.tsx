import { HistoryDateEvent } from "../../../lib";

type EventCardProps = {
  event: HistoryDateEvent;
};

export const EventCard = ({ event }: EventCardProps) => (
  <div className="hist-dates-card__container">
    <div className="hist-dates-card__title">{event.year}</div>
    <div className="hist-dates-card__description">{event.event}</div>
  </div>
);
