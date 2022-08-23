import mockImage from '../images/mock-up-image.webp';

export const blogInfo: Blog = {
  _id: '0',
  email: 'mail@mail.mail',
  password: 'none_of_your_business',
  username: 'KissMyUSSR',
  profilePic: mockImage,
  likes: 200,
  categories: ['Science', 'Math', 'Physics', 'Electronics', 'Computer science'],
  description:
    "This blog is a test blog for development. It doesn't have a theme and all of its posts are just templates. Don't mind it. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ex repellendus tempore reiciendis est voluptates eos inventore dolore molestiae error, doloremque reprehenderit neque illum voluptate pariatur quisquam voluptatum! Porro quod veritatis atque nisi cumque sint, accusamus quidem totam, harum cupiditate nam dolorum cum exercitationem libero dolor similique voluptate debitis eius rerum, praesentium id ea obcaecati autem.",
  registrationDate: new Date(0),
  createdAt: new Date(0)
};

export const getPostsData = (postsAmount: number): Post[] => {
  return Array(postsAmount)
    .fill(0)
    .map((v, i) => ({
      _id: String(i),
      title: 'Just a natural post title',
      text: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nihil ex repellendus tempore reiciendis est voluptates eos inventore dolore molestiae error, doloremque reprehenderit neque illum voluptate pariatur quisquam voluptatum! Porro quod veritatis atque nisi cumque sint, accusamus quidem totam, harum cupiditate nam dolorum cum exercitationem libero dolor similique voluptate debitis eius rerum, praesentium id ea obcaecati autem. Neque nisi quisquam incidunt culpa, porro amet expedita, assumenda quo molestias ipsam ea soluta magni, tenetur corporis officia explicabo officiis ipsum veniam temporibus facilis voluptatem voluptatibus maxime libero. Accusantium quos veritatis corrupti natus quam reiciendis amet ratione quod, ad qui est et laboriosam alias.',
      image: mockImage,
      categories: ['Science', 'Artificial Intelligence'],
      likes: 100,
      authorName: 'KissMyUSSR',
      createdAt: new Date(0),
      displayType: i % 3
    }));
};
