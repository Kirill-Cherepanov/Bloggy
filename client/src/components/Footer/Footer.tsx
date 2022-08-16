import Icon from '../Icon';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [followBoxParams, setFollowBoxParams] = useState({
    width: 0,
    top: 0,
    left: 0
  });

  return (
    <footer className="bg-secondary-1000 text-main">
      <ul className="px-4 pt-5 hidden sm:flex justify-center gap-3 text-secondary-200 relative">
        {Array(10)
          .fill('Music')
          .map((v, i) => (
            <li
              key={i}
              onMouseOver={(e) => {
                // const { width, top, left } =
                //   e.currentTarget.getBoundingClientRect();

                const width = e.currentTarget.getBoundingClientRect().width;
                const left = e.currentTarget.offsetLeft;
                const top = e.currentTarget.offsetTop;
                setFollowBoxParams({ width, top, left });
              }}
              className="[&:hover~.FOOOTER-FOLLOW-BORDER]:opacity-100 [&:hover~.FOOOTER-FOLLOW-BORDER]:cursor-pointer border border-secondary-200 rounded-sm px-1 cursor-pointer hover:text-accent-400 transition-colors"
            >
              {v}
            </li>
          ))}
        <li
          className="FOOOTER-FOLLOW-BORDER pointer-events-none opacity-0 absolute border border-accent-400 rounded-sm px-1 transition-all"
          style={followBoxParams}
        >
          <span className="opacity-0">a{/* needed to measure height*/}</span>
        </li>
      </ul>
      <div className="py-5 flex flex-col">
        <ul className="px-4 py-5 border-main border-opacity-20 border-y flex gap-3 justify-center text-sm sm:text-base sm:gap-4 font-light text-secondary-200">
          <li className="">
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li className="">
            <Link className="link" to="/">
              About
            </Link>
          </li>
          <li className="">
            <Link className="link" to="/">
              Contact
            </Link>
          </li>
          <li className="">
            <Link className="link" to="/write">
              Write
            </Link>
          </li>
          <li
            className="cursor-pointer"
            onClick={() => {
              /* handleLogout */
            }}
          >
            Sign in
            {/* Log out */}
          </li>
        </ul>
        <div className="px-4 mt-5 flex justify-center items-center flex-wrap sm:flex-nowrap">
          <div className="text-lg xs:text-xl md:text-2xl font-bold font-space-mono basis-1/3 shrink-0 grow sm:basis-48 sm:shrink-1">
            2022
          </div>
          <div className="text-lg xs:text-xl md:text-2xl font-bold font-space-mono basis-2/3 shrink-0 grow sm:basis-48 sm:shrink-1 text-right sm:text-center">
            Kirill Cherepanov
          </div>
          <ul className="flex justify-center basis-1/2 shrink-0 grow sm:basis-48 sm:shrink-1 mt-2 sm:justify-end sm:mt-0">
            {[
              ['vk', 'https://vk.com/kcherepanov1/'],
              ['github', 'https://github.com/kissMyUSSR/'],
              ['discord', 'https://discordapp.com/users/292300959265062922']
            ].map((v, i) => (
              <li key={i}>
                <a href={v[1]} target="_blank" rel="noreferrer">
                  <Icon
                    type={v[0]}
                    className="h-10 transition-colors fill-main hover:fill-accent-600 mx-2 last:mr-0"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
