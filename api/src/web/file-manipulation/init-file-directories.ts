import fs from 'fs';

import { POST_IMAGES_LOCATION, PROFILE_PICS_LOCATION } from 'config';

export const initFileDirectories = () => {
  if (!fs.existsSync(POST_IMAGES_LOCATION)) {
    fs.mkdirSync(POST_IMAGES_LOCATION, { recursive: true });
  }

  if (!fs.existsSync(PROFILE_PICS_LOCATION)) {
    fs.mkdirSync(PROFILE_PICS_LOCATION, { recursive: true });
  }
};
