import { useNavigate, useParams } from 'react-router';
import { useState } from 'react';

import { PostEditor } from '../components';
import {
  useGetPostQuery,
  useEditPostMutation,
  useDeletePostMutation,
} from '../api/postsApi';
import { PageNotFound } from 'features/misc';
import { Button, Spinner } from 'components/Elements';
import { UpdatePostValues } from '../types';
import { useFetch } from 'hooks';
import { POST_IMGS_LOCATION } from 'config';
import { useAppSelector } from 'stores/rootStore';
import { useNotifyError } from 'features/notifications';

export function Edit() {
  const user = useAppSelector((state) => state.authSlice.user);
  const navigate = useNavigate();
  const { id } = useParams();
  const [hasOngoingRequest, setHasOngoingRequest] = useState(false);
  const [editPostMutation] = useEditPostMutation();
  const [deletePostMutation] = useDeletePostMutation();
  const { data, isLoading, isError, error } = useGetPostQuery(id!, {
    skip: !id || !user?.blog,
  });
  const notifyError = useNotifyError();

  const image = useFetch<Blob>(POST_IMGS_LOCATION + data?.post.image!, {
    skip: !data?.post.image,
    isBlob: true,
  });

  if (isLoading || image.isLoading) {
    return (
      <div className="w-full h-100 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!id || !data) return <PageNotFound />;
  if (isError) {
    console.error(error);
    return <PageNotFound />;
  }

  if (image.isError) console.error(image.error);

  const initialData = {
    post: {
      ...data.post,
      image: image.data && {
        src: URL.createObjectURL(image.data),
        file: new File([image.data], 'image.png'),
      },
    },
    author: data.author,
  };

  const editPost = async (values: UpdatePostValues) => {
    if (hasOngoingRequest) return;
    setHasOngoingRequest(true);

    const response = await editPostMutation(values);

    setHasOngoingRequest(false);

    if ('error' in response) return notifyError(response.error);
    if (response.data.success) {
      navigate(`/blog/${data.author.username}`);
    }
  };

  const deletePost = async () => {
    if (hasOngoingRequest) return;
    setHasOngoingRequest(true);

    const response = await deletePostMutation(id);

    setHasOngoingRequest(false);

    if ('error' in response) return notifyError(response.error);
    if (response.data.success) {
      navigate(`/blog/${data.author.username}`);
    }
  };

  return (
    <PostEditor initialData={initialData} onSubmit={editPost}>
      <Button
        variant="danger"
        size="md"
        className="mt-4 mb-2"
        onClick={deletePost}
      >
        Delete post
      </Button>
    </PostEditor>
  );
}
