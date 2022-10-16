import fs from 'fs';
import path from 'path';

import { POST_IMAGES_LOCATION, PROFILE_PICS_LOCATION } from 'config';

type RequestFilesType =
  | {
      [fieldname: string]: Express.Multer.File[];
    }
  | Express.Multer.File[];

export const saveFile = (file: Express.Multer.File, location: string) => {
  const fileName =
    path.parse(file.originalname).name +
    `.${Date.now()}` +
    path.extname(file.originalname);

  const filePath = path.join(location, fileName);

  fs.writeFile(filePath, file.buffer, (err) => {
    if (!err) return;
    console.error(err);
    throw Error('Server error');
  });

  return fileName;
};

export const savePostImage = (files?: RequestFilesType) => {
  if (!files || !('post-image' in files)) return undefined;

  const file = files['post-image'][0];

  return saveFile(file, POST_IMAGES_LOCATION);
};

export const saveProfilePic = (files?: RequestFilesType) => {
  if (!files || !('profile-picture' in files)) return undefined;

  const file = files['profile-picture'][0];

  return saveFile(file, PROFILE_PICS_LOCATION);
};
