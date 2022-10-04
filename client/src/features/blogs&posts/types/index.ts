import { PostData } from 'types';

export type CreatePostValues = {
  data: {
    title: string;
    text: string;
    description: string;
    categories: string[];
    displayType: number;
  };
  image?: File;
};

export interface UpdatePostValues extends CreatePostValues {
  data: CreatePostValues['data'] & {
    _id: string;
  };
}

export type PostValues = Omit<PostData, 'image'> & {
  image?: {
    src: string;
    file: File;
  };
};
