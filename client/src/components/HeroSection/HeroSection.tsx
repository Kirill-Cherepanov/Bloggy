import { Link } from 'react-router-dom';
import BgTransition from '../BgTransition/BgTransition';
import Icon from '../Icon/Icon';

export default function HeroSection() {
  return (
    <section className="min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh+120px)] flex flex-col items-center bg-accent-400 relative overflow-hidden">
      <Icon
        type="heart-outline"
        className="text-accent-500 absolute -top-4 -left-[calc(25%-60px)] w-1/2 pointer-events-none select-none"
      />
      <div className="absolute top-56 sm:top-32 left-[40%] w-2/3 animate-pulse sm:animate-none">
        <Icon
          type="heart"
          className="fill-accent-300 w-full pointer-events-none select-none"
        />
        <div className="hidden sm:block font-display font-bold absolute w-max pointer-events-none select-none uppercase rotate-[35deg] top-16 sm:top-36 sm:left-[3%] md:left-[5%] md:top-44 lg:top-60 xl:left-[15%] sm:text-blurred text-2xl xs:text-4xl sm:text-5xl md:text-7xl">
          Open Yourself
          <br />
          <span className="ml-12 xl:ml-20">to the World</span>
        </div>
      </div>
      <Icon
        type="heart"
        className="sm:hidden fill-accent-500 absolute top-16 right-0 w-1/3 pointer-events-none select-none animate-slow-ping"
      />
      <div className="max-w-7xl w-full z-10 px-4 xs:px-8 sm:px-12 md:px-20">
        <div className="w-full my-14 xs:my-16 sm:my-44">
          <Link
            to="/About"
            className="max-w-max hidden sm:block uppercase text-lg hover-bottom-border-left"
          >
            Learn more
          </Link>
          <h2 className="font-display text-3xl xs:text-5xl text-center sm:text-left md:text-6xl xl:text-7xl font-bold my-3  min-w-max uppercase">
            Open Yourself
            <br />
            to the World
          </h2>
          <p className="text-center sm:text-left mb-9 text-lg max-w-[600px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
            asperiores aperiam rem ipsum?
          </p>
          <Link
            to="/sign-up"
            className="flex justify-center items-center w-full sm:w-44 py-4 font-bold bg-accent-600 transition-all rounded-sm hover:bg-accent-700 text-main hover:tracking-widest sm:hover:w-52 group"
          >
            Sign up
            <Icon
              type="arrow"
              className="hidden sm:block h-3 text-main rotate-180 ml-2 mt-0.5 transition-all group-hover:ml-2"
            />
          </Link>
          {/* <button className="group flex font-semibold items-center justify-center transition-all ease-out duration-300 hover:tracking-wide">
              Check out our Community
              <Icon
                type="return"
                className="text-inherit ml-1 rotate-180 inline h-5 transition-all ease-out duration-300 group-hover:ml-4"
              />
            </button> */}
        </div>
      </div>
      <BgTransition type="hero" />
    </section>
  );
}
