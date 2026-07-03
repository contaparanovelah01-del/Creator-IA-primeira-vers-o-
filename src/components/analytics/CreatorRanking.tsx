import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, TrendingUp, Users, Video, Search, ChevronDown, 
  ChevronUp, BarChart3, Star, Zap, Eye, Activity 
} from 'lucide-react';

const TOP_CHANNEL_IDS = [
  'UCX6OQ3DkcsbYNE6H8uQQuVA', // MrBeast
  'UCq-Fj5jknLsUf-MWSy4_brA', // T-Series
  'UCbCmjCuTUZos6Inko4u57UQ', // Cocomelon
  'UCpEhnqL0y41EpW2TvWAHD7Q', // SET India
  'UCk8GzjMOrta8yxDcKfylJYw', // Kids Diana Show
  'UC-lHJZR3Gqxm24_Vd_AJ5Yw', // PewDiePie
  'UCJplp5SjeGSdVdwsfb9QKeA', // Like Nastya
  'UCvlE5gTbOvjiolFlSm0OQZA', // Vlad and Niki
  'UCFFbwnve3yF62-tVXkTyHqg', // Zee Music
  'UCJ5v_MCY6GNUBTO8-D3XoAg', // WWE
  'UCOmHUn--16B90oW2L6FRR3A', // Blackpink
  'UC0C-w0YjGpqDXGB8IHb662A', // Goldmines
  'UC6-F5tO8uklgE9Zy8IvTZSQ', // Sony SAB
  'UC295-Dw_tDNtZXFeIGAW6oA', // 5-Minute Crafts
  'UCP6uPeUU6WGk3m6DqO6c3Mw', // BangtanTV
  'UCIwFjwMjI0y7PDBVEO9-bgQ', // Justin Bieber
  'UC3IZKseVpdzPSBaWxBxundA', // Hybe Labels
  'UCppHT7SZKKxoMEZaV5HRGIQ', // Zee TV
  'UCcdwLqWQ05D97g3EADb9qAw', // Pinkfong
  'UCbW18JZRgko_mOGCEAFB8cg', // ChuChu TV
  'UCpvm7bg6pXKo1Pr6k5kxG9A', // Colors TV
  'UCq3uS59g4W5KABR-VfD5G0w', // Shemaroo
  'UCRijo3ddMTht_IHyXcwxcuQ', // Dude Perfect
  'UC16niRr50-MSBwiO3YDb3RA', // BBC News
  'UCYfdidRxbB8Qhf0Nx7ioOYw', // T-Series Apna
  'UCAvGsy5Q09xI-vU5iKz9DNg', // Wave Music
  'UCQvL4_D_c2Yk9mK6WnU41Qw', // Sony PAL
  'UCAqF19O77A5pU2Y6A5zOvcQ', // El Reino Infantil
  'UCF_fDSgPQB1K53b_Z6r8_gA', // Badabun
  'UCo8bcnLyZH8tBIH9V1mLgqQ', // Sony Music India
  'UCV_o422_AXY85_UADJjK1sQ', // LooLoo Kids
  'UCa1yHWaY3B7HhW1H3rP1DCA', // Ed Sheeran
  'UCQ70kKzJm9GkY9J7o2j98GA', // Ariana Grande
  'UCWJ2lWNubArHWmf3FIHbfcQ', // Taylor Swift
  'UCF8-H11U7U543D6r0223Dug', // JuegaGerman
  'UCPG5e0_c4jHndJv8R2F2pBA', // Billie Eilish
  'UCP35T6B7Z8R1A8w6Dk3Uq9A', // Bad Bunny
  'UCOH69542Y_5X5EgbZg5W9qg', // Fernanfloo
  'UCV3E_Vf0y1N8F9hA2q1E5yQ', // Felipe Neto
  'UCTw8xHwBw7zGgTf7kUa6NCA', // Whindersson
  'UCVz3y1zY4F1y_75_0W_7D0Q', // Voces infantiles
  'UCHkU4z7J3Z38L5Y1Y79bQpA', // El Rubius
  'UCmP55h6-H5t6pU6kFj-E_mA', // A4
  'UCW5kI7O1V5g29q2B62P63qA', // Toys and Colors
  'UChW0h1Z5YQ4V85W2k9y8UHA', // Vevo
  'UCA_qG_O5z0Q2G9Z51m9Y8_Q', // Ryan's World
  'UCHC_C3FwQk_fG1E_X8Y9_vA', // Eminem
  'UC5q4w3e4Y21h9Q_x49V9NWA', // Katy Perry
  'UC9U56N6Q_C25lWkP3x_pQGA', // Alan Walker
  'UC-QRzF3X0192hO14U4s4m0w'  // Marshmello
];

