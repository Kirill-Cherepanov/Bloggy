import { makePost } from 'entity-validators';
import Post from 'models/Post';

export const addPost = async (
  data: unknown,
  authorName: string,
  image?: string
) => {
  const post = makePost(data);

  const newPost = new Post({ ...post, authorName, image });

  await newPost.save();

  return newPost;
};
