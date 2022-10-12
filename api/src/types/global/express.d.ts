import { UserTokenData } from 'types/custom';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: UserTokenData;
    }
  }
}
