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
