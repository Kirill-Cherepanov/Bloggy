import Icon from '../../components/Icon/Icon';
import { getPostsData } from '../../utility/mockData';
import { Link } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import Aside from '../../components/Aside/Aside';

export default function Post() {
  const postData = getPostsData(1)[0];

  return (
    <main className="py-8 px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto">
      <div className="border-b pb-1 border-secondary-300 flex justify-between">
        <button>
          <Icon type="long-arrow" className="h-4 text-secondary-700" />
        </button>
        <div className=" font-extralight">
          By{' '}
          <Link
            to={'/blog/' + postData.authorName}
            className="font-normal hover:underline"
          >
            {postData.authorName}
          </Link>
          <span className="">{' | ' + formatDate(postData.createdAt)}</span>
        </div>
      </div>
      <h2 className="text-3xl font-bold text-center my-5">{postData.title}</h2>
      <img
        src={postData.image}
        alt="post"
        className="mx-auto max-w-full my-5"
      />
      <div className="flex">
        <p className="xl:text-lg">{postData.text}</p>
        <Aside>
          <div>
            {postData.categories.map((category) => (
              <span>{category}</span>
            ))}
          </div>
        </Aside>
      </div>
      <div>
        <div>More on this blog</div>
      </div>
      <div>
        <div>Similar Posts</div>
      </div>
    </main>
  );
}
