import { useEffect, useState } from 'react';

export const useScreenSize = () => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const setScreenSize = () =>
      setSize({
        height: window.innerHeight,
        width: window.innerWidth,
      });

    window.addEventListener('resize', setScreenSize);

    return () => window.removeEventListener('resize', setScreenSize);
  }, []);

  return size;
};
