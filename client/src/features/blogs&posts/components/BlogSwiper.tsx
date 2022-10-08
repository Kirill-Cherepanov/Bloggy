import clsx from 'clsx';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';

import { BlogPreview } from '.';
import { Icon } from 'components/Elements';
import { PublicData } from 'types';
import { useScreenSize } from 'hooks';

const getSlidesAmount = (width: number) => {
  if (width >= 1200) return 4;
  if (width >= 800) return 3;
  if (width >= 600) return 2;
  return 1;
};

type BlogSwiperProps = {
  bloggers: Required<PublicData>[];
  sliderClassName?: {
    wrapper?: string;
    categories?: string;
  };
};

export function BlogSwiper({ bloggers, sliderClassName }: BlogSwiperProps) {
  const screenSize = useScreenSize();

  return (
    <div className="w-full flex items-center">
      <Icon
        type="angle"
        className="BLOG_SWIPER_PREV_ELEMENT text-secondary-900 shrink-0 basis-8 xs:basis-10"
      />
      <Swiper
        slidesPerView={
          bloggers.length < getSlidesAmount(screenSize.width)
            ? bloggers.length
            : getSlidesAmount(screenSize.width)
        }
        modules={[Navigation, A11y]}
        navigation={{
          nextEl: '.BLOG_SWIPER_NEXT_ELEMENT',
          prevEl: '.BLOG_SWIPER_PREV_ELEMENT',
          disabledClass: 'invisible',
        }}
        className="[--swiper-theme-color: #000000]"
      >
        {bloggers.map(
          (blogger) =>
            blogger.blog && (
              <SwiperSlide
                key={blogger.username}
                className="py-4 flex justify-center"
              >
                <BlogPreview
                  blogger={blogger}
                  classNames={{
                    ...sliderClassName,
                    wrapper: clsx(sliderClassName?.wrapper, 'xs:mx-5 max-w-xs'),
                  }}
                />
              </SwiperSlide>
            )
        )}
      </Swiper>
      <Icon
        type="angle"
        className="BLOG_SWIPER_NEXT_ELEMENT text-secondary-900 rotate-180 shrink-0 basis-8 xs:basis-10"
      />
    </div>
  );
}
