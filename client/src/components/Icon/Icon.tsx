type IconProps = {
  type: string;
  className?: string;
  style?: React.CSSProperties | undefined;
};

export default function Icon({ type, className = '', style }: IconProps) {
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

    case 'basketball':
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 474 474"
          className={'KissMyUSSR-icon ' + className}
        >
          <title>Basketball</title>
          <circle cx="237" cy="237" r="237" className="fill-secondary-800" />
          <path
            fill="#f97316"
            d="m237.39,214.7l34.45,-34.45a207.08,207.08 0 0 1 -50.12,-135.25c0,-5 0.19,-10.05 0.54,-15a207.09,207.09 0 0 0 -120.2,49.33l135.33,135.37zm57.14,-57.14l78.19,-78.23a207.07,207.07 0 0 0 -118.33,-49.2c-0.41,4.9 -0.64,9.86 -0.64,14.87a175.25,175.25 0 0 0 40.78,112.56zm22.63,22.63a175.25,175.25 0 0 0 112.56,40.81c5,0 10,-0.23 14.87,-0.64a207.07,207.07 0 0 0 -49.2,-118.36l-78.23,78.19zm-159.54,114.28a175.23,175.23 0 0 0 -112.56,-40.81q-7.52,0 -14.87,0.64a207.07,207.07 0 0 0 49.2,118.36l78.23,-78.19zm79.77,-34.51l-34.45,34.45a207.08,207.08 0 0 1 50.12,135.25c0,5 -0.19,10.05 -0.54,15a207.06,207.06 0 0 0 120.2,-49.33l-135.33,-135.37zm192.33,-6.96a207.08,207.08 0 0 1 -135.25,-50.12l-34.45,34.45l135.37,135.33a207.09,207.09 0 0 0 49.39,-120.2c-5.01,0.35 -10.02,0.54 -15.06,0.54zm-214.96,-15.67l-135.37,-135.33a207.06,207.06 0 0 0 -49.39,120.2c5,-0.35 10,-0.54 15,-0.54a207.08,207.08 0 0 1 135.25,50.12l34.51,-34.45zm-112.7,158a207.07,207.07 0 0 0 118.33,49.2q0.63,-7.35 0.64,-14.87a175.23,175.23 0 0 0 -40.81,-112.56l-78.16,78.23z"
          />
        </svg>
      );
    case 'heart':
      return (
        <svg
          viewBox="0 0 415 384"
          xmlns="http://www.w3.org/2000/svg"
          className={'KissMyUSSR-icon ' + className}
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
          className={'KissMyUSSR-icon ' + className}
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
    case 'musical-key':
      return (
        <svg
          viewBox="0 0 640 1778"
          xmlns="http://www.w3.org/2000/svg"
          className={'KissMyUSSR-icon ' + className}
        >
          <title>Musical key</title>
          <g>
            <path
              transform="scale(1 -1)"
              d="m562,-1133c0,89 -65,150 -155,150c7,-44 34,-203 55,-323c71,29 100,102 100,173zm-142,-185l-58,329c-59,-14 -104,-63 -104,-124c0,-49 22,-75 61,-99c12,-8 22,-13 22,-22s-9,-13 -17,-13c-80,0 -135,96 -135,166c0,94 62,190 153,217c-7,41 -14,88 -23,142c-15,-15 -31,-29 -48,-44c-88,-76 -174,-185 -174,-307c0,-151 122,-251 265,-251c19,0 38,2 58,6zm-88,1028c-8,-31 -11,-65 -11,-102c0,-42 5,-81 11,-121c69,68 146,146 146,250c0,69 -24,118 -39,118c-52,0 -98,-105 -107,-145zm-210,-1335c0,66 45,123 115,123c75,0 116,-57 116,-111c0,-64 -47,-104 -94,-111c-3,-1 -5,-2 -5,-4c0,-1 2,-2 3,-3c2,0 23,-5 47,-5c101,0 154,55 154,159c0,53 -11,123 -30,219c-23,-4 -50,-7 -79,-7c-186,0 -349,147 -349,334c0,200 126,321 217,406c21,17 73,70 74,71c-17,112 -22,161 -22,215c0,84 18,212 82,288c33,39 64,51 71,51c18,0 47,-35 71,-86c16,-36 44,-110 44,-201c0,-159 -73,-284 -179,-395c9,-56 19,-115 29,-175c146,0 253,-102 253,-253c0,-103 -73,-205 -171,-237c6,-39 12,-69 15,-89c10,-57 16,-102 16,-141c0,-63 -14,-129 -68,-167c-36,-22 -77,-34 -124,-34c-135,0 -186,87 -186,153z"
            />
          </g>
        </svg>
      );
    case 'flask':
      return (
        <svg
          viewBox="0 0 420 512"
          xmlns="http://www.w3.org/2000/svg"
          xmlSpace="preserve"
          version="1.1"
          className={'KissMyUSSR-icon ' + className}
        >
          <g>
            <title>Flask</title>
            <g>
              <g>
                <path
                  fill="#B3F4FF"
                  d="m413.07276,439.554l-155.148,-262.16l0,-145.394c0,-4.418 -3.578,-8 -8,-8s-8,3.582 -8,8l-64,0c0,-4.418 -3.578,-8 -8,-8s-8,3.582 -8,8l0,145.394l-155.148,262.16c-8.898,15.027 -9.039,33.055 -0.391,48.223s24.234,24.223 41.695,24.223l323.687,0c17.461,0 33.047,-9.055 41.695,-24.223c8.649,-15.168 8.509,-33.195 -0.39,-48.223z"
                />
              </g>
              <g>
                <path
                  id="svg_5"
                  fill="#53DCFF"
                  d="m209.92476,32l-32,0c0,-4.418 -3.578,-8 -8,-8s-8,3.582 -8,8l0,145.394l-155.148,262.16c-8.898,15.027 -9.039,33.055 -0.391,48.223s24.234,24.223 41.695,24.223l161.844,0l0,-480z"
                />
              </g>
              <g>
                <path
                  fill="#00E68C"
                  d="m385.54176,455.851l-44.937,-75.926c-1.438,-2.434 -4.055,-3.926 -6.883,-3.926l-247.594,0c-2.828,0 -5.445,1.492 -6.883,3.926l-44.93,75.926c-3.008,5.078 -3.062,10.934 -0.133,16.082c2.938,5.125 8,8.066 13.898,8.066l323.687,0c5.898,0 10.961,-2.941 13.906,-8.082c2.924,-5.128 2.877,-10.984 -0.131,-16.066z"
                />
              </g>
              <g>
                <path
                  fill="#00BEBE"
                  d="m209.92476,376l-123.797,0c-2.828,0 -5.445,1.492 -6.883,3.926l-44.93,75.926c-3.008,5.078 -3.062,10.934 -0.133,16.082c2.938,5.125 8,8.066 13.898,8.066l161.845,0l0,-104z"
                />
              </g>
              <g>
                <g>
                  <path
                    fill="#5C546A"
                    d="m233.92476,264l-48,0c-4.422,0 -8,-3.582 -8,-8s3.578,-8 8,-8l48,0c4.422,0 8,3.582 8,8s-3.578,8 -8,8z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    fill="#5C546A"
                    d="m233.92476,304l-48,0c-4.422,0 -8,-3.582 -8,-8s3.578,-8 8,-8l48,0c4.422,0 8,3.582 8,8s-3.578,8 -8,8z"
                  />
                </g>
              </g>
              <g>
                <g>
                  <path
                    fill="#5C546A"
                    d="m233.92476,344l-48,0c-4.422,0 -8,-3.582 -8,-8s3.578,-8 8,-8l48,0c4.422,0 8,3.582 8,8s-3.578,8 -8,8z"
                  />
                </g>
              </g>
              <g>
                <circle fill="#FFFFFF" r="16" cy="432" cx="241.92476" />
              </g>
              <g>
                <circle fill="#00E68C" r="16" cy="408" cx="153.92476" />
              </g>
              <g>
                <circle fill="#FFFFFF" r="8" cy="416" cx="297.92476" />
              </g>
              <g>
                <circle fill="#00E68C" r="8" cy="440" cx="177.92476" />
              </g>
              <g>
                <circle fill="#00E68C" r="8" cy="424" cx="105.92476" />
              </g>
              <g>
                <path
                  fill="#44BEF1"
                  d="m257.92476,0l-96,0c-8.837,0 -16,7.163 -16,16l0,0c0,8.837 7.163,16 16,16l96,0c8.837,0 16,-7.163 16,-16l0,0c0,-8.837 -7.164,-16 -16,-16z"
                />
              </g>
            </g>
          </g>
        </svg>
      );
    case 'note-1':
      return (
        <svg
          className={'KissMyUSSR-icon ' + className}
          viewBox="0 0 11.7 20"
          xmlns="http://www.w3.org/2000/svg"
          style={style}
        >
          <path d="m10.971,9.438c-0.422,0.656 -0.646,0.375 -0.52,0c0.336,-0.993 0.348,-4.528 -2.451,-4.969l-0.002,11.531c0,1.657 -1.735,4 -4.998,4c-1.657,0 -3,-0.871 -3,-2.5c0,-2.119 1.927,-3.4 4,-3.4c1.328,0 2,0.4 2,0.4l0,-14.5l2,0c0,2.676 5.986,4.744 2.971,9.438z" />
        </svg>
      );
    case 'note-2':
      return (
        <svg
          className={'KissMyUSSR-icon ' + className}
          viewBox="0 0 15 18.2"
          xmlns="http://www.w3.org/2000/svg"
          style={style}
        >
          <path d="m15,0.1929l-0.002,13c0,1.243 -1.301,3 -3.748,3c-1.243,0 -2.25,-0.653 -2.25,-1.875c0,-1.589 1.445,-2.55 3,-2.55c0.432,0 0.754,0.059 1,0.123l0,-7.334l-7,1.273l0,9.363l-0.002,0c0,1.243 -1.301,3 -3.748,3c-1.243,0 -2.25,-0.653 -2.25,-1.875c0,-1.589 1.445,-2.55 3,-2.55c0.432,0 0.754,0.059 1,0.123l0,-11.698l11,-2z" />
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