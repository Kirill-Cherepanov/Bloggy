import { Drawer, Icon } from 'components/Elements';
import { useAppSelector } from 'stores/rootStore';
import { PostData } from 'types';
import { usePost } from '../hooks';

type PostDisplaysPreviewProps = {
  close: () => unknown;
  setDisplay: React.Dispatch<React.SetStateAction<number>>;
  postData: PostData;
  image?: string;
};

export function PostDisplaysPreview({
  close,
  setDisplay,
  postData,
  image,
}: PostDisplaysPreviewProps) {
  const user = useAppSelector((state) => state.authSlice.user);
  const { renderPost, getDisplayName } = usePost(true);
  const incrementDisplay = () => {
    setDisplay((display) => (display >= 2 ? 2 : display + 1));
  };
  const decrementDisplay = () => {
    setDisplay((display) => (display <= 0 ? 0 : display - 1));
  };

  if (!user) throw Error('User is undefined');

  return (
    <Drawer id="post-displays-preview" closeMenu={close} className="pt-16">
      <h3 className="absolute left-1/2 -translate-x-1/2 top-5 font-semibold text-2xl">
        Post preview
      </h3>
      {renderPost(postData)}

      <div className="flex justify-center items-center gap-1 mt-2">
        <button onClick={decrementDisplay} className="flex items-center">
          <Icon type="angle" className="inline mt-[1px] h-5" />
        </button>
        <span className="font-semibold">
          {getDisplayName(postData.displayType)}
        </span>
        <button onClick={incrementDisplay} className="flex items-center">
          <Icon type="angle" className="inline mt-[1px] h-5 rotate-180" />
        </button>
      </div>
    </Drawer>
  );
}
