import multer from 'multer';
import path from 'path';
import { ErrorRequestHandler } from 'express';

export const upload = multer({
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (
      ext !== '.png' &&
      ext !== '.jpg' &&
      ext !== '.gif' &&
      ext !== '.jpeg' &&
      ext !== '.json'
    ) {
      return callback(new Error('Only images and json are allowed'));
    }
    callback(null, true);
  },
  limits: {
    files: 1,
    fileSize: 1024 * 1024 * 4,
  },
});

export const handleMiddlewareErrors: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  res.status(500).json('Oops... Something went wrong');
};
