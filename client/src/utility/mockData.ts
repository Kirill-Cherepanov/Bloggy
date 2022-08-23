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
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus consectetur amet nesciunt beatae dolores neque minima saepe maxime culpa tempore? Ad corporis in sit repudiandae reprehenderit quis quos delectus velit pariatur voluptatum mollitia, neque incidunt impedit quidem amet quas vero veritatis beatae soluta necessitatibus aliquid provident esse inventore. Voluptates praesentium placeat vero ipsum blanditiis nesciunt? Dolorem explicabo quasi, repudiandae recusandae atque saepe maiores? Sapiente quo maiores corporis, adipisci animi perferendis voluptatibus ipsa, possimus, recusandae officia culpa dolore consectetur aliquam unde magnam. Vitae quisquam voluptas quia esse amet quas temporibus magnam. Iure est nobis ipsum animi, excepturi ab! Sequi excepturi modi repellendus tenetur architecto reiciendis, adipisci totam, quas animi tempora repellat recusandae, voluptates officiis iste culpa! At expedita quas voluptates aliquid a animi excepturi molestiae odit corrupti unde! Ipsam praesentium molestiae saepe quidem placeat illum, quos harum recusandae, a nesciunt cumque, suscipit alias. Accusantium dignissimos voluptatibus porro doloribus dolorum cupiditate error totam maxime, sit saepe minus, est vel sunt illo fugiat eum aspernatur magni itaque recusandae officia atque labore minima alias? Nulla neque, illum modi nobis autem magnam, quod quo, voluptatum tempore itaque inventore! Error, nulla ullam. Libero, iusto incidunt odit non ut cumque adipisci. Minima, ipsa cum saepe quisquam a iure quas animi ducimus dolores accusantium assumenda totam porro, fugiat obcaecati excepturi nulla nihil explicabo blanditiis voluptas, sed consectetur placeat voluptates rem? Sed, inventore dicta vel quibusdam possimus voluptatibus nulla porro, id iste, quam repellat aliquam nostrum pariatur. Et dignissimos in earum odio aliquam beatae qui nostrum quidem sed consequuntur minus, fuga hic, reprehenderit esse cupiditate ab dolorem consequatur vel numquam! Quod, odit cupiditate laborum pariatur laudantium quam iure vel beatae debitis, assumenda provident possimus. Laudantium non hic id laboriosam sit! Quas consectetur culpa maiores perferendis, qui repellendus fugiat error animi, ratione atque, voluptatibus ea tenetur perspiciatis. Vitae, sequi magnam optio dicta harum reiciendis veritatis magni eligendi itaque suscipit? Similique culpa fuga totam, ea voluptatem perferendis ad dignissimos explicabo accusamus est? Accusantium ut labore deserunt corporis, accusamus voluptate corrupti molestias quisquam qui eum eaque aliquid, est assumenda incidunt ipsam nostrum nihil dolore vero neque libero, quibusdam a? Totam ut minus ea vero recusandae cupiditate debitis, illum a quam vel eligendi. Voluptate cum illo similique quam quidem dolorum doloribus assumenda odio quia voluptatibus veniam inventore, laborum placeat, exercitationem sit illum, praesentium reprehenderit laudantium accusamus soluta eum? Repellat ad hic vero ab harum molestiae quas perspiciatis ipsum iste accusamus saepe, ipsam amet aliquid excepturi aperiam quaerat expedita praesentium incidunt obcaecati aspernatur veniam repellendus! Temporibus facilis aspernatur quisquam porro architecto impedit id, eius accusamus dolorem non nesciunt unde necessitatibus eaque, iure delectus laboriosam explicabo? Dolor eum ab corporis, sint pariatur modi? Pariatur delectus enim fugit voluptatum officiis provident illo cum recusandae blanditiis excepturi nam sequi eveniet sed molestias ea quod voluptas, fuga impedit iste distinctio, tempora quos, deserunt vero facilis. Fugit, eveniet voluptates. Sapiente voluptate, nulla quis laborum ea voluptatum quos, doloremque in, quod possimus mollitia. Laudantium suscipit voluptatibus perferendis velit! Hic eligendi placeat quam repellat? Accusantium reiciendis corrupti officiis adipisci, numquam tempora!',
      image: mockImage,
      categories: [
        'Science',
        'Artificial Intelligence',
        'Electronics',
        'Future',
        'Computer science'
      ],
      likes: 100,
      authorName: 'KissMyUSSR',
      createdAt: new Date(0),
      displayType: i % 3
    }));
};
