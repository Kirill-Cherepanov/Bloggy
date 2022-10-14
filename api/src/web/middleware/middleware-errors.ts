import { ErrorRequestHandler } from 'express';

export const handleMiddlewareErrors: ErrorRequestHandler = (err, req, res) => {
  console.error(err);
  res.status(500).json('Oops... Something went wrong');
};
