import { useNavigate } from 'react-router';
import Icon from 'components/Icon/Icon';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { Link } from 'react-router-dom';

export default function Create() {
  const navigate = useNavigate();

  return (
    <main className="px-page py-4">
      <div className="mb-10 pb-2 w-full flex justify-center items-end border-b relative">
        <button
          className="absolute left-0 top-1/2 -translate-y-1/2 hover:scale-105"
          onClick={() => navigate(-1)}
        >
          <Icon type="long-arrow" className="h-4 text-secondary-600" />
        </button>
        <Link to="/">
          <h1 className="text-4xl font-sansita select-none">Bloggy</h1>
        </Link>
        <button className="absolute right-0 text-xl transition-all hover:tracking-wider group">
          Create post
          <Icon
            type="angle"
            className="inline h-5 ml-1 mb-1 rotate-180 transition-all group-hover:ml-1.5"
          />
        </button>
      </div>

      <SimpleMDE
        className="custom-markdown-preview z-50 relative"
        options={{ autofocus: true, spellChecker: false }}
      />
    </main>
  );
}
