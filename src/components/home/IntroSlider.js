import React from "react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "./introSlider.css";
import { Container } from "@mui/material";

export default function IntroSlider() {
  return (
    <Container maxWidth="lg" sx={{ marginTop: '100px' }} className="intro">
      <Swiper
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {[1, 2, 3, 4, 5].map((item) => (
          <SwiperSlide className="swiper-slide-custom" key={item}>
            <img
              src={require(`../../img/slider/intro-${item}.png`)}
              alt={`Intro ${item}`}
             
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
}
