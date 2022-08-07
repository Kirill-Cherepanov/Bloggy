import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Topbar from './components/Topbar/Topbar';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Single from './pages/Single/Single';

function App() {
  const currentUser = false;
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
        {/* <Route path="/write" {currentUser ? <Write /> : <Login />} /> */}
        {/* <Route path="/settings" element={currentUser ? <Settings /> : <Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
