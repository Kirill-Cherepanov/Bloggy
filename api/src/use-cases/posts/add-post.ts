import { makePost } from 'entity-validators';
import Post from 'models/Post';
import { addCategories } from 'use-cases/categories';
import { formatPost } from 'use-cases/lib';

export const addPost = async (
  data: unknown,
  authorName: string,
  image?: string
) => {
  const postData = makePost(data);

  const newPost = new Post({ ...postData, authorName, image });

  await newPost.save();

  if (postData.categories) addCategories(postData.categories);

  return formatPost(newPost);
};
