import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    let greeting = 'Halo, selamat pagi';
    
    if (hour >= 0 && hour < 4) greeting = 'Halo, selamat malam';
    else if (hour >= 4 && hour < 11) greeting = 'Halo, selamat pagi';
    else if (hour >= 11 && hour < 15) greeting = 'Halo, selamat siang';
    else if (hour >= 15 && hour < 18) greeting = 'Halo, selamat sore';
    else greeting = 'Halo, selamat malam';
    
    setMessages([{
      id: 1,
      role: 'ai',
      text: `${greeting}, ada yang bisa saya bantu?`,
      time: getCurrentTime()
    }]);
  }, []);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput('');
    
    const newUserMsg = { 
      id: Date.now(), 
      role: 'user', 
      text: userText, 
      time: getCurrentTime() 
    };

    setMessages(prev => [...prev, newUserMsg]);
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/api/ai`, { 
        query: userText 
      });

      const replyText = response.data.status ? response.data.result : "Maaf, saya tidak dapat memproses permintaan tersebut saat ini.";

      const newAiMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: replyText,
        time: getCurrentTime()
      };

      setMessages(prev => [...prev, newAiMsg]);

    } catch (error) {
      const errorMsg = {
        id: Date.now() + 1,
        role: 'ai',
        text: "Maaf, terjadi gangguan koneksi ke server. Silakan coba lagi nanti.",
        time: getCurrentTime()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#e5ddd5] font-sans overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] text-white shadow-md z-20">
        <div className="flex items-center gap-3">
          <Link to="/" className="p-1 hover:bg-gray-800 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight">Kaai</span>
            <span className="text-xs text-green-400 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Online
            </span>
          </div>
        </div>
        <button onClick={() => window.location.reload()} className="p-2 hover:bg-gray-800 rounded-full">
          <RefreshCw size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`
              relative max-w-[85%] md:max-w-[70%] px-4 py-2 rounded-lg shadow-sm text-[15px] leading-relaxed break-words
              ${msg.role === 'user' ? 'bg-[#d9fdd3] rounded-tr-none' : 'bg-white rounded-tl-none'}
            `}>
              <p className="whitespace-pre-wrap mb-4 text-gray-800 font-normal">
                {msg.text}
              </p>
              <span className="absolute bottom-1 right-2 text-[10px] text-gray-500 flex items-center gap-1">
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start w-full">
            <div className="bg-white px-4 py-3 rounded-lg rounded-tl-none shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse">
                  Progres...
                </span>
                <span className="flex gap-1">
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                   <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                </span>
              </div>
              <span className="block text-[10px] text-right text-gray-400 mt-1">{getCurrentTime()}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      <div className="bg-[#f0f2f5] px-2 py-2 flex items-end gap-2 border-t border-gray-300 z-20">
        <div className="flex-1 bg-white rounded-2xl flex items-center shadow-sm border border-gray-100 overflow-hidden min-h-[50px] max-h-[150px]">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="w-full h-full px-4 py-3 bg-transparent border-none outline-none resize-none text-gray-800 text-[15px] scrollbar-hide"
            style={{ minHeight: '50px' }}
          />
        </div>
        <button 
          onClick={handleSend}
          disabled={!input.trim() || loading}
          className={`
            p-3 rounded-full shadow-md mb-1 transition-all duration-200 flex items-center justify-center
            ${input.trim() && !loading ? 'bg-[#00a884] hover:bg-[#008f6f] cursor-pointer transform hover:scale-105' : 'bg-gray-300 cursor-default'}
          `}
        >
          <Send color="white" size={22} className={input.trim() && !loading ? 'ml-1' : ''} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
