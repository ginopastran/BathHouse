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
        src="/empresas/CASSAFORMA-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/empresas/CASSASIP-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/empresas/FONTHER-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/empresas/HIMAN-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/empresas/CASSAFORMA-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/empresas/LTN-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
      <Image
        src="/empresas/TIGRE-8.png"
        alt="CASSAFORMA"
        width={200}
        height={200}
        className="keen-slider__slide w-full h-full object-scale-down"
      />
    </div>
  );
}
