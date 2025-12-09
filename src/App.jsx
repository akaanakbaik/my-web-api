import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AIChat from './pages/AIChat';
import YTDL from './pages/YTDL';
import Docs from './pages/Docs';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai/chat" element={<AIChat />} />
        <Route path="/ytdl" element={<YTDL />} />
        <Route path="/docs" element={<Docs />} />
        {/* Wildcard untuk menangkap semua URL salah */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
