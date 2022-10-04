import { useNavigate, useParams } from 'react-router';

import { PostEditor } from '../components';
import { useGetPostQuery, useEditPostMutation } from '../api/postsApi';
import { PageNotFound } from 'features/misc';
import { Spinner } from 'components/Elements';
import { UpdatePostValues } from '../types';
import { useGetImageQuery } from 'lib/generalApi';

export function Edit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [editPostMutation] = useEditPostMutation();
  const { data, isFetching, isError, error } = useGetPostQuery(id!, {
    skip: !id,
  });
  const image = useGetImageQuery(data?.post.image!, {
    skip: !data?.post.image || isError || isFetching,
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

  const initialData = {
    post: {
      ...data.post,
      image: image.data && {
        src: data.post.image!,
        file: image.data,
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

  return <PostEditor initialData={initialData} onSubmit={editPost} />;
}
