import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Send, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  // GANTI URL INI DENGAN URL BACKEND PTERODACTYL ANDA (TUNNEL URL)
  const API_URL = "https://panel.akadev.me/api/ai"; // Contoh

  const getTime = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    const hour = new Date().getHours();
    let greeting = 'Halo selamat pagi';
    if (hour >= 11 && hour < 15) greeting = 'Halo selamat siang';
    else if (hour >= 15 && hour < 19) greeting = 'Halo selamat sore';
    else if (hour >= 19 || hour < 4) greeting = 'Halo selamat malam';
    
    setMessages([{
      role: 'ai',
      text: `${greeting}, bisa saya bantu?`,
      time: getTime()
    }]);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { role: 'user', text: input, time: getTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const { data } = await axios.post(API_URL, { query: userMsg.text });
      const replyText = data.status ? data.result : "Maaf, sistem sedang sibuk.";
      
      setMessages(prev => [...prev, { role: 'ai', text: replyText, time: getTime() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Gagal terhubung ke server.", time: getTime() }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#e5ddd5] font-sans">
      <div className="p-3 bg-neo-black text-white flex items-center justify-between shadow-md z-10">
        <Link to="/" className="text-xl font-bold ml-2">Kaai</Link>
        <div className="bg-green-500 w-2 h-2 rounded-full animate-pulse mr-4"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[60%] p-2 px-3 rounded-lg shadow-sm relative text-sm ${msg.role === 'user' ? 'bg-[#d9fdd3]' : 'bg-white'}`}>
              <p className="whitespace-pre-wrap leading-relaxed text-gray-800 pb-4">{msg.text}</p>
              <span className="absolute bottom-1 right-2 text-[10px] text-gray-500 flex items-center gap-1">{msg.time}</span>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <span className="font-bold wave-text text-sm">Progres... 🌊</span>
              <span className="block text-[10px] text-gray-400 mt-1">{getTime()}</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-2 bg-[#f0f2f5] flex items-center gap-2 border-t border-gray-300">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ketik pesan"
          className="flex-1 p-3 rounded-lg border-none focus:ring-0 bg-white shadow-sm resize-none h-12 pt-3"
          onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) e.preventDefault(); }} 
        />
        <button onClick={handleSend} className="p-3 bg-[#00a884] rounded-full hover:bg-[#008f6f] transition-colors shadow-sm flex items-center justify-center">
          <Send color="white" size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIChat;
