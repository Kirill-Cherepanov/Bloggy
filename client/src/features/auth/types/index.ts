export type BlogData = {
  likes: number;
  categories?: string[];
  description?: string;
};
export type PublicData = {
  username: string;
  profilePic?: string;
  blog?: BlogData;
};
export interface ProtectedData extends PublicData {
  email: string;
}
export interface PrivateData extends ProtectedData {
  password: string;
}

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
