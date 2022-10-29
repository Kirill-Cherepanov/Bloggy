import path from 'path';

export const IS_DEPLOY = process.env.NODE_ENV === 'production';

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
  throw Error('Secret tokens are undefined!');
}
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

if (!process.env.EMAIL || !process.env.EMAIL_PASSWORD) {
  throw Error('Email credetials are undefined!');
}
export const EMAIL = process.env.EMAIL;
export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const dbLocation = IS_DEPLOY
  ? process.env.DEPLOYED_DB_LOCATION
  : process.env.LOCAL_DB_LOCATION;
if (!dbLocation) throw Error('DB location is undefined!');
export const DB_LOCATION = dbLocation;

if (require.main === undefined) throw Error('require.main is undefined');
export const DIST_DIRECTORY = path.dirname(require.main.filename);

export const POST_IMAGES_LOCATION = path.join(
  DIST_DIRECTORY,
  '../images/post-images'
);
export const PROFILE_PICS_LOCATION = path.join(
  DIST_DIRECTORY,
  '../images/profile-pictures'
);

export const ACCESS_TOKEN_EXPIRATION_TIME = '10m';

export const DEFAULT_PROFILE_PICTURE = '';

export const ALLOWED_ORIGINS = [
  'https://bloggy-kirill-cherepanov.netlify.app',
  'http://localhost:3000',
  'http://127.0.0.1:3000',
  'http://192.168.100.1:3000',
  'http://192.168.100.2:3000',
  'http://192.168.100.3:3000',
  'http://192.168.100.4:3000',
  'http://192.168.100.5:3000',
];

export const PORT = process.env.PORT || 8080;
