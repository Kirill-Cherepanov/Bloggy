import Post from './Post/Post';
import './Posts.css';

type Props = {
  posts: Post[];
};

export default function Posts({ posts }: Props) {
  return (
    <div className="posts">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
}
