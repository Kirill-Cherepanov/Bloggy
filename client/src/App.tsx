import Topbar from './components/Topbar/Topbar';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import Post from './pages/Post/Post';
import Create from './pages/Create/Create';
// import Settings from './pages/Settings/Settings';
import Blog from './pages/Blog/Blog';
import Catalog from './pages/Catalog/Catalog';
import PageNotFound from './pages/PageNotFound/PageNotFound';

import { Routes, Route, useLocation } from 'react-router-dom';

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      {pathname !== '/registration' && <Topbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog/:name" element={<Blog />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/write" element={<Create />} />
        {/* <Route path="/settings" element={user ? <Settings /> : <Login />} /> */}
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
      {pathname !== '/registration' && <Footer />}
    </>
  );
}
