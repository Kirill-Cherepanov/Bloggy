export type PreRegistrationValues = {
  email?: string;
  username?: string;
};

export type RegistrationValues = {
  email: string;
  username: string;
  password: string;
  confirmationMessage: string;
  shouldSendAgain: boolean;
};

export type LoginValues = {
  email: string;
  password: string;
};

export type ResetPasswordValues =
  | {
      email: string;
      newPassword: string;
      confirmationMessage: string;
    }
  | { email: string };
