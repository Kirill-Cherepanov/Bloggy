import path from 'path';

// .env will be for variables that I don't want to show
// this config is for public variables

export const POST_IMAGES_LOCATION = path.join(__dirname, '/images/postImgs');
export const PROFILE_PICS_LOCATION = path.join(__dirname, '/images/postImgs');

export const ACCESS_TOKEN_EXPIRATION_TIME = '10m';

export const DEFAULT_PROFILE_PICTURE = 'default.jpg';
