import React from 'react';
import { TrendingUp, TrendingDown, Lightbulb, Activity, Target, Zap } from 'lucide-react';

export default function Trends() {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Tendências e Oportunidades</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Descubra os formatos que estão dominando o algoritmo, os nichos mais lucrativos e as maiores oportunidades para viralizar hoje.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#121214] border border-emerald-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-500" />
            Nichos em Alta (Alta Demanda)
          </h2>
          <ul className="space-y-4">
            {[
              { name: 'Inteligência Artificial & Automação', growth: 'Explosivo', desc: 'Tutoriais de ChatGPT, Midjourney e como ganhar dinheiro com IA.' },
              { name: 'Desenvolvimento Pessoal & Hábitos', growth: 'Muito Alto', desc: 'Rotinas matinais, estoicismo, dopamina detox.' },
              { name: 'Finanças Comportamentais', growth: 'Alto', desc: 'Mais focado em mentalidade financeira do que apenas investimentos.' },
              { name: 'Produtividade & Sistemas (Notion)', growth: 'Constante', desc: 'Como organizar a vida, estudos e trabalho remotamente.' },
            ].map((item, i) => (
              <li key={i} className="pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-bold text-zinc-900 dark:text-white">{item.name}</span>
                  <span className="text-emerald-500 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-lg text-xs tracking-wider uppercase">{item.growth}</span>
                </div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-red-500/30 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingDown className="text-red-500" />
            Formatos em Queda (Saturados)
          </h2>
          <ul className="space-y-4">
            {[
              { name: 'Vlogs Diários Genéricos', desc: 'O público prefere Vlogs focados em desafios ou histórias com início, meio e fim (Ex: "Sobrevivi 7 dias...").' },
              { name: 'Reacts Simples (Sem valor agregado)', desc: 'Reagir sem adicionar crítica, edição pesada ou contexto não retém mais a atenção.' },
              { name: 'Tutoriais Muito Longos (Sem capítulos)', desc: 'O público quer a resposta rápida. Tutoriais que enrolam muito perdem visualização nos primeiros 30 segundos.' },
              { name: 'Gameplay Crua (Sem edição)', desc: 'Apenas subir uma partida de 40 minutos não funciona mais, exceto para streamers gigantes.' },
            ].map((item, i) => (
              <li key={i} className="pb-4 border-b border-zinc-100 dark:border-zinc-800 last:border-0 last:pb-0">
                <span className="font-bold text-zinc-900 dark:text-white block mb-1">{item.name}</span>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{item.desc}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white dark:bg-[#121214] border border-purple-500/30 rounded-2xl p-6 md:col-span-2 mt-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-6 flex items-center gap-2">
            <Lightbulb className="text-purple-500" />
            Oportunidades de Ouro (Ideias para Aplicar Hoje)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-xl relative overflow-hidden">
              <Zap className="absolute top-4 right-4 text-purple-500/20" size={48} />
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3 text-lg relative z-10">Faceless Channels (Canais Dark)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 relative z-10">Canais onde você não mostra o rosto. Usando IA para narração e imagens de banco (b-roll). É a forma mais rápida de escalar múltiplos canais simultaneamente.</p>
              <div className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Ideal para: Histórias, Curiosidades, Filmes</div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-xl relative overflow-hidden">
              <Target className="absolute top-4 right-4 text-blue-500/20" size={48} />
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3 text-lg relative z-10">Documentários Dinâmicos</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 relative z-10">O estilo "Magnates Media" ou "SunnyV2". Histórias reais editadas com motion graphics rápidos, retenção extrema e trilha sonora impactante.</p>
              <div className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Ideal para: Casos Criminais, Biografias, Negócios</div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-xl relative overflow-hidden">
              <Activity className="absolute top-4 right-4 text-emerald-500/20" size={48} />
              <h3 className="font-bold text-zinc-900 dark:text-white mb-3 text-lg relative z-10">Estratégia de Funil (Shorts ➔ Longos)</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 relative z-10">O YouTube está conectando Shorts a vídeos longos. Use Shorts virais, curtos e impactantes apenas como "isca" para atrair pessoas para seus vídeos de 10+ minutos, que é onde está a monetização real.</p>
              <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Obrigatório para: Todos os novos canais</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
