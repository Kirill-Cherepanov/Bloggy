import multer from 'multer';
import path from 'path';

export const upload = multer({
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.avif' &&
      ext !== '.json' &&
      ext !== '.git' &&
      ext !== '.tiff' &&
      ext !== '.tif' &&
      file.mimetype !== 'application/json'
    ) {
      console.error(file);
      return callback(new Error('Only images and json are allowed'));
    }
    callback(null, true);
  },
  limits: {
    files: 2,
    fileSize: 1024 * 1024 * 0.5,
  },
});

export const uploadPostFields = upload.fields([
  {
    name: 'post-image',
    maxCount: 1,
  },
  {
    name: 'request-json',
    maxCount: 1,
  },
]);

export const updloadSettingsFields = upload.fields([
  {
    name: 'profile-picture',
    maxCount: 1,
  },
  {
    name: 'request-json',
    maxCount: 1,
  },
]);
