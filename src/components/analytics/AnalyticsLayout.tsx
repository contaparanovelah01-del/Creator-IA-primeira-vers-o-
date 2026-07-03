import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart2, 
  Users, 
  Trophy, 
  Library, 
  Video, 
  GraduationCap, 
  Star, 
  TrendingUp,
  Search,
  ArrowRight,
  ListOrdered
} from 'lucide-react';
import CreatorAnalytics from './CreatorAnalytics';
import CreatorRanking from './CreatorRanking';
import ChannelComparator from './ChannelComparator';
import NicheRanking from './NicheRanking';
import ChannelLibrary from './ChannelLibrary';
import VideoLibrary from './VideoLibrary';
import CreatorAcademy from './CreatorAcademy';
import HallOfFame from './HallOfFame';
import Trends from './Trends';

export default function AnalyticsLayout() {
  const [activeSection, setActiveSection] = useState('creator-analytics');

  const menuItems = [
    { id: 'creator-analytics', label: 'Análise de Criadores', icon: BarChart2 },
    { id: 'creator-ranking', label: 'Ranking dos Criadores', icon: ListOrdered },
    { id: 'comparator', label: 'Comparador de Canais', icon: Users },
    { id: 'niche-ranking', label: 'Ranking dos Nichos', icon: Trophy },
    { id: 'channel-library', label: 'Biblioteca de Canais', icon: Library },
    { id: 'video-library', label: 'Biblioteca de Vídeos', icon: Video },
    { id: 'academy', label: 'Academia de Criadores', icon: GraduationCap },
    { id: 'hall-of-fame', label: 'Hall da Fama', icon: Star },
    { id: 'trends', label: 'Tendências', icon: TrendingUp },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'creator-analytics': return <CreatorAnalytics />;
      case 'creator-ranking': return <CreatorRanking />;
      case 'comparator': return <ChannelComparator />;
      case 'niche-ranking': return <NicheRanking />;
      case 'channel-library': return <ChannelLibrary />;
      case 'video-library': return <VideoLibrary />;
      case 'academy': return <CreatorAcademy />;
      case 'hall-of-fame': return <HallOfFame />;
      case 'trends': return <Trends />;
      default: return <CreatorAnalytics />;
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-full">
      {/* Analytics Sidebar Menu */}
      <div className="w-full md:w-64 bg-white dark:bg-[#121214] border-r border-zinc-200 dark:border-zinc-800 shrink-0 overflow-x-auto md:overflow-y-auto">
        <div className="p-4 flex md:flex-col gap-2 md:gap-0">
          <h2 className="hidden md:flex text-xl font-bold text-zinc-900 dark:text-white mb-6 px-2 items-center gap-2">
            <BarChart2 className="text-emerald-500" />
            Analytics
          </h2>
          <nav className="flex md:flex-col gap-2 md:space-y-1 w-max md:w-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm whitespace-nowrap md:whitespace-normal ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Icon size={18} className="shrink-0" />
                  {item.label}
                  {isActive && <ArrowRight size={14} className="ml-auto hidden md:block" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-transparent">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-4 md:p-8 pb-32"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
