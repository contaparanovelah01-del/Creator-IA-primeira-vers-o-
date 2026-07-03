import React from 'react';
import { Trophy, TrendingUp, Users, Video } from 'lucide-react';

export default function CreatorAnalytics() {
  const categories = [
    "Canais que mais cresceram hoje",
    "Canais que mais cresceram nos últimos 7 dias",
    "Canais que mais cresceram nos últimos 30 dias",
    "Canais que mais cresceram no último ano",
    "Canais com mais inscritos",
    "Canais com mais visualizações",
    "Shorts mais assistidos",
    "Vídeos mais assistidos",
    "Canais em alta"
  ];

  const mockData = [
    { rank: 1, name: "MrBeast", niche: "Entretenimento", country: "🇺🇸 US", subs: "250M+", views: "45B+", growth: "+1.2M inscritos (30d)", photo: "https://ui-avatars.com/api/?name=MrBeast&background=10b981&color=fff&size=150" },
    { rank: 2, name: "T-Series", niche: "Música", country: "🇮🇳 IN", subs: "260M+", views: "245B+", growth: "+800K inscritos (30d)", photo: "https://ui-avatars.com/api/?name=T-Series&background=ef4444&color=fff&size=150" },
    { rank: 3, name: "Cocomelon", niche: "Kids", country: "🇺🇸 US", subs: "170M+", views: "175B+", growth: "+500K inscritos (30d)", photo: "https://ui-avatars.com/api/?name=Cocomelon&background=0ea5e9&color=fff&size=150" },
    { rank: 4, name: "PewDiePie", niche: "Games", country: "🇸🇪 SE", subs: "111M+", views: "29B+", growth: "Estável", photo: "https://ui-avatars.com/api/?name=PewDiePie&background=f59e0b&color=fff&size=150" },
    { rank: 5, name: "Kids Diana Show", niche: "Kids", country: "🇺🇦 UA", subs: "118M+", views: "99B+", growth: "+300K inscritos (30d)", photo: "https://ui-avatars.com/api/?name=Kids+Diana+Show&background=ec4899&color=fff&size=150" }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Análise de Criadores</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Análise de mercado e ranking de criadores em tempo real.</p>
      </div>

      <div className="space-y-12">
        {categories.map((category, idx) => (
          <div key={idx} className="bg-white dark:bg-[#121214] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
              <Trophy className="text-emerald-500" size={24} />
              {category}
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 dark:border-zinc-800 text-sm text-zinc-500 dark:text-zinc-400">
                    <th className="pb-3 px-4 font-medium">Posição</th>
                    <th className="pb-3 px-4 font-medium">Canal</th>
                    <th className="pb-3 px-4 font-medium">Nicho</th>
                    <th className="pb-3 px-4 font-medium">País</th>
                    <th className="pb-3 px-4 font-medium">Inscritos</th>
                    <th className="pb-3 px-4 font-medium">Visualizações</th>
                    <th className="pb-3 px-4 font-medium">Crescimento</th>
                    <th className="pb-3 px-4 font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockData.map((channel) => (
                    <tr key={channel.rank} className="border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-800/20 transition-colors">
                      <td className="py-4 px-4 font-bold text-zinc-900 dark:text-white text-lg">#{channel.rank}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img src={channel.photo} alt={channel.name} className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 object-cover" referrerPolicy="no-referrer" />
                          <span className="font-semibold text-zinc-900 dark:text-white whitespace-nowrap">{channel.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-zinc-600 dark:text-zinc-300">
                        <span className="px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-medium">{channel.niche}</span>
                      </td>
                      <td className="py-4 px-4 text-zinc-600 dark:text-zinc-300">{channel.country}</td>
                      <td className="py-4 px-4 font-medium text-zinc-900 dark:text-white">{channel.subs}</td>
                      <td className="py-4 px-4 text-zinc-600 dark:text-zinc-400">{channel.views}</td>
                      <td className="py-4 px-4 text-emerald-500 font-bold">{channel.growth}</td>
                      <td className="py-4 px-4 text-right">
                        <a 
                          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(channel.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-xl text-sm font-bold transition-colors whitespace-nowrap"
                        >
                          Ver Perfil
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
