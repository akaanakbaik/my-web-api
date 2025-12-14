import React, { useState } from 'react';
import { NeoCard, NeoButton, NeoInput } from '../components/NeoUI';
import axios from 'axios';
import { Camera, Smartphone, Monitor, Download, Loader2 } from 'lucide-react';

const SSWeb = () => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('desktop');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleSS = async () => {
    if (!url) return alert('URL Kosong');
    setLoading(true);
    setResult(null);
    try {
      const { data } = await axios.post('/api/ssweb', { url, type });
      if (data.status) setResult(data.url);
      else alert(data.message);
    } catch (e) {
      alert('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neo-bg p-4 pt-20 max-w-4xl mx-auto space-y-6">
      <NeoCard title="SSWEB TOOL">
        <NeoInput placeholder="https://..." value={url} onChange={e => setUrl(e.target.value)} />
        <div className="flex gap-2 mb-4">
          <button onClick={() => setType('desktop')} className={`p-2 border-2 border-black flex items-center gap-2 ${type==='desktop'?'bg-neo-blue text-white':'bg-white'}`}><Monitor/> Desktop</button>
          <button onClick={() => setType('mobile')} className={`p-2 border-2 border-black flex items-center gap-2 ${type==='mobile'?'bg-neo-green':'bg-white'}`}><Smartphone/> Mobile</button>
          <button onClick={() => setType('full')} className={`p-2 border-2 border-black flex items-center gap-2 ${type==='full'?'bg-neo-pink':'bg-white'}`}><Camera/> Full</button>
        </div>
        <NeoButton onClick={handleSS} disabled={loading} fullWidth variant="yellow">
          {loading ? <Loader2 className="animate-spin" /> : 'CAPTURE NOW'}
        </NeoButton>
      </NeoCard>
      
      {result && (
        <NeoCard title="RESULT" className="bg-white">
          <img src={result} className="w-full border-2 border-black mb-4" />
          <a href={result} download className="block w-full text-center bg-neo-black text-white p-3 font-bold border-2 border-transparent hover:bg-white hover:text-black hover:border-black transition-all">DOWNLOAD IMAGE</a>
        </NeoCard>
      )}
    </div>
  );
};
export default SSWeb;
