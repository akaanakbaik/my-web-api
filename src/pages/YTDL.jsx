import React, { useState } from 'react';
import { NeoCard, NeoButton, NeoInput } from '../components/NeoUI';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Download, Music, Video, Loader2, Gauge } from 'lucide-react';
import { Link } from 'react-router-dom';

const YTDL = () => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('mp4');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [error, setError] = useState('');

  // GANTI URL INI DENGAN URL BACKEND ANDA
  const API_BASE = "https://panel.akadev.me/api/ytdl"; 

  const handleDownload = async () => {
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      alert("⚠️ URL tidak valid!"); return;
    }
    setLoading(true); setError(''); setData(null); setSpeed(null);
    const startTime = Date.now();

    try {
      const endpoint = type === 'mp3' ? `${API_BASE}/mp3` : `${API_BASE}/mp4`;
      const res = await axios.get(`${endpoint}?url=${url}`);
      if (res.data.status) {
        setData(res.data);
        setSpeed(((Date.now() - startTime) / 1000).toFixed(2));
      } else {
        setError(res.data.message);
      }
    } catch (err) { setError("Server Error / Offline"); } 
    finally { setLoading(false); }
  };

  const forceDownload = (path, name) => {
      const link = document.createElement('a');
      link.href = `https://panel.akadev.me${path}`; // Sesuaikan domain backend
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      link.remove();
  };

  return (
    <div className="min-h-screen bg-neo-white p-4 max-w-4xl mx-auto space-y-6 font-mono pb-20">
      <div className="text-center mb-8 mt-4">
        <Link to="/"><h1 className="text-4xl font-black uppercase hover:text-neo-blue">YTDL Station</h1></Link>
        <p className="text-gray-500">Download Audio & Video Ultra Fast</p>
      </div>

      <NeoCard title="1. Masukkan URL" className="bg-white">
        <NeoInput value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://youtu.be/..." />
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div onClick={() => setType('mp3')} className={`cursor-pointer p-4 border-2 border-black flex items-center justify-center gap-2 font-bold ${type === 'mp3' ? 'bg-neo-yellow shadow-hard' : 'bg-gray-100 opacity-50'}`}>
            <Music /> MP3
          </div>
          <div onClick={() => setType('mp4')} className={`cursor-pointer p-4 border-2 border-black flex items-center justify-center gap-2 font-bold ${type === 'mp4' ? 'bg-neo-green shadow-hard' : 'bg-gray-100 opacity-50'}`}>
            <Video /> MP4
          </div>
        </div>
        <NeoButton onClick={handleDownload} variant="blue" className="w-full" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : 'PROSES UNDUHAN'}
        </NeoButton>
      </NeoCard>

      {error && <div className="bg-red-100 border-2 border-red-500 text-red-700 p-4 font-bold text-center">{error}</div>}

      {data && (
        <NeoCard title="2. Hasil & Preview" className="bg-[#f0f9ff]">
          <div className="mb-4 border-2 border-black bg-black text-center">
            {type === 'mp4' ? <ReactPlayer url={url} width="100%" height="300px" controls /> : 
             <div className="p-6 bg-neo-yellow"><img src={data.metadata.thumbnail} className="w-48 h-48 mx-auto border-2 border-black shadow-hard mb-4 object-cover" /><audio controls src={`https://panel.akadev.me${data.download_url}`} className="w-full" /></div>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm mb-6 border-2 border-black p-4 bg-white">
            <p><strong>Judul:</strong> {data.metadata.title}</p>
            <p><strong>Size:</strong> {data.metadata.size}</p>
          </div>
          <NeoButton onClick={() => forceDownload(data.download_url, `Kaapi-${data.metadata.title}.${type}`)} variant="pink" className="w-full text-lg"><Download size={24} /> DOWNLOAD</NeoButton>
        </NeoCard>
      )}

      {speed && <NeoCard title="3. Stats" className="bg-neo-black text-white"><div className="flex items-center justify-around"><div className="text-center"><Gauge size={48} className="mx-auto text-neo-green mb-2" /><h3 className="text-xl font-bold">Speed</h3><p className="text-neo-yellow text-3xl font-black">{speed}s</p></div></div></NeoCard>}
    </div>
  );
};

export default YTDL;