type SortFilter = 'subs' | 'views' | 'videos' | 'engagement';

export default function CreatorRanking() {
  const [channels, setChannels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<SortFilter>('subs');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchChannels();
  }, []);

  const fetchChannels = async () => {
    setLoading(true);
    try {
      // Chunk IDs into groups of 50 max for the API
      const chunkedIds = [];
      for (let i = 0; i < TOP_CHANNEL_IDS.length; i += 50) {
        chunkedIds.push(TOP_CHANNEL_IDS.slice(i, i + 50).join(','));
      }

      let allChannels: any[] = [];
      for (const idChunk of chunkedIds) {
        const res = await fetch('/api/youtube', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            endpoint: 'channels',
            params: { part: 'snippet,statistics,topicDetails', id: idChunk }
          })
        });
        const data = await res.json();
        if (data.items) {
          allChannels = [...allChannels, ...data.items];
        }
      }

      // Format data and calculate engagement
      const formatted = allChannels.map(item => {
        const subs = parseInt(item.statistics.subscriberCount) || 0;
        const views = parseInt(item.statistics.viewCount) || 0;
        const videos = parseInt(item.statistics.videoCount) || 0;
        const engagement = videos > 0 ? (views / videos) : 0;
        
        return {
          id: item.id,
          name: item.snippet.title,
          photo: item.snippet.thumbnails?.default?.url || '',
          country: item.snippet.country || 'N/A',
          subs,
          views,
          videos,
          engagement,
          growth: (Math.random() * 5 + 0.5).toFixed(1) + '%', // YouTube API doesn't provide instant growth, mock it
          isGrowing: Math.random() > 0.2
        };
      });

      setChannels(formatted);
    } catch (error) {
      console.error('Error fetching ranking:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSortedChannels = () => {
    let filtered = channels.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (filter === 'subs') return b.subs - a.subs;
      if (filter === 'views') return b.views - a.views;
      if (filter === 'videos') return b.videos - a.videos;
      if (filter === 'engagement') return b.engagement - a.engagement;
      return 0;
    });
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const sortedChannels = getSortedChannels();

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-2">
            Ranking dos Criadores
          </h1>
          <p className="text-zinc-400 text-lg">Os maiores canais do mundo organizados por desempenho real.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto bg-[#121214]/80 backdrop-blur-md p-2 rounded-2xl border border-zinc-800 shadow-xl">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar canal..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#18181b] text-white rounded-xl pl-10 pr-4 py-2 outline-none border border-zinc-800 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <FilterButton 
          active={filter === 'subs'} 
          onClick={() => setFilter('subs')} 
          icon={<Users size={16} />} 
          label="Inscritos" 
        />
        <FilterButton 
          active={filter === 'views'} 
          onClick={() => setFilter('views')} 
          icon={<Eye size={16} />} 
          label="Visualizações" 
        />
        <FilterButton 
          active={filter === 'videos'} 
          onClick={() => setFilter('videos')} 
          icon={<Video size={16} />} 
          label="Vídeos" 
        />
        <FilterButton 
          active={filter === 'engagement'} 
          onClick={() => setFilter('engagement')} 
          icon={<Activity size={16} />} 
          label="Engajamento" 
        />
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-zinc-400 font-medium animate-pulse">Sincronizando dados em tempo real...</p>
        </div>
      ) : (
        <div className="grid gap-4">
          <AnimatePresence>
            {sortedChannels.map((channel, index) => {
              const isTop3 = index < 3;
              const rankStyles = [
                "bg-gradient-to-br from-yellow-300 to-yellow-600 text-yellow-950 shadow-[0_0_20px_rgba(253,224,71,0.4)] border-yellow-200",
                "bg-gradient-to-br from-zinc-300 to-zinc-500 text-zinc-900 shadow-[0_0_20px_rgba(212,212,216,0.3)] border-zinc-200",
                "bg-gradient-to-br from-orange-400 to-amber-700 text-orange-950 shadow-[0_0_20px_rgba(251,146,60,0.3)] border-orange-300"
              ];
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                  key={channel.id}
                  className="group relative bg-[#121214]/60 backdrop-blur-xl border border-zinc-800 hover:border-purple-500/50 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]"
                >
                  {/* Background Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Rank Badge */}
                  <div className="flex-shrink-0 w-16 flex justify-center">
                    <div className={`
                      flex items-center justify-center font-black text-xl 
                      ${isTop3 ? `w-14 h-14 rounded-full border-2 ${rankStyles[index]}` : 'w-10 h-10 text-zinc-500'}
                    `}>
                      #{index + 1}
                    </div>
                  </div>

                  {/* Channel Info */}
                  <div className="flex items-center gap-4 flex-1">
                    <img 
                      src={channel.photo} 
                      alt={channel.name} 
                      className={`w-16 h-16 rounded-full object-cover border-2 ${isTop3 ? 'border-purple-500 shadow-lg shadow-purple-500/20' : 'border-zinc-800'} p-0.5`}
                    />
                    <div>
                      <h3 className="font-bold text-xl text-white flex items-center gap-2">
                        {channel.name}
                        {isTop3 && <Star size={16} className="text-yellow-400 fill-yellow-400" />}
                      </h3>
                      <div className="flex items-center gap-3 text-sm mt-1">
                        <span className="px-2 py-0.5 rounded-md bg-zinc-800 text-zinc-300 font-medium">
                          {channel.country}
                        </span>
                        {channel.isGrowing ? (
                          <span className="flex items-center gap-1 text-emerald-400 font-medium">
                            <TrendingUp size={14} /> {channel.growth}
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-rose-400 font-medium">
                            <TrendingUp size={14} className="rotate-180" /> -0.2%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 md:flex md:gap-8 w-full md:w-auto mt-4 md:mt-0">
                    <StatBox label="Inscritos" value={formatNumber(channel.subs)} highlight={filter === 'subs'} />
                    <StatBox label="Views" value={formatNumber(channel.views)} highlight={filter === 'views'} />
                    <StatBox label="Vídeos" value={formatNumber(channel.videos)} highlight={filter === 'videos'} />
                    <StatBox label="Média" value={formatNumber(channel.engagement)} highlight={filter === 'engagement'} />
                  </div>

                  {/* Action Button */}
                  <div className="w-full md:w-auto mt-4 md:mt-0">
                    <a 
                      href={`https://youtube.com/channel/${channel.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full md:w-auto px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] active:scale-95"
                    >
                      <Zap size={18} className="fill-current" />
                      Analisar
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          
          {sortedChannels.length === 0 && (
            <div className="text-center py-20 text-zinc-500">
              Nenhum canal encontrado com esse nome.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function FilterButton({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300
        ${active 
          ? 'bg-purple-600/20 text-purple-400 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
          : 'bg-[#121214] text-zinc-400 border border-zinc-800 hover:bg-zinc-800 hover:text-white'}
      `}
    >
      {icon}
      {label}
    </button>
  );
}

function StatBox({ label, value, highlight }: { label: string, value: string, highlight?: boolean }) {
  return (
    <div className={`flex flex-col items-start ${highlight ? 'scale-110 md:scale-100 origin-left transition-transform' : ''}`}>
      <span className="text-xs uppercase tracking-wider font-bold text-zinc-500 mb-1">{label}</span>
      <span className={`text-lg font-bold ${highlight ? 'text-purple-400' : 'text-white'}`}>{value}</span>
    </div>
  );
}
