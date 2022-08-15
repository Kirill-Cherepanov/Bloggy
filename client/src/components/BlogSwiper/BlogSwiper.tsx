import Icon from '../Icon';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';

// type Props = {};

export default function BlogSwiper() {
  return (
    <div className="w-full px-10 flex">
      <Icon
        type="angle"
        className="BLOG_SWIPER_PREV_ELEMENT text-stone-600 h-20"
      />
      <Swiper
        slidesPerView={5}
        modules={[Navigation, A11y]}
        navigation={{
          nextEl: '.BLOG_SWIPER_NEXT_ELEMENT',
          prevEl: '.BLOG_SWIPER_PREV_ELEMENT',
          disabledClass: 'invisible'
        }}
        className="[--swiper-theme-color: #78716c]"
      >
        {/* <div className="BLOG_SWIPER_NEXT_ELEMENT" /> */}
        {Array(10)
          .fill(0)
          .map((v, i) => (
            <SwiperSlide key={i}>
              <div>Stuff</div>
            </SwiperSlide>
          ))}
      </Swiper>
      <Icon
        type="angle"
        className="BLOG_SWIPER_NEXT_ELEMENT text-stone-600 rotate-180 h-20"
      />
    </div>
  );
}
