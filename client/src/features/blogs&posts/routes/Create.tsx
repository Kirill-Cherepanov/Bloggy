import { useState } from 'react';
import { useNavigate } from 'react-router';
import SimpleMDE from 'easymde';
import SimpleMDEReact from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';

import { useCreatePostMutation } from '../api/postsApi';
import { PostDisplaysPreview } from '../components';
import { CreatePostValues, PostDataProp } from '../types';
import { useRenderPost } from '../hooks';
import { Post } from '.';
import { PageNotFound } from 'features/misc';
import { Icon, Picker, Logo } from 'components/Elements';
import { useAppSelector } from 'stores/globalStore';
import { inputFiles } from 'utility/inputFiles';
import { useDisclosure } from 'hooks';

const simpleMDEOptions: SimpleMDE.Options = { spellChecker: false };

export function Create() {
  const [image, setImage] = useState<{
    src: string;
    file: File;
  }>();
  const [categories, setCategories] = useState<string[]>([]);
  const [display, setDisplay] = useState(0);
  const [title, setTitle] = useState('Enter your title here');
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');

  const [createPost] = useCreatePostMutation();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.authSlice.user);
  const { getDisplayName } = useRenderPost();
  const displaysPreviewDisclosure = useDisclosure();
  const openResultPreview = useDisclosure();

  if (!user?.blog) return <PageNotFound />;

  const createPostData: CreatePostValues = {
    categories,
    displayType: display,
    title,
    text,
    description,
  };

  const previewPostData: PostDataProp = {
    ...createPostData,
    createdAt: new Date().toISOString(),
    authorName: user.username,
    likes: 100,
    image: image?.src,
  };

  return (
    <main className="px-page py-4 pb-10">
      <div className="pb-2 w-full flex justify-center items-end border-b relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 hover:scale-105"
          onClick={() => {
            if (openResultPreview.isOpen) return openResultPreview.close();
            navigate(-1);
          }}
        >
          <Icon type="long-arrow" className="h-4 text-secondary-600" />
        </button>
        <Logo size="md" />
        <button
          className="absolute right-0 text-xl transition-all hover:tracking-wider group"
          onClick={async () => {
            if (!openResultPreview.isOpen) {
              if (title.length < 1) return setTitle('Enter your title here');
              return openResultPreview.open();
            }

            const response = await createPost({
              data: createPostData,
              image: image?.file,
            });

            if ('error' in response) throw response.error;
            if (response.data.success) {
              navigate(`/post/${response.data.post._id}`);
            }
          }}
        >
          {openResultPreview.isOpen ? 'Create post' : 'Preview result'}
          <Icon
            type="angle"
            className="inline h-5 ml-1 mb-0.5 rotate-180 transition-all group-hover:ml-1.5"
          />
        </button>
      </div>

      {openResultPreview.isOpen ? (
        <Post postData={previewPostData} />
      ) : (
        <>
          <h2
            className="text-3xl font-bold text-center my-5 focus:outline-none focus:bg-secondary-200 hover:bg-secondary-200"
            contentEditable={true}
            suppressContentEditableWarning={true}
            onChange={(e) => setTitle(e.currentTarget.textContent || '')}
          >
            {title}
          </h2>

          <button
            className="relative w-full flex justify-center group focus:bg-secondary-200 hover:bg-secondary-200 mb-10  "
            onClick={() => {
              inputFiles((files) => {
                if (image) URL.revokeObjectURL(image.src);
                const src = URL.createObjectURL(files[0]);
                setImage({ src, file: files[0] });
              });
            }}
          >
            {image ? (
              <>
                <button
                  onClick={(e) => {
                    setImage(undefined);
                    e.stopPropagation();
                  }}
                  className="absolute right-0 top-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-20 bg-white"
                >
                  <Icon type="close" className="h-10" />
                </button>
                <img
                  src={image.src}
                  alt="post"
                  className="mx-auto max-w-full"
                />
                <Icon
                  type="image"
                  className="h-full absolute opacity-0 group-hover:opacity-40"
                />
              </>
            ) : (
              <Icon type="image" className="h-40" />
            )}
          </button>

          <SimpleMDEReact
            className="custom-markdown"
            options={simpleMDEOptions}
            value={text}
            onChange={(value) => setText(value)}
          />

          <h3 className="text-lg mb-2">Categories</h3>
          <Picker
            data={categories}
            setData={setCategories}
            maxLength={10}
            filter={(category) => category !== '' && category.length <= 20}
          />

          <h3 className="text-lg mt-4 mb-2">Description</h3>
          <textarea
            placeholder="Enter the description of the post"
            className="border border-secondary-300 rounded-sm w-full min-h-[125px] px-2"
            value={description}
            onChange={({ target }) => {
              if (target.value.length < 300)
                return setDescription(target.value);
              target.value = description;
            }}
          />

          <h3 className="text-lg mt-4 mb-2">
            Display type:
            <button
              className="inline-flex ml-1.5 items-center group transition-all hover:tracking-wider"
              onClick={displaysPreviewDisclosure.open}
            >
              {getDisplayName(display)}
              <Icon
                type="angle"
                className="ml-0.5 inline h-5 rotate-180 transition-all group-hover:ml-1"
              />
            </button>
          </h3>
          {displaysPreviewDisclosure.isOpen && (
            <PostDisplaysPreview
              close={displaysPreviewDisclosure.close}
              setDisplay={setDisplay}
              postData={previewPostData}
              image={image?.src}
            />
          )}
        </>
      )}
    </main>
  );
}
