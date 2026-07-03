import React from 'react';
import { PlayCircle, Clock } from 'lucide-react';

export default function CreatorAcademy() {
  const courses = [
    { title: 'Como crescer no YouTube em 2024 (Estratégia Completa)', duration: '45 min', module: 'Crescimento', image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=500&q=80' },
    { title: 'O segredo para viralizar no Shorts e TikTok', duration: '32 min', module: 'Shorts & TikTok', image: 'https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=500&q=80' },
    { title: 'Design de Thumbnails Imbatíveis (Clique Garantido)', duration: '55 min', module: 'CTR', image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=500&q=80' },
    { title: 'Copywriting para Títulos Extremamente Clicáveis', duration: '28 min', module: 'CTR', image: 'https://images.unsplash.com/photo-1455390582262-044cdead27d8?w=500&q=80' },
    { title: 'Estratégias de Retenção: Como prender a atenção do público', duration: '40 min', module: 'Engajamento', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
    { title: 'Monetização Além do AdSense (Patrocínios e Produtos)', duration: '50 min', module: 'Monetização', image: 'https://images.unsplash.com/photo-1580519542036-ed47f3e42a9b?w=500&q=80' },
    { title: 'Como criar um Roteiro Perfeito (Fórmula de Storytelling)', duration: '35 min', module: 'Roteiro', image: 'https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=500&q=80' },
    { title: 'Edição Dinâmica para YouTube (Estilo Documentário)', duration: '1h 10m', module: 'Edição', image: 'https://images.unsplash.com/photo-1574717024453-354056aaddfa?w=500&q=80' },
    { title: 'Equipamentos, Iluminação e Áudio com Baixo Orçamento', duration: '42 min', module: 'Produção', image: 'https://images.unsplash.com/photo-1590130985223-b1d5c21f92e3?w=500&q=80' },
    { title: 'Canais Dark (Faceless): Criando vídeos sem aparecer', duration: '58 min', module: 'Nichos', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80' },
    { title: 'Como ler as Métricas do YouTube Studio', duration: '30 min', module: 'Analytics', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80' },
    { title: 'SEO para YouTube (Apareça nas Primeiras Posições)', duration: '48 min', module: 'Crescimento', image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Academia de Criadores</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Aprenda as melhores estratégias com os maiores criadores do mercado.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course, i) => (
          <a 
            key={i} 
            href={`https://www.youtube.com/results?search_query=${encodeURIComponent(course.title)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden group cursor-pointer hover:border-emerald-500 transition-colors"
          >
            <div className="relative aspect-video">
              <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <PlayCircle size={48} className="text-white" />
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">
                <Clock size={12} /> {course.duration}
              </div>
            </div>
            <div className="p-5">
              <div className="text-xs font-bold text-emerald-500 mb-2 uppercase tracking-wider">{course.module}</div>
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg leading-tight">{course.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
