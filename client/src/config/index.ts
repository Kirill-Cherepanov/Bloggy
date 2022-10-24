const DEPLOY_API_URL = 'https://bloggy-api.onrender.com/api';
export const API_URL =
  process.env.NODE_ENV === 'production' ? DEPLOY_API_URL : '/api';

export const PROFILE_PICS_LOCATION = API_URL + '/images/profilePics/';
export const POST_IMGS_LOCATION = API_URL + '/images/postImgs/';
