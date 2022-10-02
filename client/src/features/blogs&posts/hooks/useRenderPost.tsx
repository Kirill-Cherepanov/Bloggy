import { NormalPost, SmallPost, LargePost } from '../components';
import { PostDataProp } from '../types';

export const useRenderPost = () => ({
  renderPost: (postData: PostDataProp) => {
    switch (postData.displayType) {
      case 0:
        return <NormalPost key={postData._id} postData={postData} />;
      case 1:
        return <SmallPost key={postData._id} postData={postData} />;
      case 2:
        return <LargePost key={postData._id} postData={postData} />;
      default:
        return <></>;
    }
  },
  getDisplayName: (displayType: number) => {
    switch (displayType) {
      case 0:
        return 'Normal';
      case 1:
        return 'Small';
      case 2:
        return 'Large';
      default:
        return undefined;
    }
  },
});
