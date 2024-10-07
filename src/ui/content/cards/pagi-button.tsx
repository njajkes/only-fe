import { Arrow } from "../../arrow";

export type CardsPagiButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  direction?: "left" | "right";
  hide?: boolean;
};

export const CardsPagiButton = ({
  direction = "right",
  disabled = false,
  onClick = () => {},
  hide = false,
}: CardsPagiButtonProps) => {
  return (
    <button
      className="hist-dates-cards-pagibutton"
      style={{
        opacity: hide ? "0" : undefined,
      }}
      onClick={onClick}
      disabled={disabled || hide}
    >
      <Arrow transform={direction === "left" ? "rotate(180)" : undefined} />
    </button>
  );
};
