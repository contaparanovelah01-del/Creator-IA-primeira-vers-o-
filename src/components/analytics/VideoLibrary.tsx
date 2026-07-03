import React, { useState } from 'react';
import { Search, PlayCircle, Calendar } from 'lucide-react';

export default function VideoLibrary() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const res = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: 'search',
          params: { part: 'snippet', q: query, type: 'video', maxResults: 12 }
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
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Biblioteca de Vídeos</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Encontre vídeos em alta por assunto para basear seus roteiros.</p>
      </div>

      <div className="flex gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && searchVideos()}
            placeholder="Pesquisar vídeos por assunto..."
            className="w-full bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        </div>
        <button 
          onClick={searchVideos}
          disabled={loading}
          className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-zinc-950 font-bold rounded-xl transition-colors shrink-0"
        >
          {loading ? 'Buscando...' : 'Pesquisar'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((video, i) => (
          <a
            key={i}
            href={`https://youtube.com/watch?v=${video.id.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:border-emerald-500 transition-colors group flex flex-col"
          >
            <div className="relative aspect-video">
              <img 
                src={video.snippet.thumbnails?.high?.url} 
                alt={video.snippet.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <PlayCircle size={48} className="text-white" />
              </div>
            </div>
            <div className="p-4 flex flex-col flex-1">
              <h3 className="font-bold text-zinc-900 dark:text-white mb-2 line-clamp-2" dangerouslySetInnerHTML={{ __html: video.snippet.title }} />
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">{video.snippet.channelTitle}</p>
              
              <div className="mt-auto flex items-center gap-2 text-xs text-zinc-500">
                <Calendar size={14} />
                {new Date(video.snippet.publishedAt).toLocaleDateString()}
              </div>
            </div>
          </a>
        ))}
      </div>

      {!loading && query && results.length === 0 && (
        <div className="text-center py-20 text-zinc-500">
          Nenhum vídeo encontrado.
        </div>
      )}

      {results.length === 0 && !loading && !query && (
        <div className="text-center py-20 text-zinc-500">
          Pesquise por um assunto para encontrar os vídeos mais relevantes.
        </div>
      )}
    </div>
  );
}
