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
        slidesPerView={4} // fixed 4 so first two can move out after 4 clicks
        breakpoints={{
          320: { slidesPerView: 1.5 },
          640: { slidesPerView: 3 },
          // do NOT go above 4 on desktop, to ensure movement hides first two albums
          1024: { slidesPerView: 4 },
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
