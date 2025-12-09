import React from 'react';
import { NeoCard, NeoButton } from '../components/NeoUI';

const Docs = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8 font-mono">
      <div className="flex justify-between items-center border-b-4 border-black pb-4">
        <h1 className="text-4xl font-black">KAAPI DOCS</h1>
        <NeoButton to="/" variant="yellow">HOME</NeoButton>
      </div>
      <NeoCard title="API Endpoints">
        <p className="mb-4">Base URL: <code className="bg-gray-200 p-1">https://panel.akadev.me</code></p>
        <div className="space-y-4">
            <div className="bg-black text-green-400 p-4 rounded">POST /api/ai <br/><span className="text-gray-500 text-sm">Body: {`{"query": "Halo"}`}</span></div>
            <div className="bg-black text-green-400 p-4 rounded">GET /api/ytdl/mp3?url=...</div>
            <div className="bg-black text-green-400 p-4 rounded">GET /api/ytdl/mp4?url=...</div>
        </div>
      </NeoCard>
    </div>
  );
};

export default Docs;
