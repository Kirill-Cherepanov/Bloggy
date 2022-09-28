import { BlogData } from 'types';

export type UpdateUserValues = {
  password?: string;
  email?: string;
  username?: string;
  'profile-picture'?: string;
  blog?: Partial<BlogData> & {
    shouldDelete?: true;
  };
};

export type ConfirmPasswordValues = {
  'old-password': string;
} | void;
