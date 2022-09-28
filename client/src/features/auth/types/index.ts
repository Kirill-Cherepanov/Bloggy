export type RegistrationValues = {
  email: string;
  username: string;
  password: string;
  'confirm-email': string;
  'start-blog': boolean;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type ResetPasswordValues =
  | {
      email: string;
      'new-password': string;
      'confirm-email': string;
    }
  | { email: string };
