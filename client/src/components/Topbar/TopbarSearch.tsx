import Icon from '../Icon/Icon';
import { useEffect, useRef, useState } from 'react';

export default function TopbarSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const search = useRef<HTMLDivElement | null>(null);
  const inputField = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const closeMenu = (e: MouseEvent) => {
      if (search.current!.contains(e.target as Node)) return;
      setIsOpen(false);
    };

    document.addEventListener('click', closeMenu);

    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <div ref={search}>
      <div className="lg:relative min-w-[2rem]">
        <button
          onClick={() => {
            setIsOpen(true);
            inputField.current!.focus();
          }}
          className={
            'lg:absolute lg:h-10 top-[calc(50%-1.25rem)] left-2 transition-all duration-300 ' +
            (isOpen ? 'top-[calc(50%-1rem)] left-2 lg:h-8' : '')
          }
        >
          <Icon
            type="search"
            className={
              'h-8 sm:h-10 text-main transition-all duration-300 ' +
              (isOpen ? 'lg:text-secondary-500 lg:h-8' : '')
            }
          />
        </button>
        <div
          className={
            'hidden lg:block h-10 min-w-0 transition-[width,padding] duration-300 overflow-x-hidden ' +
            (isOpen ? 'w-60 xl:w-72' : 'w-0 p-0')
          }
        >
          <input
            type="text"
            placeholder="Search articles"
            className="h-full w-60 xl:w-72 pl-12 pr-2 placeholder:text-secondary-500 text-secondary-1000"
          />
        </div>
      </div>

      <div
        className={
          'lg:hidden pl-2 pr-12 flex justify-center items-center absolute z-10 top-0 left-0 w-full h-20 transition-transform bg-secondary-900 ' +
          (isOpen ? 'translate-y-0' : '-translate-y-20')
        }
      >
        <Icon
          type="search"
          className="h-8 absolute top-[calc(50%-1rem)] left-4 text-secondary-500"
        />
        <input
          ref={inputField}
          type="text"
          placeholder="Search articles"
          className="w-full h-10 pl-12 pr-2 placeholder:text-secondary-500 text-secondary-1000"
        />
        <button
          onClick={() => {
            setIsOpen(false);
          }}
        >
          <Icon
            type="close"
            className="h-8 absolute top-[calc(50%-1rem)] right-2 text-main"
          />
        </button>
      </div>
    </div>
  );
}
