import { useNavigate, useParams } from 'react-router';

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

export function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editPostMutation] = useEditPostMutation();
  const [deletePostMutation] = useDeletePostMutation();
  const { data, isFetching, isError, error } = useGetPostQuery(id!, {
    skip: !id,
  });
  const image = useFetch<Blob>(`/api/images/postImgs/${data?.post.image!}`, {
    skip: !data?.post.image,
    isBlob: true,
  });

  if (isFetching || image.isFetching) {
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
    const response = await editPostMutation(values);

    if ('error' in response) throw response.error;
    if (response.data.success) {
      navigate(`/post/${response.data.post._id}`);
    }
  };

  const deletePost = async () => {
    const response = await deletePostMutation(id);

    if ('error' in response) throw response.error;
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
