import React, { useState } from 'react';
import { Search, Filter, PlayCircle, Users } from 'lucide-react';

export default function ChannelLibrary() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchChannels = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: 'search',
          params: { part: 'snippet', q: query, type: 'channel', maxResults: 12 }
        })
      });
      const data = await res.json();
      setResults(data.items || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Biblioteca de Canais</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Explore e encontre canais para se inspirar.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchChannels()}
            placeholder="Pesquisar canais por nicho, país, idioma..."
            className="w-full bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        <button 
          onClick={searchChannels}
          disabled={loading}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-zinc-950 font-bold rounded-xl transition-colors shrink-0"
        >
          {loading ? 'Buscando...' : 'Pesquisar'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.map((channel, i) => (
          <a
            key={i}
            href={`https://youtube.com/channel/${channel.snippet.channelId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-emerald-500 dark:hover:border-emerald-500 transition-colors group"
          >
            <div className="flex flex-col items-center text-center">
              <img 
                src={channel.snippet.thumbnails?.high?.url} 
                alt={channel.snippet.title}
                className="w-24 h-24 rounded-full mb-4 group-hover:scale-105 transition-transform"
              />
              <h3 className="font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1">{channel.snippet.title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-4">
                {channel.snippet.description || 'Sem descrição.'}
              </p>
              <div className="mt-auto px-4 py-2 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-bold text-zinc-600 dark:text-zinc-300 w-full flex items-center justify-center gap-2">
                <Users size={14} /> Visitar Canal
              </div>
            </div>
          </a>
        ))}
      </div>
      
      {!loading && query && results.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          Nenhum canal encontrado.
        </div>
      )}

      {results.length === 0 && !loading && !query && (
        <div className="text-center py-20 text-zinc-500">
          Faça uma busca para encontrar canais.
        </div>
      )}
    </div>
  );
}
