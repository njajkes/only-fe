import gsap from "gsap";

import { useEffect, useState } from "react";

export const ChangingDate = ({ currentDate }: { currentDate: number }) => {
  const [localDate, setLocalDate] = useState(currentDate);
  const [changingDate, setChangingDate] = useState<number | null>(null);

  const date = changingDate ?? localDate;

  useEffect(() => {
    if (localDate === currentDate) {
      return;
    }

    const ref = { val: localDate };

    const tl = gsap.to(ref, {
      val: currentDate,
      duration: 1,
      roundProps: "val",
      onUpdate: () => {
        setChangingDate(ref.val);
      },
      onComplete: () => {
        setLocalDate(ref.val);
        setChangingDate(null);
      },
    });

    return () => {
      tl.kill();
    };
  }, [localDate, currentDate]);

  return <>{date}</>;
};
