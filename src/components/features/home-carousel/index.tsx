/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

type CardProps = {
  photo: StaticImageData;
  header: string;
  text: string;
};

type PropType = {
  slides: CardProps[];
  options?: EmblaOptionsType;
};

import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplay } from "./components/embla-carousel-auto-play";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./components/embla-carousel-arrow-buttons";
import Image, { StaticImageData } from "next/image";
import ActionBtn from "@/components/shared/action-btn";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";
import { DotButton, useDotButton } from "./components/embla-carousel-dot-button";
import { useTranslations } from "next-intl";

const EmblaCarousel: React.FC<PropType> = (props) => {

  const t = useTranslations()
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    // Autoplay({
    //   playOnInit: true,
    //   delay: 3000,
    //   stopOnMouseEnter: true,
    //   stopOnInteraction: false,
    // }),
  ]);


 const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)


  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { onAutoplayButtonClick } = useAutoplay(emblaApi);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((card, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number relative overflow-hidden">
                <Image
                  fill
                  className="absolute inset-0 -z-[2]"
                  src={card.photo}
                  alt={card.header}
                />

                <div className="over-lay absolute inset-0 -z-[1] from-black/80 to-transparent ltr:bg-gradient-to-r rtl:bg-gradient-to-l"></div>
                <footer className="text-white absolute start-6 bottom-5 flex flex-col">
                  <h2 className="font-semibold text-3xl">{card.header}</h2>
                  <p className="text-lg mb-3">{card.text}</p>
                  <ActionBtn>{t('i-m-buying-0')}</ActionBtn>
                </footer>
              </div>
            </div>
          ))}
        </div>
      </div>

{/* AutoPlay */}
      {/* <div className="embla__controls">
        <div className="embla__buttons bg-maroon-50 rounded-full">
          <PrevButton
            onClick={() => onAutoplayButtonClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onAutoplayButtonClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>
      </div> */}

{/* Clickable */}

   <div className="embla__controls">
        <div className="embla__buttons bg-maroon-50 rounded-3xl text-maroon-500 ">
          <PrevButton className="disabled:text-gray-400" onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton className="disabled:text-gray-400" onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

      
        
      </div>


  <div className="embla__dots absolute top-3 end-4 ">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>





    </div>
  );
};

export default EmblaCarousel;
