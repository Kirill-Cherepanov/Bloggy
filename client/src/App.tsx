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
  const currentUser = useContext(Context);
  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route path="/posts" element={<Homepage />} />
        <Route
          path="/register"
          element={currentUser ? <Homepage /> : <Register />}
        />
        <Route path="/login" element={currentUser ? <Homepage /> : <Login />} />
        <Route path="/post/:id" element={<Single />} />
        <Route path="/write" element={currentUser ? <Write /> : <Login />} />
        <Route
          path="/settings"
          element={currentUser ? <Settings /> : <Login />}
        />
      </Routes>
    </Router>
  );
}
