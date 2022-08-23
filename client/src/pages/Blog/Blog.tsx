import BlogCard from '../../components/BlogCard/BlogCard';
import SmallPost from '../../components/Posts/SmallPost';
import LargePost from '../../components/Posts/LargePost';
import mockImage from '../../images/mock-up-image.webp';

const renderPost = (postData: Post) => {
  switch (postData.displayType) {
    case 0:
      return <SmallPost key={postData._id} {...postData} />; // It should be normal/default post
    case 1:
      return <SmallPost key={postData._id} {...postData} />;
    case 2:
      return <LargePost key={postData._id} {...postData} />;
  }
};

export default function Blog() {
  const colorScheme = {};

  const postsData: Post[] = Array(5)
    .fill(0)
    .map((v, i) => ({
      _id: String(i),
      title: 'Just a natural post title',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ex repellendus tempore reiciendis est voluptates eos inventore dolore molestiae error, doloremque reprehenderit neque illum voluptate pariatur quisquam voluptatum! Porro quod veritatis atque nisi cumque sint, accusamus quidem totam, harum cupiditate nam dolorum cum exercitationem libero dolor similique voluptate debitis eius rerum, praesentium id ea obcaecati autem. Neque nisi quisquam incidunt culpa, porro amet expedita, assumenda quo molestias ipsam ea soluta magni, tenetur corporis officia explicabo officiis ipsum veniam temporibus facilis voluptatem voluptatibus maxime libero. Accusantium quos veritatis corrupti natus quam reiciendis amet ratione quod, ad qui est et laboriosam alias.',
      image: mockImage,
      categories: ['Science', 'Artificial Intelligence'],
      authorName: 'KissMyUSSR',
      createdAt: new Date(0),
      displayType: i % 3
    }));

  const blogInfo: Blog = {
    _id: '0',
    email: 'mail@mail.mail',
    password: 'none_of_your_business',
    username: 'KissMyUSSR',
    profilePic: mockImage,
    likes: 2000,
    categories: [
      'Science',
      'Math',
      'Physics',
      'Electronics',
      'Computer science'
    ],
    description:
      "This blog is a test blog for development. It doesn't have a theme and all of its posts are just templates. Don't mind it. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ex repellendus tempore reiciendis est voluptates eos inventore dolore molestiae error, doloremque reprehenderit neque illum voluptate pariatur quisquam voluptatum! Porro quod veritatis atque nisi cumque sint, accusamus quidem totam, harum cupiditate nam dolorum cum exercitationem libero dolor similique voluptate debitis eius rerum, praesentium id ea obcaecati autem.",
    registrationDate: new Date(0),
    createdAt: new Date(0)
  };

  return (
    <main className="py-6 px-4 xs:px-8 sm:px-12 md:px-20 max-w-7xl mx-auto">
      <div className="flex flex-row-reverse gap-4 xs:gap-8">
        <BlogCard {...blogInfo} />
        <div className="[&>*]:mb-4 [&>*]:last:mb-0">
          <div className="">
            <h3 className="">Description</h3>
            <p>{blogInfo.description}</p>
          </div>
          {postsData.map((postData) => renderPost(postData))}
        </div>
      </div>
    </main>
  );
}
