import Homepage from './pages/Homepage/Homepage';
import Topbar from './components/Topbar/Topbar';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Single from './pages/Single/Single';
import Write from './pages/Write/Write';
import Settings from './pages/Settings/Settings';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from './context/Context';

export default function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      {/* <Topbar /> */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/register" element={user ? <Homepage /> : <Register />} />
        <Route path="/login" element={user ? <Homepage /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={user ? <Write /> : <Login />} />
        <Route path="/settings" element={user ? <Settings /> : <Login />} />
      </Routes>
    </Router>
  );
}
