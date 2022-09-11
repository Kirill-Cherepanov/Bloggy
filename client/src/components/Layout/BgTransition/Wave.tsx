type IconProps = { type: string; className?: string };

export function Wave({ type, className = '' }: IconProps) {
  switch (type) {
    case 'single':
      return (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 118"
          preserveAspectRatio="none"
        >
          <title>Wave</title>
          <path d="M985.66,92.83 C906.67,72,823.78,31,743.84,14.19 c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"></path>
        </svg>
      );
    case 'double':
      return (
        <svg
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 120"
          preserveAspectRatio="none"
        >
          <title>Double wave</title>
          <path d="M0 0 V40 C250 100, 420 100, 500 0 C580 100, 750 100, 1000 40 V0 Z" />
        </svg>
      );
    case 'two-layered':
      return (
        <svg
          className={className}
          viewBox="0 0 960 482"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          preserveAspectRatio="none"
        >
          <g>
            <title>Two layered wave</title>
            <path
              d="m0,58.8778l7,15c7,15 21,45 34.8,45.5c13.9,0.5 27.5,-28.5 41.4,-62.5c13.8,-34 27.8,-73 41.8,-33.2c14,39.9 28,158.5 42,185.5c14,27 28,-37.6 41.8,-82c13.9,-44.3 27.5,-68.3 41.4,-57.8c13.8,10.5 27.8,55.5 41.8,48.3c14,-7.1 28,-66.5 42,-58.6c14,7.8 28,82.8 41.8,129c13.9,46.1 27.5,63.5 41.4,25.3c13.8,-38.2 27.8,-131.8 41.8,-177c14,-45.2 28,-41.8 42,-24.5c14,17.3 28,48.7 41.8,56.7c13.9,8 27.5,-7.4 41.4,-16.9c13.8,-9.5 27.8,-13.1 41.8,23.9c14,37 28,114.6 42,149c14,34.3 28,25.3 41.8,30c13.9,4.6 27.5,23 41.4,-8.7c13.8,-31.7 27.8,-113.3 41.8,-114.3c14,-1 28,78.6 42,108.6c14,30 28,10.4 41.8,10c13.9,-0.3 27.5,18.7 41.4,29.5c13.8,10.9 27.8,13.5 34.8,14.9l7,1.3l0,187l-7,0c-7,0 -21,0 -34.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -34.8,0l-7,0l0,-424z"
              className="fill-accent-300"
            />
            <path
              d="m0,287.34778l7,17.3c7,17.4 21,52 34.8,79.5c13.9,27.5 27.5,47.9 41.4,24c13.8,-23.8 27.8,-91.8 41.8,-123c14,-31.1 28,-25.5 42,-16.6c14,8.8 28,20.8 41.8,26.1c13.9,5.4 27.5,4 41.4,-25.8c13.8,-29.8 27.8,-88.2 41.8,-96.7c14,-8.5 28,32.9 42,35.9c14,3 28,-32.4 41.8,-1.7c13.9,30.7 27.5,127.3 41.4,166.5c13.8,39.2 27.8,20.8 41.8,-1.5c14,-22.3 28,-48.7 42,-38.7c14,10 28,56.4 41.8,41.9c13.9,-14.5 27.5,-89.9 41.4,-84.9c13.8,5 27.8,90.4 41.8,130.5c14,40.2 28,35.2 42,8.7c14,-26.5 28,-74.5 41.8,-108.8c13.9,-34.4 27.5,-55 41.4,-52.5c13.8,2.5 27.8,28.1 41.8,41.3c14,13.2 28,13.8 42,23c14,9.2 28,26.8 41.8,46.3c13.9,19.5 27.5,40.9 41.4,6.7c13.8,-34.2 27.8,-123.8 34.8,-168.7l7,-44.8l0,312l-7,0c-7,0 -21,0 -34.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -41.8,0c-14,0 -28,0 -42,0c-14,0 -28,0 -41.8,0c-13.9,0 -27.5,0 -41.4,0c-13.8,0 -27.8,0 -34.8,0l-7,0l0,-196z"
              className="fill-accent-500"
            />
          </g>
        </svg>
      );
    case 'layered':
      return (
        <svg
          className={className}
          preserveAspectRatio="none"
          viewBox="0 0 960 460"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
        >
          <title>Layered wave</title>
          <path
            d="M0 352L14.5 365.3C29 378.7 58 405.3 87.2 407.5C116.3 409.7 145.7 387.3 174.8 392C204 396.7 233 428.3 262 443.7C291 459 320 458 349 443.2C378 428.3 407 399.7 436.2 392.8C465.3 386 494.7 401 523.8 415C553 429 582 442 611 437.7C640 433.3 669 411.7 698 406.2C727 400.7 756 411.3 785.2 413.3C814.3 415.3 843.7 408.7 872.8 407.8C902 407 931 412 945.5 414.5L960 417L960 0L945.5 0C931 0 902 0 872.8 0C843.7 0 814.3 0 785.2 0C756 0 727 0 698 0C669 0 640 0 611 0C582 0 553 0 523.8 0C494.7 0 465.3 0 436.2 0C407 0 378 0 349 0C320 0 291 0 262 0C233 0 204 0 174.8 0C145.7 0 116.3 0 87.2 0C58 0 29 0 14.5 0L0 0Z"
            className="fill-accent-50"
          ></path>
          <path
            d="M0 297L14.5 305.7C29 314.3 58 331.7 87.2 348.2C116.3 364.7 145.7 380.3 174.8 369.2C204 358 233 320 262 315.3C291 310.7 320 339.3 349 342.3C378 345.3 407 322.7 436.2 325.3C465.3 328 494.7 356 523.8 365.5C553 375 582 366 611 367.7C640 369.3 669 381.7 698 387.7C727 393.7 756 393.3 785.2 376.2C814.3 359 843.7 325 872.8 318.3C902 311.7 931 332.3 945.5 342.7L960 353L960 0L945.5 0C931 0 902 0 872.8 0C843.7 0 814.3 0 785.2 0C756 0 727 0 698 0C669 0 640 0 611 0C582 0 553 0 523.8 0C494.7 0 465.3 0 436.2 0C407 0 378 0 349 0C320 0 291 0 262 0C233 0 204 0 174.8 0C145.7 0 116.3 0 87.2 0C58 0 29 0 14.5 0L0 0Z"
            className="fill-accent-100"
          ></path>
          <path
            d="M0 309L14.5 309.8C29 310.7 58 312.3 87.2 309.5C116.3 306.7 145.7 299.3 174.8 286.8C204 274.3 233 256.7 262 254.3C291 252 320 265 349 272.3C378 279.7 407 281.3 436.2 272.7C465.3 264 494.7 245 523.8 252.2C553 259.3 582 292.7 611 293.7C640 294.7 669 263.3 698 255C727 246.7 756 261.3 785.2 272.5C814.3 283.7 843.7 291.3 872.8 297.7C902 304 931 309 945.5 311.5L960 314L960 0L945.5 0C931 0 902 0 872.8 0C843.7 0 814.3 0 785.2 0C756 0 727 0 698 0C669 0 640 0 611 0C582 0 553 0 523.8 0C494.7 0 465.3 0 436.2 0C407 0 378 0 349 0C320 0 291 0 262 0C233 0 204 0 174.8 0C145.7 0 116.3 0 87.2 0C58 0 29 0 14.5 0L0 0Z"
            className="fill-accent-200"
          ></path>
          <path
            d="M0 241L14.5 242.3C29 243.7 58 246.3 87.2 238C116.3 229.7 145.7 210.3 174.8 210.3C204 210.3 233 229.7 262 227.3C291 225 320 201 349 197.8C378 194.7 407 212.3 436.2 211.5C465.3 210.7 494.7 191.3 523.8 179.5C553 167.7 582 163.3 611 171C640 178.7 669 198.3 698 214.7C727 231 756 244 785.2 248.8C814.3 253.7 843.7 250.3 872.8 237.3C902 224.3 931 201.7 945.5 190.3L960 179L960 0L945.5 0C931 0 902 0 872.8 0C843.7 0 814.3 0 785.2 0C756 0 727 0 698 0C669 0 640 0 611 0C582 0 553 0 523.8 0C494.7 0 465.3 0 436.2 0C407 0 378 0 349 0C320 0 291 0 262 0C233 0 204 0 174.8 0C145.7 0 116.3 0 87.2 0C58 0 29 0 14.5 0L0 0Z"
            className="fill-accent-300"
          ></path>
          <path
            d="M0 151L14.5 152.8C29 154.7 58 158.3 87.2 153.3C116.3 148.3 145.7 134.7 174.8 124.3C204 114 233 107 262 113.8C291 120.7 320 141.3 349 152.3C378 163.3 407 164.7 436.2 159.7C465.3 154.7 494.7 143.3 523.8 136.3C553 129.3 582 126.7 611 124.5C640 122.3 669 120.7 698 128C727 135.3 756 151.7 785.2 156.7C814.3 161.7 843.7 155.3 872.8 149.5C902 143.7 931 138.3 945.5 135.7L960 133L960 0L945.5 0C931 0 902 0 872.8 0C843.7 0 814.3 0 785.2 0C756 0 727 0 698 0C669 0 640 0 611 0C582 0 553 0 523.8 0C494.7 0 465.3 0 436.2 0C407 0 378 0 349 0C320 0 291 0 262 0C233 0 204 0 174.8 0C145.7 0 116.3 0 87.2 0C58 0 29 0 14.5 0L0 0Z"
            className="fill-accent-400"
          ></path>
          <path
            d="M0 104L14.5 101C29 98 58 92 87.2 88.5C116.3 85 145.7 84 174.8 77.2C204 70.3 233 57.7 262 57.8C291 58 320 71 349 81C378 91 407 98 436.2 100.8C465.3 103.7 494.7 102.3 523.8 103.5C553 104.7 582 108.3 611 103.7C640 99 669 86 698 74.7C727 63.3 756 53.7 785.2 50.8C814.3 48 843.7 52 872.8 55.8C902 59.7 931 63.3 945.5 65.2L960 67L960 0L945.5 0C931 0 902 0 872.8 0C843.7 0 814.3 0 785.2 0C756 0 727 0 698 0C669 0 640 0 611 0C582 0 553 0 523.8 0C494.7 0 465.3 0 436.2 0C407 0 378 0 349 0C320 0 291 0 262 0C233 0 204 0 174.8 0C145.7 0 116.3 0 87.2 0C58 0 29 0 14.5 0L0 0Z"
            className="fill-accent-500"
          ></path>
        </svg>
      );
    default:
      return null;
  }
}
