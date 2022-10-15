import { ErrorRequestHandler } from 'express';

export const handleMiddlewareErrors: ErrorRequestHandler = (
  err,
  req,
  res,
  next
) => {
  console.error(err);
  res.status(501).json('Oops... Something went wrong');
};
