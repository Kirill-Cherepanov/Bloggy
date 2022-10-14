import fs from 'fs';
import path from 'path';

import { POST_IMAGES_LOCATION, PROFILE_PICS_LOCATION } from 'config';

export const deleteFile = (filePath: string) => {
  fs.unlink(filePath, (err) => err && console.error(err));
};

export const deletePostImage = (fileName: string) => {
  deleteFile(path.join(POST_IMAGES_LOCATION, fileName));
};

export const deleteProfilePic = (fileName: string) => {
  deleteFile(path.join(PROFILE_PICS_LOCATION, fileName));
};
