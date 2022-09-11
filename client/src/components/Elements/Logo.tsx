import clsx from 'clsx';

type LogoProps = { className?: string };

export function Logo({ className }: LogoProps) {
  return (
    <span
      className={clsx(
        'basis-32 xs:basis-40 text-4xl xs:text-5xl text-main shrink-0 font-sansita select-none flex justify-center text-center -mt-2',
        className
      )}
    >
      Bloggy
    </span>
  );
}
