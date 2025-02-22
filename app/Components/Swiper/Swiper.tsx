"use client";
import React, { useEffect, useRef, useState } from "react";
import { FreeMode, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Style from "./Swiper.module.scss";
import Image from "next/image";

interface Props {
  label: string;
  body: React.ReactNode;
  id?: string;
}

const SwiperComponent = ({ label, body, id }: Props) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const [width, setWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id={id} className={Style.Swiper} style={{
      maxWidth: `${width < 1024 ? `${width - 48}` : `${width - 338}`}`
    }}>
      <div className={Style.head} style={{
        maxWidth: `${width < 1024 ? `${width - 48}` : `${width - 338}`}`
      }}>
        <h2>{label}</h2>
        <div className={Style.navigation}>
          <div ref={prevRef} className={Style.navigation_button}>
            <Image src={"./icons/left_arrow.svg"} alt={"left arrow"} fill />
          </div>
          <div ref={nextRef} className={Style.navigation_button}>
            <Image src={"./icons/right_arrow.svg"} alt={"right arrow"} fill />
          </div>
        </div>
      </div>
      <Swiper
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          if (typeof swiper.params.navigation !== 'boolean' && swiper.params.navigation !== undefined) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        modules={[Navigation, FreeMode]}
        className={Style.body}
        slidesPerView={"auto"}
        spaceBetween={25}
      >
        {body}
      </Swiper>
    </section>
  );
};


export default SwiperComponent;