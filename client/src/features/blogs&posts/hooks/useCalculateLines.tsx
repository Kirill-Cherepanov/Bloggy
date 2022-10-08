import { useState, useEffect, useRef } from 'react';

export const useCalculateLines = (lineHeight: number) => {
  const [amountOfLines, setAmountOfLines] = useState(0);
  const textBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const setLines = () => {
      if (!textBoxRef.current) return;

      const lines = Math.floor(
        textBoxRef.current.getBoundingClientRect().height / lineHeight
      );
      setAmountOfLines(lines);
    };
    window.addEventListener('resize', setLines);
    setLines();

    return () => window.removeEventListener('resize', setLines);
  }, [lineHeight]);

  return { amountOfLines, textBoxRef };
};
