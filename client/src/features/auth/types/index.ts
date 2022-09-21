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

export type ResetPasswordValues = {
  newPassword: string;
  message?: string;
};
