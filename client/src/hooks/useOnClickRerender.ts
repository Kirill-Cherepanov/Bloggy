import { useEffect, useState } from 'react';

// Used for debugging to see which components are being unnecessarily rerendered

export const useOnClickRerender = (callback?: (clicks?: number) => unknown) => {
  const [numberOfClicks, setNumberOfClicks] = useState(0);

  useEffect(() => {
    if (callback) callback(numberOfClicks);
  }, [numberOfClicks, callback]);

  useEffect(() => {
    const onClick = () => setNumberOfClicks((num) => num + 1);

    document.addEventListener('click', onClick);

    return () => document.removeEventListener('click', onClick);
  }, []);

  return numberOfClicks;
};
