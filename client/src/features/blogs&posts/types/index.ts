import { PostData } from 'types';

export type CreatePostValues = {
  title: string;
  text: string;
  description: string;
  categories: string[];
  displayType: number;
};

export type PostDataProp = Omit<PostData, '_id'> & {
  _id?: string;
};
