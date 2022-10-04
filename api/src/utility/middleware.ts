import multer from 'multer';
import path from 'path';
import { ErrorRequestHandler } from 'express';

export const upload = multer({
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.jpeg' &&
      ext !== '.json' &&
      file.mimetype !== 'application/json'
    ) {
      console.error(file);
      return callback(new Error('Only images and json are allowed'));
    }
    callback(null, true);
  },
  limits: {
    files: 2,
    fileSize: 1024 * 1024 * 6,
  },
});

export const handleMiddlewareErrors: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);
  res.status(500).json('Oops... Something went wrong');
};
