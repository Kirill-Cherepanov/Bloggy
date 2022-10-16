import { ReactNode, useEffect, useRef, useState } from 'react';

type TooltipProps = { outerText: string; children: ReactNode };

export function Tooltip({ outerText, children }: TooltipProps) {
  const { tooltip, style } = useTooltipCorrection<HTMLDivElement>();

  return (
    <span className="ml-1.5 cursor-pointer relative group rounded-full bg-secondary-300 inline-flex items-center justify-center w-4 h-4 after:block after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:border-[8px] after:border-transparent after:border-b-secondary-300 after:invisible after:hover:visible">
      {outerText}
      <div
        ref={tooltip}
        style={style}
        className="w-80 px-2 py-1 absolute top-4 bg-secondary-300 mt-2 opacity-0 rounded-md transition-opacity duration-200 invisible group-hover:visible group-hover:opacity-100"
      >
        {children}
      </div>
    </span>
  );
}

const useTooltipCorrection = <T extends HTMLElement>() => {
  const tooltip = useRef<T>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (!tooltip.current) return;

    const tooltipRect = tooltip.current.getBoundingClientRect();

    // Make corrections to width if too wide
    if (tooltipRect.width > window.screen.width) {
      setStyle((style) => ({ ...style, width: `${window.screen.width}px` }));
    }

    // Make corrections to x position if out of the window
    let transform: string[] = [];
    if (tooltipRect.x + tooltipRect.width > window.screen.width) {
      transform.push(
        `translateX(${
          window.screen.width - tooltipRect.width - tooltipRect.x
        }px)`
      );
    } else if (tooltipRect.x < 0) {
      transform.push(`translateX(${-tooltipRect.x}px)`);
    }
    if (transform.length) {
      setStyle((style) => ({ ...style, transform: transform.join(' ') }));
    }
  }, []);

  return { tooltip, style };
};
