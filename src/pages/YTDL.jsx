import React, { useState } from 'react';
import { NeoCard, NeoButton, NeoInput } from '../components/NeoUI';
import axios from 'axios';
import ReactPlayer from 'react-player';
import { Download, Music, Video, Loader2, Gauge, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const YTDL = () => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('mp4');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [speed, setSpeed] = useState(null);

  const API_BASE_URL = "https://apiai.akadev.me"; 

  const handleDownload = async () => {
    if (!url) return toast.error("URL kosong!");
    if (!url.includes('youtube.com') && !url.includes('youtu.be')) return toast.error("Link YouTube tidak valid!");

    setLoading(true);
    setData(null);
    setSpeed(null);
    
    const toastId = toast.loading("Sedang memproses media (Mohon tunggu)...");
    const startTime = Date.now();

    try {
      const endpoint = type === 'mp3' ? '/api/ytdl/mp3' : '/api/ytdl/mp4';
      
      const response = await axios.get(`${API_BASE_URL}${endpoint}`, { 
        params: { url },
        timeout: 300000 // 5 Menit Timeout (FIX ISU SERVER SIBUK)
      });

      if (response.data.status) {
        setData(response.data);
        setSpeed(((Date.now() - startTime) / 1000).toFixed(2));
        toast.success("Selesai! Siap diunduh.", { id: toastId });
      } else {
        toast.error(response.data.message || "Gagal mengambil data.", { id: toastId });
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'ECONNABORTED') {
        toast.error("Waktu habis! Video terlalu panjang/besar.", { id: toastId });
      } else if (err.response) {
        toast.error(`Server Error: ${err.response.status}`, { id: toastId });
      } else {
        toast.error("Koneksi terputus. Coba refresh.", { id: toastId });
      }
    } finally {
      setLoading(false);
    }
  };

  const forceDownload = (path, filename) => {
      const link = document.createElement('a');
      link.href = `${API_BASE_URL}${path}`;
      link.setAttribute('download', filename);
      link.target = "_blank";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Download dimulai!");
  };

  return (
    <div className="min-h-screen bg-neo-bg p-4 font-mono pb-20">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-4 pt-4 mb-8">
          <Link to="/" className="bg-white border-2 border-black p-3 shadow-neo hover:translate-x-1 transition-transform flex-shrink-0">
             <ArrowLeft size={24} strokeWidth={3}/>
          </Link>
          <div>
             <h1 className="text-3xl md:text-5xl font-black uppercase leading-none">YTDL STATION</h1>
             <p className="text-sm font-bold text-gray-500">Fastest Downloader Engine</p>
          </div>
        </div>

        <NeoCard className="bg-white" step="1">
           <label className="text-sm font-bold text-gray-600 mb-1 block">Paste YouTube Link</label>
           <NeoInput 
             value={url}
             onChange={(e) => setUrl(e.target.value)}
             placeholder="https://youtu.be/..."
             disabled={loading}
           />
           
           <div className="grid grid-cols-2 gap-3 mb-4">
             <button onClick={() => setType('mp3')} className={`p-3 border-2 border-black flex items-center justify-center gap-2 font-bold transition-all ${type === 'mp3' ? 'bg-neo-yellow shadow-neo translate-y-[-2px]' : 'bg-gray-50 opacity-60'}`}>
               <Music size={20} /> MP3
             </button>
             <button onClick={() => setType('mp4')} className={`p-3 border-2 border-black flex items-center justify-center gap-2 font-bold transition-all ${type === 'mp4' ? 'bg-neo-green shadow-neo translate-y-[-2px]' : 'bg-gray-50 opacity-60'}`}>
               <Video size={20} /> MP4
             </button>
           </div>

           <NeoButton onClick={handleDownload} variant="blue" fullWidth disabled={loading}>
             {loading ? <div className="flex items-center gap-2"><Loader2 className="animate-spin" /> <span>PROCESSING...</span></div> : 'PROSES SEKARANG'}
           </NeoButton>
        </NeoCard>

        {data && (
          <NeoCard className="bg-[#f0f9ff] border-blue-500 animate-slide-up" step="2">
            <div className="bg-black border-2 border-black mb-4 shadow-neo">
               {type === 'mp4' ? (
                  <div className="aspect-video">
                    <ReactPlayer url={url} width="100%" height="100%" controls />
                  </div>
               ) : (
                  <div className="p-4 bg-neo-yellow flex flex-col items-center">
                    <img src={data.metadata.thumbnail} className="w-32 h-32 object-cover border-2 border-black shadow-neo mb-3" />
                    <audio controls src={`${API_BASE_URL}${data.download_url}`} className="w-full h-8" />
                  </div>
               )}
            </div>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex justify-between border-b border-black pb-1">
                <span className="font-bold text-gray-500">Judul</span>
                <span className="font-bold text-right truncate w-1/2">{data.metadata.title}</span>
              </div>
              <div className="flex justify-between border-b border-black pb-1">
                <span className="font-bold text-gray-500">Engine</span>
                <span className="font-bold text-blue-600">{data.metadata.engine}</span>
              </div>
            </div>

            <NeoButton onClick={() => forceDownload(data.download_url, `Kaapi-${data.metadata.id}.${type}`)} variant="green" fullWidth>
              <Download size={20} /> DOWNLOAD FILE
            </NeoButton>

            {speed && (
              <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-gray-400">
                <Gauge size={14} /> Processed in {speed}s
              </div>
            )}
          </NeoCard>
        )}
      </div>
    </div>
  );
};

export default YTDL;
