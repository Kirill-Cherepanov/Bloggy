import { Document, ObjectId } from 'mongoose';

export type TPost = {
  title: string;
  text: string;
  description: string;
  image: string;
  authorName: string;
  likes: string[];
  categories: string[];
  displayType: number;
};

// export type ClientTPost = Omit<TPost, 'likes'> & { likes: number; isLiked: boolean };

export interface Post extends Document, TPost {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;

  _doc: TPost & {
    _id: ObjectId;
    createdAt: Date;
    updatedAt: Date;
  };
}
