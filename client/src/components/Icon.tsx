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
    case 'arrow':
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

    case 'search':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Search</title>
          <path
            d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="32"
          />
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="32"
            d="M338.29 338.29L448 448"
          />
        </svg>
      );
    case 'person':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={'ionicon ' + className}
          viewBox="0 0 512 512"
        >
          <title>Person</title>
          <path d="M332.64 64.58C313.18 43.57 286 32 256 32c-30.16 0-57.43 11.5-76.8 32.38-19.58 21.11-29.12 49.8-26.88 80.78C156.76 206.28 203.27 256 256 256s99.16-49.71 103.67-110.82c2.27-30.7-7.33-59.33-27.03-80.6zM432 480H80a31 31 0 01-24.2-11.13c-6.5-7.77-9.12-18.38-7.18-29.11C57.06 392.94 83.4 353.61 124.8 326c36.78-24.51 83.37-38 131.2-38s94.42 13.5 131.2 38c41.4 27.6 67.74 66.93 76.18 113.75 1.94 10.73-.68 21.34-7.18 29.11A31 31 0 01432 480z" />
        </svg>
      );
    case 'heart':
      return (
        <svg
          viewBox="0 0 415 384"
          xmlns="http://www.w3.org/2000/svg"
          className={'KissMyUSSRIcon ' + className}
        >
          <title>Heart</title>

          <g>
            <path d="m208.0111,384a32,32 0 0 1 -18,-5.57c-78.59,-53.35 -112.62,-89.93 -131.39,-112.8c-40,-48.75 -59.15,-98.8 -58.61,-153c0.63,-62.11 50.46,-112.63 111.08,-112.63c44.08,0 74.61,24.83 92.39,45.51a6,6 0 0 0 9.06,0c17.78,-20.7 48.31,-45.51 92.39,-45.51c60.62,0 110.45,50.52 111.08,112.64c0.54,54.21 -18.63,104.26 -58.61,153c-18.77,22.87 -52.8,59.45 -131.39,112.8a32,32 0 0 1 -18,5.56z" />
          </g>
        </svg>
      );
    case 'heart-outline':
      return (
        <svg
          viewBox="0 0 416 384"
          xmlns="http://www.w3.org/2000/svg"
          className={'KissMyUSSRIcon ' + className}
        >
          <title>Heart</title>
          <g>
            <path
              strokeWidth="32"
              strokeLinejoin="round"
              strokeLinecap="round"
              stroke="currentColor"
              fill="none"
              d="m304.93022,16c-64.92,0 -96.92,64 -96.92,64s-32,-64 -96.92,-64c-52.76,0 -94.54,44.14 -95.08,96.81c-1.1,109.33 86.73,187.08 183,252.42a16,16 0 0 0 18,0c96.26,-65.34 184.09,-143.09 183,-252.42c-0.54,-52.67 -42.32,-96.81 -95.08,-96.81z"
            />
          </g>
        </svg>
      );
    case 'droplet':
      return (
        <svg
          viewBox="0 0 186 264"
          xmlns="http://www.w3.org/2000/svg"
          className={'KissMyUSSRIcon ' + className}
        >
          <g>
            <title>Droplet</title>
            <path d="m92.93,264.564c51.24,0 92.931,-41.681 92.931,-92.918c0,-50.18 -87.094,-164.069 -90.803,-168.891l-2.128,-2.755l-2.128,2.773c-3.704,4.813 -90.802,118.71 -90.802,168.882c0.001,51.228 41.691,92.909 92.93,92.909z" />
          </g>
        </svg>
      );
    case 'discord':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={className}
        >
          <title>Logo Discord</title>
          <path d="M464 66.52A50 50 0 00414.12 17L97.64 16A49.65 49.65 0 0048 65.52V392c0 27.3 22.28 48 49.64 48H368l-13-44 109 100zM324.65 329.81s-8.72-10.39-16-19.32C340.39 301.55 352.5 282 352.5 282a139 139 0 01-27.85 14.25 173.31 173.31 0 01-35.11 10.39 170.05 170.05 0 01-62.72-.24 184.45 184.45 0 01-35.59-10.4 141.46 141.46 0 01-17.68-8.21c-.73-.48-1.45-.72-2.18-1.21-.49-.24-.73-.48-1-.48-4.36-2.42-6.78-4.11-6.78-4.11s11.62 19.09 42.38 28.26c-7.27 9.18-16.23 19.81-16.23 19.81-53.51-1.69-73.85-36.47-73.85-36.47 0-77.06 34.87-139.62 34.87-139.62 34.87-25.85 67.8-25.12 67.8-25.12l2.42 2.9c-43.59 12.32-63.44 31.4-63.44 31.4s5.32-2.9 14.28-6.77c25.91-11.35 46.5-14.25 55-15.21a24 24 0 014.12-.49 205.62 205.62 0 0148.91-.48 201.62 201.62 0 0172.89 22.95s-19.13-18.15-60.3-30.45l3.39-3.86s33.17-.73 67.81 25.16c0 0 34.87 62.56 34.87 139.62 0-.28-20.35 34.5-73.86 36.19z" />
          <path d="M212.05 218c-13.8 0-24.7 11.84-24.7 26.57s11.14 26.57 24.7 26.57c13.8 0 24.7-11.83 24.7-26.57.25-14.76-10.9-26.57-24.7-26.57zM300.43 218c-13.8 0-24.7 11.84-24.7 26.57s11.14 26.57 24.7 26.57c13.81 0 24.7-11.83 24.7-26.57S314 218 300.43 218z" />
        </svg>
      );
    case 'github':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={className}
        >
          <title>Logo Github</title>
          <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9a17.56 17.56 0 003.8.4c8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1a102.4 102.4 0 01-22.6 2.7c-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1a63 63 0 0025.6-6c2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8a18.64 18.64 0 015-.5c8.1 0 26.4 3.1 56.6 24.1a208.21 208.21 0 01112.2 0c30.2-21 48.5-24.1 56.6-24.1a18.64 18.64 0 015 .5c12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5a19.35 19.35 0 004-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
        </svg>
      );
    case 'vk':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className={className}
        >
          <title>Logo Vk</title>
          <path
            d="M484.7 132c3.56-11.28 0-19.48-15.75-19.48h-52.37c-13.21 0-19.31 7.18-22.87 14.86 0 0-26.94 65.6-64.56 108.13-12.2 12.3-17.79 16.4-24.4 16.4-3.56 0-8.14-4.1-8.14-15.37V131.47c0-13.32-4.06-19.47-15.25-19.47H199c-8.14 0-13.22 6.15-13.22 12.3 0 12.81 18.81 15.89 20.84 51.76V254c0 16.91-3 20-9.66 20-17.79 0-61-66.11-86.92-141.44C105 117.64 99.88 112 86.66 112H33.79C18.54 112 16 119.17 16 126.86c0 13.84 17.79 83.53 82.86 175.77 43.21 63 104.72 96.86 160.13 96.86 33.56 0 37.62-7.69 37.62-20.5v-47.66c0-15.37 3.05-17.93 13.73-17.93 7.62 0 21.35 4.09 52.36 34.33C398.28 383.6 404.38 400 424.21 400h52.36c15.25 0 22.37-7.69 18.3-22.55-4.57-14.86-21.86-36.38-44.23-62-12.2-14.34-30.5-30.23-36.09-37.92-7.62-10.25-5.59-14.35 0-23.57-.51 0 63.55-91.22 70.15-122"
            fillRule="evenodd"
          />
        </svg>
      );
    default:
      return null;
  }
}
