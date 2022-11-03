import { RequestHandler, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';

import { MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from 'config';

const uploadOptions: multer.Options = {
  fileFilter: (req, file, callback) => {
    const ext = path.extname(file.originalname);
    if (
      !ALLOWED_FILE_TYPES.includes(ext) &&
      file.mimetype !== 'application/json'
    ) {
      return callback(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
    }
    callback(null, true);
  },
  limits: {
    files: 2,
    fileSize: MAX_FILE_SIZE * 1024,
  },
};

const getHandleUploadErrors = (res: Response, next: NextFunction) => {
  return (err: unknown) => {
    if (!err) return next();

    if (!(err instanceof multer.MulterError)) return next(err);

    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(500).json('Unsupported file type');
    }

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res
        .status(500)
        .json(
          `The image is too large. The current limit is ${MAX_FILE_SIZE}Kb`
        );
    }

    next(err);
  };
};

export const uploadSingle = (name: string) => {
  const handleUpload: RequestHandler = (req, res, next) => {
    const upload = multer(uploadOptions).single(name);

    upload(req, res, getHandleUploadErrors(res, next));
  };

  return handleUpload;
};

export const uploadPostFields: RequestHandler = (req, res, next) => {
  const upload = multer(uploadOptions).fields([
    {
      name: 'post-image',
      maxCount: 1,
    },
    {
      name: 'request-json',
      maxCount: 1,
    },
  ]);

  upload(req, res, getHandleUploadErrors(res, next));
};

export const updloadSettingsFields: RequestHandler = (req, res, next) => {
  const upload = multer(uploadOptions).fields([
    {
      name: 'profile-picture',
      maxCount: 1,
    },
    {
      name: 'request-json',
      maxCount: 1,
    },
  ]);

  upload(req, res, getHandleUploadErrors(res, next));
};
