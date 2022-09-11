import { Routes, Route, useLocation } from 'react-router-dom';

import { Footer, TopBar } from 'components/Layout';
import { Registration } from 'features/auth';
import { Catalog, Post, Create, Blog } from 'features/blogs&posts';
import { PageNotFound, Landing } from 'features/misc';
import { Settings } from 'features/settings';

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/registration' && pathname !== '/create' && <TopBar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/blog/:name" element={<Blog />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/create" element={<Create />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      {pathname !== '/registration' && pathname !== '/create' && <Footer />}
    </>
  );
}
