import { useEffect, useState } from 'react';

// Used for debugging to see which components are being unnecessarily rerendered

export const useOnClickRerender = () => {
  const [numberOfClicks, setNumberOfClicks] = useState(0);

  useEffect(() => {
    const increaseClicks = () => setNumberOfClicks((num) => num + 1);

    document.addEventListener('click', increaseClicks);

    return () => document.removeEventListener('click', increaseClicks);
  }, []);

  console.log('Click ' + numberOfClicks);

  return numberOfClicks;
};
