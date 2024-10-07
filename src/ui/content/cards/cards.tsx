import gsap from "gsap";

import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import "swiper/css";

import { HistoryDateSection, useHistoryDatesContext } from "../../../lib";
import { CardsPagiButton } from "./pagi-button";
import { CardsPagination } from "./pagination";
import { EventCard } from "./card";

export const Cards = () => {
  const { currentSection } = useHistoryDatesContext();
  const [localSection, setLocalSection] =
    useState<HistoryDateSection>(currentSection);
  const [swiperInstance, setSwiperInstance] = useState<SwiperClass | null>(
    null
  );
  const [activeIndex, setActiveIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (currentSection !== localSection && wrapperRef.current) {
      gsap.to(wrapperRef.current, {
        duration: 0.5,
        ease: "power1.inOut",
        opacity: 0,
        onComplete: () => {
          setLocalSection(currentSection);
          swiperInstance?.slideTo(0, 0);
          gsap.to(wrapperRef.current, {
            duration: 0.5,
            ease: "power1.inOut",
            opacity: 1,
          });
        },
      });
    }
  }, [currentSection, localSection, swiperInstance]);

  return (
    <div className="hist-dates-cards__wrapper" ref={wrapperRef}>
      <CardsPagination />
      <div className="hist-dates-cards">
        <CardsPagiButton
          direction="left"
          hide={activeIndex === 0}
          onClick={() => swiperInstance?.slidePrev()}
        />
        <Swiper
          onSwiper={(s) => setSwiperInstance(s)}
          onActiveIndexChange={(s) => setActiveIndex(s.activeIndex)}
          slidesPerView={"auto"}
        >
          {localSection.events.map((event, idx) => (
            <SwiperSlide key={idx + localSection.start + localSection.end}>
              <EventCard event={event} />
            </SwiperSlide>
          ))}
        </Swiper>
        <CardsPagiButton
          direction="right"
          hide={swiperInstance?.isEnd}
          onClick={() => swiperInstance?.slideNext()}
        />
      </div>
    </div>
  );
};
