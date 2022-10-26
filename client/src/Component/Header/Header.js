import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./Header.css";

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from "swiper";


const Header = () => {
  return (
    <>
    <Swiper
    effect={"coverflow"}
    grabCursor={true}
    centeredSlides={true}
    slidesPerView={"auto"}
    autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    coverflowEffect={{
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    }}
    pagination={{
        clickable: true,
      }}
    modules={[EffectCoverflow, Pagination, Autoplay]}
    className="mySwiper"
  >
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-1.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-2.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-3.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-4.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-5.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-6.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-7.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-8.jpg" alt="" />
    </SwiperSlide>
    <SwiperSlide>
      <img src="https://swiperjs.com/demos/images/nature-9.jpg" alt="" />
    </SwiperSlide>
  </Swiper>
</>
  )
}

export default Header