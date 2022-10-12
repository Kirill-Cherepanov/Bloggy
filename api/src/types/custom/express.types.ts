import { Request, Response } from 'express';

export type SimplifiedRequest = Pick<
  Request,
  'body' | 'query' | 'params' | 'user' | 'files'
>;
export type Controller = (req: SimplifiedRequest, res: Response) => unknown;
