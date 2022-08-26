import ExtensiveSearchBar from '../../components/ExtensiveSearchBar/ExtensiveSearchBar';
import Aside from '../../components/Aside/Aside';
import LargePost from '../../components/Posts/LargePost';
import SmallPost from '../../components/Posts/SmallPost';
import { getPostsData } from '../../utility/mockData';
import ParallelogramCurtains from '../../components/ParallelogramCurtains/ParallelogramCurtains';

export default function Catalog() {
  const posts = getPostsData(22);

  return (
    <main className="py-8">
      <ExtensiveSearchBar />
      <ul>
        <div>
          <LargePost />
          <SmallPost />
          <SmallPost />
          <SmallPost />
        </div>

        <div>
          <div>
            <SmallPost />
            <SmallPost />
            <SmallPost />
            <LargePost />
          </div>
          <Aside />
        </div>

        <div>
          <ParallelogramCurtains />
        </div>

        <div>
          <LargePost />
          <LargePost />
        </div>
      </ul>

      <div>
        <div>
          <Icon type="angle" />
        </div>
        <div>
          <Icon type="angle" />
        </div>
      </div>
    </main>
  );
}
