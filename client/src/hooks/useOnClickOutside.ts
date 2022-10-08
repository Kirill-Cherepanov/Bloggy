import { useEffect, useRef } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  callback: () => unknown
) => {
  const element = useRef<T>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!element.current?.contains(e.target as Node)) callback();
    };

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, [callback]);

  return element;
};
