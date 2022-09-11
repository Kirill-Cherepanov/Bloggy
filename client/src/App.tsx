import Topbar from './components/Layout/Topbar/Topbar';
import Footer from './components/Layout/Footer/Footer';
import Homepage from './features/misc/routes/Landing';
import { Registration } from 'features/auth';
import Post from './features/blogs&posts/routes/Post';
import Create from './features/blogs&posts/routes/Create';
import Settings from './features/settings/routes/Settings';
import Blog from './features/blogs&posts/routes/Blog';
import Catalog from './features/blogs&posts/routes/Catalog';
import PageNotFound from './features/misc/routes/PageNotFound';

import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/registration' && pathname !== '/create' && <Topbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
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
