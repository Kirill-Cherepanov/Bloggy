import { ErrorRequestHandler } from 'express';

export const handleErrors: ErrorRequestHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json('Oops... Something went wrong');
};
