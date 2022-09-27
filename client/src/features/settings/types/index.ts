import { BlogData } from 'types';

export type UpdateUserValues = {
  password?: string;
  email?: string;
  username?: string;
  'profile-pic'?: string;
  blog?: Partial<BlogData>;
};

export type ConfirmPasswordValues = {
  'old-password': string;
} | void;
