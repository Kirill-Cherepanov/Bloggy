import './Post.css';
import { Link } from 'react-router-dom';

type Props = {
  post: {
    _id: string;
    title: string;
    desc: string;
    createdAt: string;
    photo: string;
    categories: {
      _id: string;
      name: string;
    }[];
  };
};

export default function Post({ post }: Props) {
  const PF = 'http://localhost:5000/images/';
  return (
    <div className="post">
      {post.photo && <img className="postImg" src={PF + post.photo} alt="" />}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category) => (
            <span className="postCat">{category.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
