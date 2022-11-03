import clsx from 'clsx';
import React from 'react';

import { Icon } from 'components/Elements';
import { Wave } from '.';

export type BgTransitionType = keyof typeof BG_TRANSITIONS;

type BgTransitionProps = { type: BgTransitionType; className?: string };

export function BgTransition({ type, className = '' }: BgTransitionProps) {
  return React.cloneElement(BG_TRANSITIONS[type], {
    ...BG_TRANSITIONS[type].props,
    className: clsx(BG_TRANSITIONS[type].props.className, className),
  });
}

const NOTES_POSITIONS = [
  ['7%', '74%'],
  ['56%', '18%'],
  ['32%', '90%'],
  ['22%', '41%'],
  ['88%', '9%'],
  ['78%', '62%'],
];

const BG_TRANSITIONS = {
  hero: (
    <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[calc(100%-420px)] sm:h-[calc(100%-550px)] overflow-x-hidden [line-height]:[0px]">
      <Wave
        type="single"
        className="relative block w-[calc(100%+1.3px)] h-full fill-main"
      />
    </div>
  ),
  music: (
    <div className="w-full pointer-events-none relative">
      <div className="w-full max-w-7xl mx-auto px-4 xs:px-8 sm:px-12 md:px-20">
        <Icon
          type="musical-key"
          className="absolute z-10 top-0 h-28 fill-secondary-800"
        />
      </div>
      {NOTES_POSITIONS.map((position, i) => (
        <div
          key={i}
          className="relative w-full h-5 border-b-2 last:border-b-0 group border-accent-500"
        >
          <div className="h-full w-full max-w-7xl mx-auto pl-10 xs:pl-14 sm:pl-16 md:pl-24 pr-4 xs:pr-8 sm:pr-12 md:pr-20 ">
            <div className="relative h-full w-full flex items-end ">
              <Icon
                type="note-1"
                className={clsx(
                  'h-8 absolute fill-secondary-800',
                  i % 2 && 'hidden xs:block'
                )}
                style={{ left: position[0] }}
              ></Icon>
              <Icon
                type="note-2"
                className={clsx(
                  'h-8 absolute fill-secondary-800',
                  i % 2 || 'hidden xs:block'
                )}
                style={{ left: position[1] }}
              ></Icon>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
  sport: (
    <div className="h-44 w-full flex items-end relative pointer-events-none">
      <Icon
        type="basketball"
        className="absolute top-0 left-1/2 -translate-x-1/2 fill-accent-500 h-12"
      />
      <Wave
        type="double"
        className="w-full h-[calc(100%-48px)] bg-accent-500 fill-main"
      />
    </div>
  ),
  'popular-posts': (
    <Wave type="layered" className="w-full h-48 pointer-events-none" />
  ),
  'popular-blogs': (
    <Wave
      type="two-layered"
      className="w-full h-20 pointer-events-none rotate-180"
    />
  ),
  science: (
    <div className="h-44 w-full flex items-end relative pointer-events-none">
      <Icon
        type="flask"
        className="absolute top-0 left-1/2 -translate-x-1/2 fill-accent-500 text-secondary-900 h-14"
      />
      <Wave
        type="double"
        className="w-full h-[calc(100%-56px)] bg-accent-500 fill-main"
      />
    </div>
  ),
};
