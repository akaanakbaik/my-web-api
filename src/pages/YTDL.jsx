import React, { useState } from 'react';
import { NeoCard, NeoButton, NeoInput } from '../components/NeoUI';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Download, Music, Video, Loader2, Gauge, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const YTDL = () => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('mp4');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [speed, setSpeed] = useState(null);
  const [error, setError] = useState('');

  const API_BASE_URL = "https://apiai.akadev.me"; 

  const handleDownload = async () => {
    if (!url) {
      setError("URL tidak boleh kosong!");
      return;
    }
    
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
      setError("Mohon masukkan URL YouTube yang valid.");
      return;
    }

    setLoading(true);
    setError('');
    setData(null);
    setSpeed(null);
    
    const startTime = Date.now();

    try {
      const endpoint = type === 'mp3' ? '/api/ytdl/mp3' : '/api/ytdl/mp4';
      const fullUrl = `${API_BASE_URL}${endpoint}`;
      
      const response = await axios.get(fullUrl, {
        params: { url: url }
      });

      if (response.data.status) {
        setData(response.data);
        const duration = (Date.now() - startTime) / 1000;
        setSpeed(duration.toFixed(2));
      } else {
        setError(response.data.message || "Gagal mengambil data dari server.");
      }
    } catch (err) {
      if (err.response) {
        setError(`Server Error: ${err.response.data.message || err.response.statusText}`);
      } else if (err.request) {
        setError("Koneksi ke server backend gagal. Pastikan tunnel aktif.");
      } else {
        setError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const forceDownload = (downloadPath, filename) => {
      const fullDownloadUrl = `${API_BASE_URL}${downloadPath}`;
      const link = document.createElement('a');
      link.href = fullDownloadUrl;
      link.setAttribute('download', filename);
      link.setAttribute('target', '_blank'); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] p-4 md:p-8 font-mono pb-32">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 pt-4">
          <Link to="/">
             <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter hover:text-neo-blue transition-colors cursor-pointer">
               YTDL Station
             </h1>
          </Link>
          <div className="inline-block bg-neo-yellow px-4 py-1 border-2 border-black transform rotate-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-sm md:text-base font-bold">High Speed Engine v1.0.3</p>
          </div>
        </div>

        <NeoCard title="1. Konfigurasi Unduhan" className="bg-white relative overflow-hidden">
           <div className="absolute top-0 right-0 p-2 bg-black text-white text-xs font-bold">STEP 1</div>
           
           <div className="space-y-6">
              <div>
                <label className="block font-bold mb-2">YouTube URL</label>
                <NeoInput 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste link here (e.g., https://youtu.be/...)"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block font-bold mb-2">Pilih Format Media</label>
                <div className="grid grid-cols-2 gap-4">
                  <div 
                    onClick={() => !loading && setType('mp3')}
                    className={`
                      cursor-pointer p-4 border-2 border-black flex flex-col items-center justify-center gap-2 transition-all
                      ${type === 'mp3' ? 'bg-neo-yellow shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' : 'bg-gray-50 hover:bg-gray-100'}
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <Music size={32} />
                    <span className="font-bold text-lg">AUDIO (MP3)</span>
                  </div>
                  <div 
                    onClick={() => !loading && setType('mp4')}
                    className={`
                      cursor-pointer p-4 border-2 border-black flex flex-col items-center justify-center gap-2 transition-all
                      ${type === 'mp4' ? 'bg-neo-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]' : 'bg-gray-50 hover:bg-gray-100'}
                      ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <Video size={32} />
                    <span className="font-bold text-lg">VIDEO (MP4)</span>
                  </div>
                </div>
              </div>

              <NeoButton 
                onClick={handleDownload} 
                variant="blue" 
                className="w-full text-lg py-4"
                disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin" />
                    <span>MEMPROSES MEDIA...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Download />
                    <span>MULAI PROSES</span>
                  </div>
                )}
              </NeoButton>
           </div>
        </NeoCard>

        {error && (
          <div className="bg-red-100 border-4 border-red-500 p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center gap-4">
            <AlertCircle size={40} className="text-red-600 flex-shrink-0" />
            <div>
              <h3 className="font-black text-xl text-red-700">TERJADI KESALAHAN!</h3>
              <p className="font-bold text-red-600">{error}</p>
            </div>
          </div>
        )}

        {data && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <NeoCard title="2. Hasil & Preview" className="bg-[#f0f9ff] border-4">
              <div className="absolute top-0 right-0 p-2 bg-neo-pink text-black text-xs font-bold border-l-2 border-b-2 border-black">STEP 2</div>
              
              <div className="bg-black p-2 border-2 border-black mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                 {type === 'mp4' ? (
                   <div className="relative pt-[56.25%] bg-black">
                      <ReactPlayer 
                        url={url} 
                        width="100%" 
                        height="100%" 
                        controls 
                        className="absolute top-0 left-0"
                      />
                   </div>
                 ) : (
                   <div className="bg-neo-yellow p-6 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden">
                      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black to-transparent"></div>
                      <img 
                        src={data.metadata.thumbnail} 
                        alt="Cover" 
                        className="w-48 h-48 object-cover border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] z-10 mb-6"
                      />
                      <audio controls src={`${API_BASE_URL}${data.download_url}`} className="w-full max-w-md z-10 border-2 border-black rounded-none" />
                   </div>
                 )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 <div className="bg-white border-2 border-black p-3 shadow-sm">
                    <span className="block text-xs text-gray-500 uppercase font-bold">Judul</span>
                    <span className="block font-bold text-lg leading-tight line-clamp-2">{data.metadata.title}</span>
                 </div>
                 <div className="bg-white border-2 border-black p-3 shadow-sm">
                    <span className="block text-xs text-gray-500 uppercase font-bold">Channel</span>
                    <span className="block font-bold text-lg">{data.metadata.channel}</span>
                 </div>
                 <div className="bg-white border-2 border-black p-3 shadow-sm">
                    <span className="block text-xs text-gray-500 uppercase font-bold">Ukuran File</span>
                    <span className="block font-bold text-lg">{data.metadata.size_formatted || data.metadata.size}</span>
                 </div>
                 <div className="bg-white border-2 border-black p-3 shadow-sm">
                    <span className="block text-xs text-gray-500 uppercase font-bold">Kualitas</span>
                    <span className="block font-bold text-lg">{data.metadata.quality}</span>
                 </div>
              </div>

              <NeoButton 
                onClick={() => forceDownload(data.download_url, `Kaapi-${data.metadata.title.replace(/[^a-zA-Z0-9]/g, '_')}.${type}`)} 
                variant="green" 
                className="w-full text-xl py-4 border-4"
              >
                <div className="flex items-center justify-center gap-3">
                  <Download size={28} />
                  <span>DOWNLOAD {type.toUpperCase()} SEKARANG</span>
                </div>
              </NeoButton>
              
              <div className="mt-4 text-center">
                 <p className="text-xs text-gray-500 font-bold">File disediakan oleh: {data.author}</p>
                 <p className="text-xs text-gray-400 font-mono break-all mt-1">{data.download_url}</p>
              </div>
            </NeoCard>

            {speed && (
              <NeoCard title="3. System Stats" className="bg-[#1a1a1a] text-white border-4 border-gray-500">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center gap-4">
                     <Gauge size={48} className="text-neo-green animate-pulse" />
                     <div>
                       <h3 className="text-xl font-bold text-gray-300">PROCESSING TIME</h3>
                       <p className="text-neo-yellow text-4xl font-black">{speed}s</p>
                     </div>
                  </div>
                  <div className="text-right hidden md:block">
                     <div className="flex items-center justify-end gap-2 text-green-400 mb-1">
                        <CheckCircle2 size={16} />
                        <span className="font-bold text-sm">OPTIMAL</span>
                     </div>
                     <p className="text-gray-500 text-xs font-mono">BACKEND: {API_BASE_URL}</p>
                  </div>
                </div>
              </NeoCard>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default YTDL;
