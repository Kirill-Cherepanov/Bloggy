import Topbar from './components/Topbar/Topbar';
import Footer from './components/Footer/Footer';
import Homepage from './pages/Homepage/Homepage';
import Registration from './pages/Registration/Registration';
import Post from './pages/Post/Post';
import Write from './pages/Write/Write';
// import Settings from './pages/Settings/Settings';
import Blog from './pages/Blog/Blog';
import Catalog from './pages/Catalog/Catalog';

import { Routes, Route, useLocation } from 'react-router-dom';
// import { useContext } from 'react';
// import { Context } from './context/Context';

export default function App() {
  const { pathname } = useLocation();
  // const { user } = useContext(Context);

  return (
    <>
      {pathname !== '/registration' && <Topbar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/blog/:name" element={<Blog />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/write" element={<Write />} />
        {/* <Route path="/settings" element={user ? <Settings /> : <Login />} /> */}
      </Routes>
      {pathname !== '/registration' && <Footer />}
    </>
  );
}
