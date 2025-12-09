import React, { useState } from 'react';
import { NeoButton, NeoCard, NeoInput } from '../components/NeoUI';
import { MessageCircle, Youtube, FileText, Send, Loader2, Sparkles, Mail } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {
  const [report, setReport] = useState({ name: '', title: '', content: '' });
  const [sending, setSending] = useState(false);
  const API_BASE = "https://apiai.akadev.me"; 

  const sendReport = async () => {
    if (!report.name || !report.title || !report.content) {
      toast.error("Mohon lengkapi semua kolom aduan!");
      return;
    }
    setSending(true);
    const toastId = toast.loading("Mengirim laporan...");
    
    try {
      const res = await axios.post(`${API_BASE}/api/report`, report);
      if (res.data.status) {
        toast.success("Laporan terkirim! Terima kasih.", { id: toastId });
        setReport({ name: '', title: '', content: '' });
      } else {
        toast.error(`Gagal: ${res.data.message}`, { id: toastId });
      }
    } catch (e) {
      toast.error("Gagal terhubung ke server.", { id: toastId });
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-slide-up">
      
      {/* Hero Section Compact */}
      <header className="text-center space-y-3 pt-6 md:pt-12">
        <div className="inline-block bg-neo-black text-white px-3 py-1 text-xs font-mono mb-2 rotate-2">v1.0.3 STABLE</div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
          KAAPI<span className="text-neo-blue">.</span>WEB
        </h1>
        <p className="text-base md:text-lg font-medium bg-neo-yellow inline-block px-3 py-1 border-2 border-neo-black shadow-neo-sm transform -rotate-1">
          ✨ AI Chat & YouTube Downloader Supercharged
        </p>
      </header>

      {/* Grid Menu Responsif (1 col di HP, 3 col di Desktop) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <NeoCard className="bg-white group hover:-translate-y-1 transition-transform">
            <div className="flex justify-between items-start mb-2">
              <MessageCircle size={32} className="text-neo-blue group-hover:scale-110 transition-transform" />
              <Sparkles size={16} className="text-neo-yellow animate-spin-slow" />
            </div>
            <h3 className="text-xl font-black mb-1">AI CHAT</h3>
            <p className="text-sm text-gray-600 mb-4 h-10">Tanya apapun ke AI pintar, respon cepat & akurat.</p>
            <NeoButton to="/ai/chat" variant="blue" fullWidth>Mulai Chat</NeoButton>
        </NeoCard>

        <NeoCard className="bg-white group hover:-translate-y-1 transition-transform">
            <Youtube size={32} className="text-red-500 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black mb-1">YTDL PRO</h3>
            <p className="text-sm text-gray-600 mb-4 h-10">Download MP3/MP4 kualitas HD tanpa iklan.</p>
            <NeoButton to="/ytdl" variant="green" fullWidth>Buka Downloader</NeoButton>
        </NeoCard>

        <NeoCard className="bg-white group hover:-translate-y-1 transition-transform">
             <FileText size={32} className="text-neo-black mb-2 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-black mb-1">API DOCS</h3>
             <p className="text-sm text-gray-600 mb-4 h-10">Dokumentasi lengkap untuk Developer.</p>
             <NeoButton to="/docs" variant="yellow" fullWidth>Baca Docs</NeoButton>
        </NeoCard>
      </div>

      {/* Form Aduan Compact */}
      <NeoCard title="Direct Report to Dev" className="bg-white" step="!">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3 space-y-2">
            <div className="bg-blue-50 p-4 border-2 border-neo-black h-full flex flex-col justify-center items-center text-center">
              <Mail size={40} className="text-neo-blue mb-2" />
              <p className="text-xs font-bold">Ada bug atau saran?</p>
              <p className="text-xs text-gray-500">Kirim langsung ke email developer.</p>
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-2 gap-3">
              <NeoInput placeholder="Nama Kamu" value={report.name} onChange={e => setReport({...report, name: e.target.value})} />
              <NeoInput placeholder="Subjek/Judul" value={report.title} onChange={e => setReport({...report, title: e.target.value})} />
            </div>
            <textarea 
              className="w-full p-3 text-sm border-2 border-neo-black shadow-neo-sm h-24 font-mono mb-3 focus:outline-none focus:bg-yellow-50 resize-none"
              placeholder="Ceritakan masalahmu di sini..."
              value={report.content}
              onChange={e => setReport({...report, content: e.target.value})}
            ></textarea>
            <NeoButton onClick={sendReport} variant="pink" fullWidth disabled={sending}>
              {sending ? <Loader2 className="animate-spin" size={18} /> : <><Send size={18} /> KIRIM LAPORAN</>}
            </NeoButton>
          </div>
        </div>
      </NeoCard>

      <footer className="text-center py-6 border-t-2 border-dashed border-gray-400">
        <p className="font-bold text-sm">
          crafted with 💖 by <span className="text-neo-blue">aka</span> 🇮🇩🇵🇸
        </p>
      </footer>
    </div>
  );
};

export default Home;
