import { useNavigate } from 'react-router';
import BlogSettings from '../../../components/BlogSettings/BlogSettings';

export default function Stage2() {
  const navigate = useNavigate();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        navigate('/blog/KissMe');
      }}
      className="mx-auto w-full mt-16"
    >
      <h2 className="text-3xl text-center font-bold font-display uppercase mb-4">
        Create your blog
      </h2>

      <BlogSettings labelClass="flex items-center font-light text-sm mb-2" />

      <button className="mt-6 w-full py-2 bg-accent-800 text-main font-bold rounded-3xl transition-color hover:bg-accent-900">
        Create a blog
      </button>
    </form>
  );
}
