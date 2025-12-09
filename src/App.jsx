import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // Import Toaster
import Home from './pages/Home';
import AIChat from './pages/AIChat';
import YTDL from './pages/YTDL';
import Docs from './pages/Docs';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      {/* Konfigurasi Notifikasi Cantik */}
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            border: '2px solid #000',
            padding: '12px',
            color: '#000',
            boxShadow: '4px 4px 0px 0px #000',
            borderRadius: '0px',
            background: '#fff',
            fontFamily: '"Plus Jakarta Sans", sans-serif',
            fontWeight: 'bold',
          },
          success: {
            style: { background: '#00ED64' },
            iconTheme: { primary: '#000', secondary: '#fff' },
          },
          error: {
            style: { background: '#FF66C4' },
            iconTheme: { primary: '#000', secondary: '#fff' },
          },
        }}
      />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai/chat" element={<AIChat />} />
        <Route path="/ytdl" element={<YTDL />} />
        <Route path="/docs" element={<Docs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
