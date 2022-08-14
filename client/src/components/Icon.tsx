type IconProps = { type: string; className?: string };

export default function Icon({ type, className = '' }: IconProps) {
  switch (type) {
    case 'close':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Close</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M368 368L144 144M368 144L144 368"
          />
        </svg>
      );
    case 'eye':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Eye</title>
          <path
            d="M255.66 112c-77.94 0-157.89 45.11-220.83 135.33a16 16 0 00-.27 17.77C82.92 340.8 161.8 400 255.66 400c92.84 0 173.34-59.38 221.79-135.25a16.14 16.14 0 000-17.47C428.89 172.28 347.8 112 255.66 112z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
          />
          <circle
            cx="256"
            cy="256"
            r="80"
            fill="none"
            stroke="currentColor"
            stroke-miterlimit="10"
            strokeWidth="32"
          />
        </svg>
      );
    case 'fullscreen':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Expand</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M432 320v112H320M421.8 421.77L304 304M80 192V80h112M90.2 90.23L208 208M320 80h112v112M421.77 90.2L304 208M192 432H80V320M90.23 421.8L208 304"
          />
        </svg>
      );
    case 'minus':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Remove</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M400 256H112"
          />
        </svg>
      );
    case 'plus':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Add</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="32"
            d="M256 112v288M400 256H112"
          />
        </svg>
      );
    case 'return':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Arrow Back</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M244 400L100 256l144-144M120 256h292"
          />
        </svg>
      );
    case 'angle':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Chevron Back</title>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="48"
            d="M328 112L184 256l144 144"
          />
        </svg>
      );
    default:
      return null;
  }
}
