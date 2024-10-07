import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useHistoryDatesContext } from "../lib";

gsap.registerPlugin(MotionPathPlugin);

const rotations = [0, -60, -120, -180, -240, -300];

const radius = 265;
const centerX = 263;
const centerY = 263;

export const ControlCircle: React.FC = () => {
  const { dates, setSection, currentSectionIdx } = useHistoryDatesContext();

  const [internalActivePoint, setInternalActivePoint] = useState<number | null>(
    null
  );
  const pointsRef = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const pointPositions = dates.map((_, i) => {
    const angle = i * (360 / dates.length) * (Math.PI / 180);
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y };
  });

  pointPositions.unshift(pointPositions.pop()!);

  const reducePoint = (index: number) => {
    const point = pointsRef.current[index];
    if (!point) {
      return;
    }

    gsap.to(point, {
      width: 6,
      height: 6,
      fontSize: 0,
      duration: 0.2,
      left: `${pointPositions[index].x}px`, 
      top: `${pointPositions[index].y}px`,
    });
  };

  const enlargePoint = (index: number) => {
    const point = pointsRef.current[index];
    if (!point) {
      return;
    }

    gsap.to(point, {
      width: 56,
      height: 56,
      fontSize: 20,
      duration: 0.2,
      left: `calc(${pointPositions[index].x - 25}px)`,
      top: `calc(${pointPositions[index].y - 25}px)`,
    });
  };

  useEffect(() => {
    handleClick(currentSectionIdx);
    setInternalActivePoint(currentSectionIdx);
  }, [currentSectionIdx]);

  const handleClick = (index: number) => {
    setSection(index);

    pointsRef.current
      .forEach((element, i) => {
        if (element && i !== index) {
          reducePoint(i);
        }
      });

    enlargePoint(index);

    gsap.to(containerRef.current, {
      rotation: rotations[index],
      transformOrigin: "263px 263px",
      ease: "power1.inOut",
      duration: 1,
    });
  };

  const handleMouseEnter = (index: number) => {
    enlargePoint(index);
  };

  const handleMouseLeave = (index: number) => {
    if (internalActivePoint !== index) {
      reducePoint(index);
    }
  };

  return (
    <div className="circle-container" ref={containerRef}>
      <svg width="530" height="530">
        <circle cx="265" cy="265" r="265" stroke="#42567A" fill="none" />
      </svg>
      {pointPositions.map((pos, index) => (
        <div
          key={index}
          className={`point ${internalActivePoint === index ? "active" : ""}`}
          ref={(el) => (pointsRef.current[index] = el)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={() => handleMouseLeave(index)}
          onClick={() => handleClick(index)}
          style={{
            top: `${pos.y}px`,
            left: `${pos.x}px`,
          }}
        >
          <span
            className="point-number"
            style={
              {
                "--current-deg": `${Math.abs(
                  rotations[internalActivePoint ?? 0]
                )}deg`,
              } as Record<string, string>
            }
          >
            {index + 1}
          </span>
        </div>
      ))}
    </div>
  );
};
