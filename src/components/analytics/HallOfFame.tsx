import React, { useState } from 'react';
import { Star, Trophy, Award } from 'lucide-react';

export default function HallOfFame() {
  const [filter, setFilter] = useState('youtube');
  
  const youtubeCreators = [
    { rank: 1, name: 'MrBeast', country: '🇺🇸 US', subs: '250M+', views: '45B+', niche: 'Entretenimento', image: 'https://ui-avatars.com/api/?name=MrBeast&background=10b981&color=fff&size=150' },
    { rank: 2, name: 'T-Series', country: '🇮🇳 IN', subs: '260M+', views: '245B+', niche: 'Música', image: 'https://ui-avatars.com/api/?name=T-Series&background=ef4444&color=fff&size=150' },
    { rank: 3, name: 'Cocomelon', country: '🇺🇸 US', subs: '170M+', views: '175B+', niche: 'Kids', image: 'https://ui-avatars.com/api/?name=Cocomelon&background=0ea5e9&color=fff&size=150' },
    { rank: 4, name: 'PewDiePie', country: '🇸🇪 SE', subs: '111M+', views: '29B+', niche: 'Games', image: 'https://ui-avatars.com/api/?name=PewDiePie&background=f59e0b&color=fff&size=150' },
    { rank: 5, name: 'Kids Diana Show', country: '🇺🇦 UA', subs: '118M+', views: '99B+', niche: 'Kids', image: 'https://ui-avatars.com/api/?name=Kids+Diana+Show&background=ec4899&color=fff&size=150' },
  ];

  const tiktokCreators = [
    { rank: 1, name: 'Khaby Lame', country: '🇮🇹 IT', subs: '162M+', views: 'N/A', niche: 'Comédia', image: 'https://ui-avatars.com/api/?name=Khaby+Lame&background=10b981&color=fff&size=150' },
    { rank: 2, name: 'Charli D\'Amelio', country: '🇺🇸 US', subs: '151M+', views: 'N/A', niche: 'Dança', image: 'https://ui-avatars.com/api/?name=Charli+DAmelio&background=ec4899&color=fff&size=150' },
    { rank: 3, name: 'Bella Poarch', country: '🇺🇸 US', subs: '93M+', views: 'N/A', niche: 'Lip Sync', image: 'https://ui-avatars.com/api/?name=Bella+Poarch&background=8b5cf6&color=fff&size=150' },
    { rank: 4, name: 'MrBeast', country: '🇺🇸 US', subs: '92M+', views: 'N/A', niche: 'Entretenimento', image: 'https://ui-avatars.com/api/?name=MrBeast&background=10b981&color=fff&size=150' },
    { rank: 5, name: 'Zach King', country: '🇺🇸 US', subs: '80M+', views: 'N/A', niche: 'Ilusionismo', image: 'https://ui-avatars.com/api/?name=Zach+King&background=f59e0b&color=fff&size=150' },
  ];

  const instagramCreators = [
    { rank: 1, name: 'Cristiano Ronaldo', country: '🇵🇹 PT', subs: '617M+', views: 'N/A', niche: 'Esportes', image: 'https://ui-avatars.com/api/?name=Cristiano+Ronaldo&background=ef4444&color=fff&size=150' },
    { rank: 2, name: 'Lionel Messi', country: '🇦🇷 AR', subs: '496M+', views: 'N/A', niche: 'Esportes', image: 'https://ui-avatars.com/api/?name=Lionel+Messi&background=3b82f6&color=fff&size=150' },
    { rank: 3, name: 'Selena Gomez', country: '🇺🇸 US', subs: '429M+', views: 'N/A', niche: 'Música', image: 'https://ui-avatars.com/api/?name=Selena+Gomez&background=ec4899&color=fff&size=150' },
    { rank: 4, name: 'Kylie Jenner', country: '🇺🇸 US', subs: '399M+', views: 'N/A', niche: 'Estilo de Vida', image: 'https://ui-avatars.com/api/?name=Kylie+Jenner&background=d946ef&color=fff&size=150' },
    { rank: 5, name: 'Dwayne Johnson', country: '🇺🇸 US', subs: '395M+', views: 'N/A', niche: 'Ator', image: 'https://ui-avatars.com/api/?name=Dwayne+Johnson&background=f59e0b&color=fff&size=150' },
  ];

  const creators = filter === 'youtube' ? youtubeCreators : filter === 'tiktok' ? tiktokCreators : instagramCreators;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Hall da Fama</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Os maiores e mais lendários criadores de conteúdo do mundo.</p>
        </div>
        
        <div className="flex bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl p-1 shrink-0">
          <button 
            onClick={() => setFilter('youtube')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'youtube' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
          >
            YouTube
          </button>
          <button 
            onClick={() => setFilter('tiktok')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'tiktok' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
          >
            TikTok
          </button>
          <button 
            onClick={() => setFilter('instagram')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${filter === 'instagram' ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white' : 'text-zinc-500'}`}
          >
            Instagram
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {creators.map((creator) => (
          <a 
            key={creator.rank} 
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(creator.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-[#121214] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 md:p-6 flex items-center gap-4 md:gap-6 hover:border-emerald-500 transition-colors block"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full font-black text-xl shrink-0 ${
              creator.rank === 1 ? 'bg-amber-100 text-amber-500' :
              creator.rank === 2 ? 'bg-zinc-100 text-zinc-400 dark:bg-zinc-800' :
              creator.rank === 3 ? 'bg-orange-100 text-orange-500' :
              'bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-white'
            }`}>
              {creator.rank === 1 && <Trophy size={20} className="mr-1" />}
              {creator.rank > 1 && '#'}
              {creator.rank}
            </div>
            
            <img src={creator.image} alt={creator.name} className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-zinc-200 dark:bg-zinc-800 object-cover" referrerPolicy="no-referrer" />
            
            <div className="flex-1">
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                {creator.name}
                <Star size={16} className="text-emerald-500 fill-emerald-500" />
              </h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                <span>{creator.niche}</span>
                <span>•</span>
                <span>{creator.country}</span>
              </div>
            </div>
            
            <div className="hidden md:flex gap-8 text-right">
              <div>
                <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Inscritos</div>
                <div className="font-bold text-zinc-900 dark:text-white text-lg">{creator.subs}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Visualizações</div>
                <div className="font-bold text-zinc-900 dark:text-white text-lg">{creator.views}</div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
