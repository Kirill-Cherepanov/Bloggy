import Icon from '../../components/Icon/Icon';
import { getPostsData, blogInfo } from '../../utility/mockData';
import { Link, useNavigate } from 'react-router-dom';
import formatDate from '../../utility/formatDate';
import Aside from '../../components/Aside/Aside';
import ParallelogramCurtains from '../../components/ParallelogramCurtains/ParallelogramCurtains';

export default function Post() {
  const postData = getPostsData(1)[0];
  const navigate = useNavigate();

  return (
    <main className="py-8 px-page">
      <div className="border-b pb-1 border-secondary-300 flex justify-between">
        <button onClick={() => navigate(-1)}>
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
        className="mx-auto max-w-full mb-10"
      />
      <div className="flex relative gap-20">
        <div className="h-min">
          <p className="text-lg">{postData.text}</p>
          <div className="mt-10 w-full flex gap-8 bg-secondary-800 py-8 px-5 rounded-lg">
            <Link
              to={'/blog/' + blogInfo.username}
              className="h-36 w-36 shrink-0 my-auto"
            >
              <img
                src={blogInfo.profilePic}
                alt="blog"
                className="h-full w-full object-cover rounded-full"
              />
            </Link>
            <div>
              <Link
                to={'/blog/' + blogInfo.username}
                className="block w-min text-xl font-bold uppercase mb-3 text-accent-400 cursor-pointer hover:underline"
              >
                {blogInfo.username}
              </Link>
              <p className="text-main line-clamp-5 font-light">
                {blogInfo.description}
              </p>
            </div>
          </div>
        </div>
        <Aside>
          <div className="px-2 my-5">
            <h3 className="mx-auto mb-3 w-max bg-accent-400 px-3 py-2 font-bold text-xl uppercase">
              Categories
            </h3>
            <div className="flex flex-wrap justify-evenly gap-y-2 gap-x-2">
              {postData.categories.map((category) => (
                <span
                  key={category}
                  className="text-lg border text-main border-secondary-400 rounded-sm px-1 cursor-pointer hover:bg-main hover:text-accent-900 hover:border-accent-400 transition-colors"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </Aside>
      </div>
      <div className="mt-24 bg-accent-50 py-6">
        <h3 className="text-2xl font-display font-bold text-center mb-4">
          More on this blog
        </h3>
        <ParallelogramCurtains postsData={getPostsData(4)} />
      </div>
    </main>
  );
}

// import axios from 'axios';
// import { useContext, useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useLocation } from 'react-router';
// import { Context } from '../../context/Context';

// export default function SinglePost() {
//   const location = useLocation();
//   const path = location.pathname.split('/')[2];
//   const [post, setPost] = useState<Post | null>(null);
//   const PF = 'http://localhost:5000/images/';
//   const { user } = useContext(Context);
//   const [title, setTitle] = useState('');
//   const [desc, setDesc] = useState('');
//   const [updateMode, setUpdateMode] = useState(false);

//   useEffect(() => {
//     const getPost = async () => {
//       const res = await axios.get('/posts/' + path);
//       setPost(res.data);
//       setTitle(res.data.title);
//       setDesc(res.data.desc);
//     };
//     getPost();
//   }, [path]);

//   const handleDelete = async () => {
//     if (post === null || user === null) return;
//     try {
//       await axios.delete(`/posts/${post._id}`, {
//         data: { username: user.username }
//       });
//       window.location.replace('/');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const handleUpdate = async () => {
//     if (post === null || user === null) return;
//     try {
//       await axios.put(`/posts/${post._id}`, {
//         username: user.username,
//         title,
//         desc
//       });
//       setUpdateMode(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="singlePost">
//       <div className="singlePostWrapper">
//         {post?.photo && (
//           <img src={PF + post.photo} alt="" className="singlePostImg" />
//         )}
//         {updateMode ? (
//           <input
//             type="text"
//             value={title}
//             className="singlePostTitleInput"
//             autoFocus
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         ) : (
//           <h1 className="singlePostTitle">
//             {title}
//             {post?.username === user?.username && (
//               <div className="singlePostEdit">
//                 <i
//                   className="singlePostIcon far fa-edit"
//                   onClick={() => setUpdateMode(true)}
//                 ></i>
//                 <i
//                   className="singlePostIcon far fa-trash-alt"
//                   onClick={handleDelete}
//                 ></i>
//               </div>
//             )}
//           </h1>
//         )}
//         <div className="singlePostInfo">
//           <span className="singlePostAuthor">
//             Author:
//             <Link to={`/?user=${post?.username}`} className="link">
//               <b> {post?.username}</b>
//             </Link>
//           </span>
//           <span className="singlePostDate">
//             {post && new Date(post.createdAt).toDateString()}
//           </span>
//         </div>
//         {updateMode ? (
//           <textarea
//             className="singlePostDescInput"
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//           />
//         ) : (
//           <p className="singlePostDesc">{desc}</p>
//         )}
//         {updateMode && (
//           <button className="singlePostButton" onClick={handleUpdate}>
//             Update
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
