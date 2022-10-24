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
  '../images/profilePics'
);

export const ACCESS_TOKEN_EXPIRATION_TIME = '10m';

export const DEFAULT_PROFILE_PICTURE = 'default.jpg';

export const ALLOWED_ORIGINS = [
  'https://bloggy-kirill-cherepanov.netlify.app',
  'localhost:3000',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://37.214.72.201:3000',
  'http://192.168.100.3:3000',
];

export const PORT = process.env.PORT || 5000;
