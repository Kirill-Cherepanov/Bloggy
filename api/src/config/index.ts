import path from 'path';

// .env will be for variables that I don't want to show
// This config is for public variables

if (require.main === undefined) throw Error('require.main is undefined');
export const DIST_DIRECTORY = path.dirname(require.main.filename);

export const POST_IMAGES_LOCATION = path.join(
  DIST_DIRECTORY,
  '../images/postImgs'
);
export const PROFILE_PICS_LOCATION = path.join(
  DIST_DIRECTORY,
  '../images/postImgs'
);

export const ACCESS_TOKEN_EXPIRATION_TIME = '10m';

export const DEFAULT_PROFILE_PICTURE = 'default.jpg';

export const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://bloggy-kirill-cherepanov.netlify.app',
];

export const PORT = process.env.PORT || 5000;
