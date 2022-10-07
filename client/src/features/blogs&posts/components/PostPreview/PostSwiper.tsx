import { EffectFlip, Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import 'swiper/css/effect-flip';

import { Icon } from 'components/Elements';
import { LargePost } from '.';
import { PostData } from 'types';

type PostSwiperProps = { postsData: PostData[]; className?: string };

export function PostSwiper({ postsData, className }: PostSwiperProps) {
  return (
    <div className={'w-full flex items-center ' + (className || '')}>
      <Swiper
        effect={'flip'}
        flipEffect={{
          slideShadows: false,
        }}
        slidesPerView={1}
        modules={[Navigation, A11y, EffectFlip]}
        navigation={{
          nextEl: '.BLOG_SWIPER_NEXT_ELEMENT',
          prevEl: '.BLOG_SWIPER_PREV_ELEMENT',
          disabledClass: 'invisible',
        }}
        spaceBetween={50}
        className="w-full"
      >
        <Icon
          type="angle"
          className="BLOG_SWIPER_PREV_ELEMENT bg-opacity-70 bg-secondary-800 text-main w-10 z-20 absolute left-0 top-1/2 -translate-y-1/2"
        />
        {postsData.map((postData) => (
          <SwiperSlide key={postData._id}>
            <LargePost postData={postData} />
          </SwiperSlide>
        ))}
        <Icon
          type="angle"
          className="BLOG_SWIPER_NEXT_ELEMENT bg-opacity-70 bg-secondary-800 text-main rotate-180 w-10 z-20 absolute right-0 top-1/2 -translate-y-1/2"
        />
      </Swiper>
    </div>
  );
}
