import BlogCard from '../../components/BlogCard/BlogCard';
import SmallPost from '../../components/Posts/SmallPost';
import NormalPost from '../../components/Posts/NormalPost';
import LargePost from '../../components/Posts/LargePost';
import { getPostsData, blogInfo } from '../../utility/mockData';

const renderPost = (postData: Post) => {
  switch (postData.displayType) {
    case 0:
      return <SmallPost key={postData._id} {...postData} />;
    case 1:
      return <NormalPost key={postData._id} {...postData} />;
    case 2:
      return (
        <LargePost
          key={postData._id}
          {...postData}
          // className="hidden lg:block"
          textBoxClass="bottom-0 w-5/6 h-full max-h-64"
        />
      );
  }
};

export default function Blog() {
  const postsData = getPostsData(10);

  return (
    <main className="py-8 p-page">
      <div className="flex flex-row-reverse gap-4 xs:gap-8">
        <BlogCard {...blogInfo} />
        <div className="">
          <div className="p-4 bg-accent-200 mb-6 rounded-md">
            <h3 className="font-display font-semibold text-2xl mb-2">
              Description
            </h3>
            <p>{blogInfo.description}</p>
          </div>
          <ul className="[&>*]:mb-6 [&>*]:rounded-md [&>*:last-child]:mb-0">
            {postsData.map((postData) => renderPost(postData))}
          </ul>
        </div>
      </div>
    </main>
  );
}
