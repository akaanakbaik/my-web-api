import React from 'react';
import { NeoButton, NeoCard, NeoInput } from '../components/NeoUI';
import { MessageCircle, Youtube, FileText, Send } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-10 max-w-5xl mx-auto space-y-10 bg-neo-bg">
      {/* Header */}
      <header className="text-center space-y-4 pt-10">
        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter">KAAPI</h1>
        <p className="text-xl font-mono bg-neo-yellow inline-block px-2 border-2 border-black transform -rotate-2">
          AI Chat & YouTube Downloader Supercharged
        </p>
      </header>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        <NeoCard className="hover:bg-blue-50 transition-colors">
          <MessageCircle size={48} className="mb-4 text-neo-blue" />
          <h3 className="text-2xl font-bold mb-2">AI + API</h3>
          <p className="mb-4">Chat cerdas tanpa batas, model terbaru, respon cepat.</p>
          <NeoButton to="/ai/chat" variant="pink">Buka AI Chat</NeoButton>
        </NeoCard>

        <NeoCard className="hover:bg-red-50 transition-colors">
          <Youtube size={48} className="mb-4 text-red-600" />
          <h3 className="text-2xl font-bold mb-2">YTDL + API</h3>
          <p className="mb-4">Download MP3 & MP4 kualitas tinggi dengan metadata lengkap.</p>
          <NeoButton to="/ytdl" variant="green">Buka YTDL</NeoButton>
        </NeoCard>

        <NeoCard className="hover:bg-yellow-50 transition-colors">
          <FileText size={48} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">Dokumentasi</h3>
          <p className="mb-4">Integrasikan API kami ke bot WhatsApp/Telegram kamu.</p>
          <NeoButton to="/docs" variant="yellow">Baca Docs</NeoButton>
        </NeoCard>
      </div>

      {/* Aduan Card */}
      <NeoCard title="Kotak Aduan" className="bg-gray-50">
        <div className="grid md:grid-cols-2 gap-4">
          <NeoInput placeholder="Nama Anda" />
          <NeoInput placeholder="Judul Aduan" />
        </div>
        <textarea 
          className="w-full p-3 border-2 border-black shadow-hard-sm h-32 font-mono mb-4 focus:outline-none"
          placeholder="Tulis keluhan atau saran..."
        ></textarea>
        <NeoButton variant="blue" className="w-full">
          <Send size={18} /> Kirim ke Developer
        </NeoButton>
      </NeoCard>

      <footer className="text-center font-bold border-t-2 border-black pt-6 pb-10">
        crafted by aka 🇮🇩🇵🇸
      </footer>
    </div>
  );
};

export default Home;
