export type BlogData = {
  likes: number;
  categories?: string[];
  description?: string;
};
export type PublicData = {
  username: string;
  'profile-pic'?: string;
  blog?: BlogData;
};
export interface ProtectedData extends PublicData {
  email: string;
}
export interface PrivateData extends ProtectedData {
  password: string;
}
