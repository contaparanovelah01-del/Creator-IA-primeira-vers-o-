import React, { useState } from 'react';
import { Target, DollarSign, TrendingUp, Zap, ShieldAlert, Star, Filter } from 'lucide-react';

export default function NicheRanking() {
  const [filter, setFilter] = useState('youtube');
  
  const youtubeNiches = [
    { id: 1, name: "Finanças e Investimentos", score: 9.8, cpm: "Alto ($15 - $35)", competition: "Alta", beginnerFriendly: "Difícil", viralPotential: 7, growth: "+45%", audience: "Adultos 25-45" },
    { id: 2, name: "Tecnologia e Software", score: 9.2, cpm: "Alto ($10 - $25)", competition: "Média", beginnerFriendly: "Moderado", viralPotential: 6, growth: "+30%", audience: "18-35 anos" },
    { id: 3, name: "Saúde e Bem-estar", score: 8.9, cpm: "Médio ($5 - $15)", competition: "Alta", beginnerFriendly: "Fácil", viralPotential: 9, growth: "+50%", audience: "Público Geral" },
    { id: 4, name: "Documentários / Casos Criminais", score: 8.7, cpm: "Médio ($6 - $12)", competition: "Média", beginnerFriendly: "Difícil (Edição)", viralPotential: 10, growth: "+60%", audience: "Jovens Adultos" },
    { id: 5, name: "Games e Esports", score: 8.5, cpm: "Baixo ($2 - $6)", competition: "Extrema", beginnerFriendly: "Fácil", viralPotential: 10, growth: "+20%", audience: "13-25 anos" }
  ];

  const tiktokNiches = [
    { id: 1, name: "Comédia e Esquetes", score: 9.5, cpm: "Baixo", competition: "Extrema", beginnerFriendly: "Moderado", viralPotential: 10, growth: "+40%", audience: "Geral" },
    { id: 2, name: "Curiosidades e Fatos", score: 9.3, cpm: "Médio", competition: "Alta", beginnerFriendly: "Muito Fácil", viralPotential: 9, growth: "+70%", audience: "Jovens" },
    { id: 3, name: "Dança e Lipsync", score: 8.8, cpm: "Baixo", competition: "Extrema", beginnerFriendly: "Fácil", viralPotential: 10, growth: "+10%", audience: "Adolescentes" },
    { id: 4, name: "Dicas de Produtividade / Hacks", score: 8.5, cpm: "Médio", competition: "Média", beginnerFriendly: "Fácil", viralPotential: 8, growth: "+55%", audience: "Jovens Adultos" },
    { id: 5, name: "Moda e Beleza (GRWM)", score: 8.4, cpm: "Alto (Patrocínios)", competition: "Alta", beginnerFriendly: "Moderado", viralPotential: 9, growth: "+35%", audience: "Feminino 15-30" }
  ];

  const instagramNiches = [
    { id: 1, name: "Lifestyle e Estilo de Vida", score: 9.6, cpm: "Alto (Patrocínios)", competition: "Extrema", beginnerFriendly: "Moderado", viralPotential: 7, growth: "+25%", audience: "Geral" },
    { id: 2, name: "Saúde, Fitness e Dieta", score: 9.4, cpm: "Alto", competition: "Extrema", beginnerFriendly: "Moderado", viralPotential: 8, growth: "+40%", audience: "18-40 anos" },
    { id: 3, name: "Empreendedorismo e Negócios", score: 9.1, cpm: "Muito Alto", competition: "Alta", beginnerFriendly: "Difícil", viralPotential: 6, growth: "+50%", audience: "Adultos" },
    { id: 4, name: "Moda, Beleza e Maquiagem", score: 8.9, cpm: "Alto", competition: "Alta", beginnerFriendly: "Moderado", viralPotential: 8, growth: "+30%", audience: "Feminino" },
    { id: 5, name: "Viagens (Travel Blogger)", score: 8.5, cpm: "Alto", competition: "Alta", beginnerFriendly: "Difícil (Custo)", viralPotential: 9, growth: "+45%", audience: "20-40 anos" }
  ];

  const niches = filter === 'youtube' ? youtubeNiches : filter === 'tiktok' ? tiktokNiches : instagramNiches;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Ranking dos Nichos</h1>
          <p className="text-zinc-500 dark:text-zinc-400">Descubra os nichos mais lucrativos e com maior potencial de crescimento.</p>
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

      <div className="grid gap-6">
        {niches.map((niche, i) => (
          <div key={niche.id} className="bg-white dark:bg-[#121214] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6 flex flex-col md:flex-row gap-6 items-start md:items-center">
            
            <div className="flex items-center gap-6 w-full md:w-1/3 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 pb-6 md:pb-0 md:pr-6">
              <div className="text-4xl font-black text-zinc-200 dark:text-zinc-800">
                #{i + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1">{niche.name}</h3>
                <div className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded text-sm font-bold w-max">
                  <Star size={14} fill="currentColor" />
                  Nota Geral: {niche.score}
                </div>
              </div>
            </div>

            <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1"><DollarSign size={14} /> Retorno (CPM)</div>
                <div className="font-bold text-zinc-900 dark:text-white">{niche.cpm}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1"><ShieldAlert size={14} /> Concorrência</div>
                <div className="font-bold text-zinc-900 dark:text-white">{niche.competition}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1"><Target size={14} /> Iniciantes</div>
                <div className="font-bold text-zinc-900 dark:text-white">{niche.beginnerFriendly}</div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-1 flex items-center gap-1"><TrendingUp size={14} /> Crescimento</div>
                <div className="font-bold text-emerald-500">{niche.growth}</div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
