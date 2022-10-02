export type BlogData = {
  likes: number;
  categories: string[];
  description: string;
  createdAt: string;
};
export type PublicData = {
  username: string;
  profilePic: string;
  blog?: BlogData;
  createdAt: string;
};
export interface ProtectedData extends PublicData {
  email: string;
}
export interface PrivateData extends ProtectedData {
  password: string;
}

export type PostData = {
  _id: string;
  title: string;
  text: string;
  description: string;
  authorName: string;
  likes: number;
  categories: string[];
  displayType: number;
  createdAt: string;
  image?: string;
};
