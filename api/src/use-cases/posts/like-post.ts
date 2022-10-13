import Post from 'models/Post';
import User from 'models/User';

export const likePost = async (postId: string, userId: string) => {
  const post = await Post.findById(postId);
  if (!post) return { status: 400, err: 'Post was not found' };

  const author = await User.findOne({ username: post.authorName });
  if (!author?.blog) throw Error(`The post ${post._id} doesn't have an author`);

  if (post.likes.includes(userId)) {
    post.likes = post.likes.filter((upvoter) => upvoter !== userId);
    author.blog.likes--;
  } else {
    post.likes.push(userId);
    author.blog.likes++;
  }

  post.save();
  author.save();

  return { success: true };
};
