import Icon from '../Icon';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';

type Props = { mockImage: string };

const getSlidesAmount = () => {
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 800) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
};

export default function BlogSwiper({ mockImage }: Props) {
  const [slidesAmount, setSlidesAmount] = useState(getSlidesAmount());
  useEffect(() => {
    const setSlides = () => setSlidesAmount(getSlidesAmount());
    window.addEventListener('resize', setSlides);

    return () => {
      window.removeEventListener('resize', setSlides);
    };
  }, []);

  return (
    <div className="w-full px-10 flex items-center">
      <Icon
        type="angle"
        className="BLOG_SWIPER_PREV_ELEMENT text-stone-600 shrink-0 basis-8 xs:basis-10"
      />
      <Swiper
        slidesPerView={slidesAmount}
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
            <SwiperSlide key={i} className="py-4">
              <div className="px-4 py-2 bg-accent-50 shadow-lg hover:scale-105 xs:mx-5">
                <img
                  src={mockImage}
                  alt="Blogger"
                  className="mb-4 rounded-full aspect-square object-cover select-none cursor-pointer"
                />
                <h4 className="font-bold text-lg text-center text-ellipsis cursor-pointer overflow-hidden hover:underline mb-1">
                  Bloggercoolnameandstuffffafafafafafaff
                </h4>
                <div className="flex gap-4 mb-2 overflow-hidden flex-wrap h-7">
                  {Array(5)
                    .fill(0)
                    .map((v, i) => (
                      <span
                        key={i}
                        className="border border-dark inline-block h-full px-1 hover:border-accent-600 hover:text-accent-600 hover:shadow-md hover:shadow-accent-400 cursor-pointer"
                      >
                        Music
                      </span>
                    ))}
                </div>
                <div className="line-clamp-6 text-ellipsis">
                  A small blog description of up to 100 syllables I guess la la
                  alal ala l la la la adla jaljal jal ajldkajd lajlaj laj al
                  jaljl jl ja jl jal jalj al ajl l ja jal jl ja al jlj al jal
                  jal ja dlk ajl kjalkjal jalj al jl jljaljl jal jl lj l laj aj
                  ll j
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
      <Icon
        type="angle"
        className="BLOG_SWIPER_NEXT_ELEMENT text-stone-600 rotate-180 shrink-0 basis-8 xs:basis-10"
      />
    </div>
  );
}
