import { useNavigate } from 'react-router';
import { useState } from 'react';

import { PostEditor } from '../components';
import { CreatePostValues, PostValues } from '../types';
import { useCreatePostMutation } from '../api/postsApi';
import { useAppSelector } from 'stores/rootStore';
import { PageNotFound } from 'features/misc';

const initialPostValues: PostValues = {
  categories: [],
  displayType: 0,
  title: 'Enter your title here',
  text: '',
  description: '',
  _id: 'preview',
  authorName: '',
  likes: 100,
  createdAt: new Date().toISOString(),
  isLiked: false,
};

export function Create() {
  const navigate = useNavigate();
  const [createPostMutation] = useCreatePostMutation();
  const user = useAppSelector((state) => state.authSlice.user);
  const [hasOngoingRequest, setHasOngoingRequest] = useState(false);

  if (!user?.blog) return <PageNotFound />;

  initialPostValues.authorName = user.username;

  const initialData = {
    post: initialPostValues,
    author: user,
  };

  const createPost = async (values: CreatePostValues) => {
    if (hasOngoingRequest) return;
    setHasOngoingRequest(true);

    const response = await createPostMutation(values);

    setHasOngoingRequest(false);

    if ('error' in response) throw response.error;
    if (response.data.success) {
      navigate(`/post/${response.data.post._id}`);
    }
  };

  return <PostEditor initialData={initialData} onSubmit={createPost} />;
}
