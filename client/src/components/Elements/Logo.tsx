import clsx from 'clsx';

const variants = {
  light: 'text-main',
  dark: 'text-secondary-800',
};

const sizes = {
  lg: 'text-4xl xs:text-5xl',
  md: 'text-4xl',
  sm: 'text-3xl',
};

type LogoProps = {
  className?: string;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
};

export function Logo({ className, size = 'lg', variant = 'dark' }: LogoProps) {
  return (
    <span
      className={clsx(
        'font-sansita select-none',
        sizes[size],
        variants[variant],
        className
      )}
    >
      Bloggy
    </span>
  );
}
