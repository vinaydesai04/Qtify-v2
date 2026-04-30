import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./Carousel.module.css";

function Carousel({ items, children }) {
  return (
    <div className={styles.carousel}>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={16}
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
      >
        {items.map((item, index) => (
          <SwiperSlide key={item.id || index}>
            {children[index]}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Carousel;