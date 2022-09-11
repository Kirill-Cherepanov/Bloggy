import { ReactNode } from 'react';

type TooltipProps = { outerText: string; children: ReactNode };

export function Tooltip({ outerText, children }: TooltipProps) {
  return (
    <span className="ml-1.5 cursor-pointer relative group rounded-full bg-secondary-300 inline-flex items-center justify-center w-4 h-4">
      {outerText}
      <div className="w-80 px-2 py-1 absolute top-4 bg-secondary-300 mt-2 opacity-0 rounded-md transition-opacity duration-200 invisible group-hover:visible group-hover:opacity-100 after:block after:absolute after:bottom-full after:left-1/2 after:-ml-2 after:border-[8px] after:border-transparent after:border-b-secondary-300">
        {children}
      </div>
    </span>
  );
}
