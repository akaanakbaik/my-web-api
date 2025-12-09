import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, ArrowLeft, RefreshCw, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  const API_BASE_URL = "https://apiai.akadev.me"; 

  const getCurrentTime = () => {
    return new Date().toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false
    });
  };

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = 'Halo';
    if (hour >= 4 && hour < 11) greeting = 'Selamat Pagi';
    else if (hour >= 11 && hour < 15) greeting = 'Selamat Siang';
    else if (hour >= 15 && hour < 18) greeting = 'Selamat Sore';
    else greeting = 'Selamat Malam';
    
    setMessages([{
      id: 1,
      role: 'ai',
      text: `${greeting}! Saya Kaai, asisten AI kamu. Ada yang bisa dibantu?`,
      time: getCurrentTime()
    }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userText = input;
    setInput('');
    
    setMessages(prev => [...prev, { 
      id: Date.now(), 
      role: 'user', 
      text: userText, 
      time: getCurrentTime() 
    }]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai`, { query: userText });
      const replyText = response.data.status ? response.data.result : "Maaf, server sedang sibuk.";

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: replyText,
        time: getCurrentTime()
      }]);
    } catch (error) {
      toast.error("Gagal terhubung ke AI");
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'ai',
        text: "Koneksi terputus. Silakan coba lagi.",
        time: getCurrentTime()
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#e5ddd5] font-sans overflow-hidden relative">
      <div className="flex-none px-4 py-3 bg-[#202c33] text-white shadow-md z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-1 -ml-1 hover:bg-white/10 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-neo-green rounded-full flex items-center justify-center border-2 border-white/20">
               <span className="font-bold text-black text-sm">AI</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base leading-tight">Kaai Assistant</span>
              <span className="text-xs text-gray-300">Online</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
           <button onClick={() => window.location.reload()} className="p-2 hover:bg-white/10 rounded-full">
             <RefreshCw size={20} />
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[#efeae2] bg-opacity-90 scrollbar-hide">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`
              relative max-w-[85%] md:max-w-[65%] px-3 py-2 rounded-lg text-[15px] shadow-sm
              ${msg.role === 'user' ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'}
            `}>
              <p className="whitespace-pre-wrap mb-3 text-[#111b21]">{msg.text}</p>
              <span className="absolute bottom-1 right-2 text-[10px] text-gray-500 flex items-center gap-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="flex justify-start">
             <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">Sedang mengetik</span>
                <span className="flex gap-1">
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                </span>
             </div>
          </div>
        )}
        <div ref={bottomRef} className="h-1" />
      </div>

      <div className="flex-none bg-[#f0f2f5] p-2 flex items-end gap-2 z-20">
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-gray-100 min-h-[45px] max-h-[120px] overflow-hidden flex items-center px-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="w-full bg-transparent border-none outline-none resize-none text-[#111b21] text-[15px] py-3 max-h-[100px]"
            rows={1}
            style={{ minHeight: '24px' }}
          />
        </div>
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`
            w-12 h-12 rounded-full flex items-center justify-center shadow-md transition-all
            ${input.trim() ? 'bg-[#00a884] hover:bg-[#008f6f] active:scale-95' : 'bg-gray-300'}
          `}
        >
          <Send color="white" size={20} className={input.trim() ? 'ml-1' : ''} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
