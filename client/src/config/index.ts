export const API_URL =
  process.env.NODE_ENV === 'production' ? process.env.API_URL! : '/api';

export const PROFILE_PICS_LOCATION = API_URL + '/images/profilePics/';
export const POST_IMGS_LOCATION = API_URL + '/images/postImgs/';
