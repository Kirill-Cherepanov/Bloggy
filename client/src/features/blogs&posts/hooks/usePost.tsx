import { NormalPost, SmallPost, LargePost } from '../components';
import { PostData } from 'types';

export const usePost = (isPreview: boolean | undefined = false) => ({
  renderPost: (postData: PostData) => {
    switch (postData.displayType) {
      case 0:
        return (
          <NormalPost
            key={postData._id}
            postData={postData}
            isPreview={isPreview}
          />
        );
      case 1:
        return (
          <SmallPost
            key={postData._id}
            postData={postData}
            isPreview={isPreview}
          />
        );
      case 2:
        return (
          <LargePost
            key={postData._id}
            postData={postData}
            isPreview={isPreview}
          />
        );
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
