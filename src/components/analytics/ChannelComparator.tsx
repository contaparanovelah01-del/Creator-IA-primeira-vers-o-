import React, { useState } from 'react';
import { Search, Youtube, BarChart3, Calendar, FileVideo, Eye, Trophy, Plus, ArrowRight, Users } from 'lucide-react';

export default function ChannelComparator() {
  const [channel1, setChannel1] = useState('');
  const [channel2, setChannel2] = useState('');
  const [data1, setData1] = useState<any>(null);
  const [data2, setData2] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchChannel = async (query: string) => {
    try {
      // Step 1: Search for the channel
      const searchRes = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: 'search',
          params: { part: 'snippet', q: query, type: 'channel', maxResults: 1 }
        })
      });
      const searchData = await searchRes.json();
      
      if (!searchData.items || searchData.items.length === 0) {
        throw new Error('Canal não encontrado');
      }

      const channelId = searchData.items[0].id.channelId;

      // Step 2: Get channel statistics
      const statsRes = await fetch('/api/youtube', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          endpoint: 'channels',
          params: { part: 'snippet,statistics,brandingSettings', id: channelId }
        })
      });
      const statsData = await statsRes.json();

      return statsData.items[0];
    } catch (err: any) {
      console.error(err);
      throw err;
    }
  };

  const handleCompare = async () => {
    if (!channel1) {
      setError('Por favor, insira pelo menos um canal.');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const res1 = await searchChannel(channel1);
      setData1(res1);
      
      if (channel2) {
        const res2 = await searchChannel(channel2);
        setData2(res2);
      } else {
        setData2(null);
      }
    } catch (err: any) {
      setError('Erro ao buscar dados dos canais. Verifique os nomes informados.');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: string) => parseInt(num).toLocaleString('pt-BR');
  
  const calculateScore = (stats: any) => {
    const subs = parseInt(stats.subscriberCount) || 0;
    const views = parseInt(stats.viewCount) || 0;
    const videos = parseInt(stats.videoCount) || 0;
    
    if (videos === 0) return 0;
    const viewsPerVideo = views / videos;
    
    // A simplified arbitrary score calculation
    const score = (Math.log10(subs + 1) * 2) + (Math.log10(viewsPerVideo + 1) * 3);
    return Math.min(100, Math.round(score * 2.5));
  };

  const renderChannelCard = (data: any, isWinner?: boolean, otherData?: any) => {
    if (!data) return null;
    const snippet = data.snippet;
    const stats = data.statistics;
    const branding = data.brandingSettings;
    const score = calculateScore(stats);
    
    const banner = branding?.image?.bannerExternalUrl;

    const isBetter = (metric: string) => {
      if (!otherData) return null;
      const val1 = parseInt(stats[metric]) || 0;
      const val2 = parseInt(otherData.statistics[metric]) || 0;
      if (val1 === val2) return 'equal';
      return val1 > val2 ? 'winner' : 'loser';
    };

    const getRowClass = (metric: string) => {
      const status = isBetter(metric);
      if (status === 'winner') return 'text-emerald-500 font-bold bg-emerald-500/10 rounded px-2 py-0.5';
      if (status === 'loser') return 'text-red-500 font-bold';
      return 'text-zinc-900 dark:text-white font-bold';
    };

    return (
      <div className={`bg-white dark:bg-[#121214] rounded-2xl border ${isWinner ? 'border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.15)]' : 'border-zinc-200 dark:border-zinc-800'} overflow-hidden flex-1`}>
        {banner ? (
          <div className="h-32 w-full bg-cover bg-center" style={{ backgroundImage: `url(${banner})` }} />
        ) : (
          <div className="h-32 w-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20" />
        )}
        
        <div className="p-6">
          <div className="flex justify-between items-start -mt-12 mb-4">
            <img 
              src={snippet.thumbnails?.high?.url} 
              alt={snippet.title} 
              className="w-20 h-20 rounded-full border-4 border-white dark:border-[#121214] bg-zinc-100 dark:bg-zinc-800"
            />
            <div className="bg-emerald-500 text-zinc-950 font-black text-xl px-4 py-1.5 rounded-xl flex items-center gap-2">
              <Trophy size={18} />
              {score}
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">{snippet.title}</h2>
          <p className="text-zinc-500 text-sm mb-6 line-clamp-2">{snippet.description}</p>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2"><Users size={16} /> Inscritos</span>
              <span className={getRowClass('subscriberCount')}>{formatNumber(stats.subscriberCount)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2"><Eye size={16} /> Visualizações</span>
              <span className={getRowClass('viewCount')}>{formatNumber(stats.viewCount)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2"><FileVideo size={16} /> Vídeos</span>
              <span className={getRowClass('videoCount')}>{formatNumber(stats.videoCount)}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2"><BarChart3 size={16} /> Média Views/Vídeo</span>
              <span className={getRowClass('viewCount')}>
                {parseInt(stats.videoCount) > 0 ? formatNumber(Math.floor(parseInt(stats.viewCount) / parseInt(stats.videoCount)).toString()) : '0'}
              </span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-zinc-500 dark:text-zinc-400 flex items-center gap-2"><Calendar size={16} /> Criação</span>
              <span className="text-zinc-900 dark:text-white font-medium">{new Date(snippet.publishedAt).toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
          
          <a 
            href={`https://youtube.com/channel/${data.id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full py-3 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
          >
            <Youtube size={20} className="text-red-500" />
            Visitar Canal
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Comparador de Canais</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Analise estatísticas detalhadas e compare o desempenho entre canais.</p>
      </div>

      <div className="bg-white dark:bg-[#121214] p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 mb-8 flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            value={channel1}
            onChange={(e) => setChannel1(e.target.value)}
            placeholder="Nome ou link do Canal 1..."
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
          />
        </div>
        
        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 font-bold text-zinc-400">VS</div>
        
        <div className="flex-1 relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={20} />
          <input
            type="text"
            value={channel2}
            onChange={(e) => setChannel2(e.target.value)}
            placeholder="Nome ou link do Canal 2 (Opcional)..."
            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-12 pr-4 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            onKeyDown={(e) => e.key === 'Enter' && handleCompare()}
          />
        </div>
        
        <button
          onClick={handleCompare}
          disabled={loading}
          className="w-full md:w-auto px-8 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-zinc-950 font-bold rounded-xl transition-colors"
        >
          {loading ? 'Analisando...' : 'Analisar'}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl mb-8">
          {error}
        </div>
      )}

      {(data1 || data2) && (
        <div className="flex flex-col md:flex-row gap-6">
          {renderChannelCard(data1, data2 && calculateScore(data1.statistics) >= calculateScore(data2.statistics), data2)}
          {data2 && renderChannelCard(data2, calculateScore(data2.statistics) > calculateScore(data1.statistics), data1)}
        </div>
      )}
    </div>
  );
}
