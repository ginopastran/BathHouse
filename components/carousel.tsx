import * as React from "react";
import "./carousel.css";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const animation = { duration: 8000, easing: (t: number) => t };

export default function Carousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    renderMode: "performance",
    drag: false,
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 15 },
      },
      "(min-width: 1000px)": {
        slides: { perView: 3, spacing: 30 },
      },
    },
    slides: { perView: 1 },

    created(s) {
      s.moveToIdx(5, true, animation);
    },
    updated(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
    animationEnded(s) {
      s.moveToIdx(s.track.details.abs + 5, true, animation);
    },
  });
  return (
    <div ref={sliderRef} className="keen-slider">
      <Image
        src="/Empresas/CASSAFORMA-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/Empresas/CASSASIP-8.png"
        alt="CASSASIP"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/Empresas/FONTHER-8.png"
        alt="FONTHER"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/Empresas/HIMAN-8.png"
        alt="HIMAN"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/Empresas/LTN-8.png"
        alt="LTN"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/Empresas/TIGRE-8.png"
        alt="TIGRE"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
    </div>
  );
}
