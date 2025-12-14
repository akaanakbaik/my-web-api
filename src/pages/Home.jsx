import React, { useState } from 'react';
import { NeoButton, NeoCard, NeoInput } from '../components/NeoUI';
import { MessageCircle, Youtube, FileText, Send, Loader2, Sparkles, Mail, Camera } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Home = () => {
  const [report, setReport] = useState({ name: '', title: '', content: '' });
  const [sending, setSending] = useState(false);

  const sendReport = async () => {
    if (!report.name || !report.title || !report.content) {
      toast.error("Mohon lengkapi semua kolom aduan!");
      return;
    }
    setSending(true);
    const toastId = toast.loading("Mengirim laporan...");
    
    try {
      const res = await axios.post('/api/report', report);
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
    <div className="min-h-screen flex flex-col p-4 md:p-8 max-w-5xl mx-auto space-y-8 animate-slide-up font-sans bg-neo-bg">
      
      {/* Hero Section */}
      <header className="text-center space-y-3 pt-6 md:pt-12 flex flex-col items-center">
        <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-neo-black rounded-full translate-x-2 translate-y-2 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-300"></div>
            <img 
                src="https://raw.githubusercontent.com/akaanakbaik/belajar-frontand-dan-backend-terpisah/main/media/logo.jpg" 
                className="relative w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-neo-black object-cover z-10 group-hover:-translate-y-1 transition-transform duration-300" 
                alt="Logo Kaapi"
            />
            <div className="absolute -bottom-2 -right-2 bg-neo-yellow text-neo-black text-xs font-black px-2 py-1 border-2 border-neo-black rotate-12 z-20">
                OFFICIAL
            </div>
        </div>

        <div className="mt-6">
            <div className="inline-block bg-neo-black text-white px-3 py-1 text-xs font-mono mb-2 rotate-2 hover:rotate-0 transition-transform">
                v1.0.3 STABLE RELEASE
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-neo-black drop-shadow-sm">
              KAAPI<span className="text-neo-blue">.</span>WEB
            </h1>
            <p className="mt-2 text-base md:text-lg font-bold bg-white inline-block px-4 py-2 border-2 border-neo-black shadow-neo-sm transform -rotate-1 hover:rotate-1 transition-transform cursor-default">
              ✨ AI Chat & Multi-Tools Supercharged
            </p>
        </div>
      </header>

      {/* Grid Menu Responsif */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <NeoCard className="bg-white group hover:-translate-y-1 transition-transform duration-300">
            <div className="flex justify-between items-start mb-2">
              <MessageCircle size={32} className="text-neo-blue group-hover:scale-110 transition-transform" />
              <Sparkles size={16} className="text-neo-yellow animate-spin-slow" />
            </div>
            <h3 className="text-xl font-black mb-1">AI CHAT</h3>
            <p className="text-xs text-gray-600 mb-4 h-8 line-clamp-2">Tanya apapun ke AI pintar (GPT-5, Qwen, dll).</p>
            <NeoButton to="/ai/chat" variant="blue" fullWidth className="active:scale-95">Mulai Chat</NeoButton>
        </NeoCard>

        <NeoCard className="bg-white group hover:-translate-y-1 transition-transform duration-300">
            <Youtube size={32} className="text-red-500 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-black mb-1">YTDL PRO</h3>
            <p className="text-xs text-gray-600 mb-4 h-8 line-clamp-2">Download MP3/MP4 HD tanpa limit & iklan.</p>
            <NeoButton to="/ytdl" variant="green" fullWidth className="active:scale-95">Downloader</NeoButton>
        </NeoCard>

        <NeoCard className="bg-white group hover:-translate-y-1 transition-transform duration-300">
             <Camera size={32} className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-black mb-1">SSWEB</h3>
             <p className="text-xs text-gray-600 mb-4 h-8 line-clamp-2">Screenshot website full page / mobile view.</p>
             <NeoButton to="/ssweb" variant="pink" fullWidth className="active:scale-95">Buka Tools</NeoButton>
        </NeoCard>

        <NeoCard className="bg-white group hover:-translate-y-1 transition-transform duration-300">
             <FileText size={32} className="text-neo-black mb-2 group-hover:scale-110 transition-transform" />
             <h3 className="text-xl font-black mb-1">API DOCS</h3>
             <p className="text-xs text-gray-600 mb-4 h-8 line-clamp-2">Integrasi API gratis untuk developer bot.</p>
             <NeoButton to="/docs" variant="yellow" fullWidth className="active:scale-95">Baca Docs</NeoButton>
        </NeoCard>
      </div>

      {/* Form Aduan Compact */}
      <NeoCard title="Direct Report to Dev" className="bg-white" step="!">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <div className="bg-blue-50 p-6 border-2 border-neo-black h-full flex flex-col justify-center items-center text-center shadow-neo-sm hover:shadow-neo transition-all">
              <div className="bg-white p-3 rounded-full border-2 border-neo-black mb-3">
                 <Mail size={32} className="text-neo-blue" />
              </div>
              <p className="text-sm font-black mb-1">Punya Masalah?</p>
              <p className="text-xs text-gray-500 leading-relaxed">Laporkan bug, error, atau saran fitur baru langsung ke email developer kami.</p>
            </div>
          </div>
          <div className="w-full md:w-2/3 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                  <label className="text-xs font-bold ml-1 mb-1 block">Nama Kamu</label>
                  <NeoInput placeholder="ex: Budi Santoso" value={report.name} onChange={e => setReport({...report, name: e.target.value})} />
              </div>
              <div>
                  <label className="text-xs font-bold ml-1 mb-1 block">Subjek Laporan</label>
                  <NeoInput placeholder="ex: Error saat download" value={report.title} onChange={e => setReport({...report, title: e.target.value})} />
              </div>
            </div>
            <div>
                <label className="text-xs font-bold ml-1 mb-1 block">Detail Masalah</label>
                <textarea 
                  className="w-full p-3 text-sm border-2 border-neo-black shadow-neo-sm h-28 font-mono focus:outline-none focus:bg-yellow-50 focus:shadow-neo transition-all resize-none rounded-none"
                  placeholder="Ceritakan detail masalah yang kamu alami..."
                  value={report.content}
                  onChange={e => setReport({...report, content: e.target.value})}
                ></textarea>
            </div>
            <NeoButton onClick={sendReport} variant="black" className="bg-neo-black text-white hover:bg-gray-800 w-full py-3 active:scale-95" disabled={sending}>
              {sending ? <><Loader2 className="animate-spin mr-2" size={18} /> Mengirim Laporan...</> : <><Send size={18} className="mr-2" /> KIRIM LAPORAN SEKARANG</>}
            </NeoButton>
          </div>
        </div>
      </NeoCard>

      <footer className="text-center py-8 border-t-2 border-dashed border-gray-400">
        <p className="font-bold text-sm text-gray-600">
          crafted with <span className="text-red-500 animate-pulse">❤</span> by <span className="bg-neo-black text-white px-1">aka</span> 🇮🇩🇵🇸
        </p>
        <p className="text-[10px] text-gray-400 mt-1 font-mono">Server Time: {new Date().toLocaleTimeString('id-ID')}</p>
      </footer>
    </div>
  );
};

export default Home;
          crafted with 💖 by <span className="text-neo-blue">aka</span> 🇮🇩🇵🇸
        </p>
      </footer>
    </div>
  );
};

export default Home;
