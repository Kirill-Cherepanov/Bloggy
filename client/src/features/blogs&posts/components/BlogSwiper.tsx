import Icon from 'components/Elements/Icon';
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/a11y';
import 'swiper/css/navigation';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Props = { blogsInfo: Blog[] };

const getSlidesAmount = () => {
  if (window.innerWidth >= 1200) return 4;
  if (window.innerWidth >= 800) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
};

export default function BlogSwiper({ blogsInfo }: Props) {
  const [slidesAmount, setSlidesAmount] = useState(getSlidesAmount());
  useEffect(() => {
    const setSlides = () => setSlidesAmount(getSlidesAmount());
    window.addEventListener('resize', setSlides);

    return () => {
      window.removeEventListener('resize', setSlides);
    };
  }, []);

  return (
    <div className="w-full flex items-center">
      <Icon
        type="angle"
        className="BLOG_SWIPER_PREV_ELEMENT text-secondary-900 shrink-0 basis-8 xs:basis-10"
      />
      <Swiper
        slidesPerView={slidesAmount}
        modules={[Navigation, A11y]}
        navigation={{
          nextEl: '.BLOG_SWIPER_NEXT_ELEMENT',
          prevEl: '.BLOG_SWIPER_PREV_ELEMENT',
          disabledClass: 'invisible',
        }}
        className="[--swiper-theme-color: #000000]"
      >
        {/* <div className="BLOG_SWIPER_NEXT_ELEMENT" /> */}
        {blogsInfo.map((blogInfo, i) => (
          <SwiperSlide key={blogInfo._id + i} className="py-4">
            <div className="px-4 py-2 bg-main shadow-lg transition-transform hover:scale-105 xs:mx-5 rounded-md">
              <Link to={'/blog/' + blogInfo.username} className="block">
                <img
                  src={blogInfo.profilePic}
                  alt="Blogger"
                  className="mb-4 rounded-full aspect-square object-cover select-none cursor-pointer"
                />
              </Link>
              <h4 className="font-bold text-lg text-center text-ellipsis overflow-hidden mb-1">
                <Link
                  to={'/blog/' + blogInfo.username}
                  className="hover:underline"
                >
                  {blogInfo.username}
                </Link>
              </h4>
              <div className="flex gap-4 mb-2 overflow-hidden flex-wrap h-7">
                {blogInfo.categories.map((category) => (
                  <span
                    key={category}
                    className="border border-dark inline-block h-full px-1 hover:border-accent-600 hover:text-accent-600 hover:shadow-md hover:shadow-accent-400 cursor-pointer"
                  >
                    {category}
                  </span>
                ))}
              </div>
              <div className="line-clamp-6 text-ellipsis">
                {blogInfo.description}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <Icon
        type="angle"
        className="BLOG_SWIPER_NEXT_ELEMENT text-secondary-900 rotate-180 shrink-0 basis-8 xs:basis-10"
      />
    </div>
  );
}
