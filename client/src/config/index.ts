const IS_DEPLOY = process.env.NODE_ENV === 'production';

const DEPLOY_API_URL = 'https://bloggy.fly.dev/api';
const LOCAL_API_URL = '/api';
export const API_URL = IS_DEPLOY ? DEPLOY_API_URL : LOCAL_API_URL;

export const PROFILE_PICS_LOCATION = API_URL + '/images/profile-pictures/';
export const POST_IMGS_LOCATION = API_URL + '/images/post-images/';
