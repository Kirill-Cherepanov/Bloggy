import { useEffect, useState } from 'react';

export const useOnClickRerender = () => {
  const [numberOfClicks, setNumberOfClicks] = useState(0);

  useEffect(() => {
    const increaseClicks = () => setNumberOfClicks((num) => num + 1);

    document.addEventListener('click', increaseClicks);

    return () => document.removeEventListener('click', increaseClicks);
  }, []);

  console.log('Click ' + numberOfClicks);
};
