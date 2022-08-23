import TinyPost from '../Posts/TinyPost';
import { getPostsData } from '../../utility/mockData';

type Props = {
  shouldRenderPopular?: boolean;
  children?: JSX.Element;
};

export default function Aside({ children, shouldRenderPopular = true }: Props) {
  return (
    <aside className="w-80 shrink-0 bg-secondary-800">
      <div>{children}</div>
      {!shouldRenderPopular ? null : (
        <div>
          <h3>Popular posts</h3>
          {getPostsData(5).map((postData) => (
            <TinyPost {...postData} />
          ))}
        </div>
      )}
    </aside>
  );
}
