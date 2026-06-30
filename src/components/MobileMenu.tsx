import { X, Zap } from 'lucide-react';

export function MobileMenu({ isOpen, onClose, onViewChange }: any) {
  if (!isOpen) return null;

  const scrollTo = (id: string) => {
    onClose();
    if (window.location.pathname !== '/') {
      onViewChange('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-[#09090b] flex flex-col w-full shadow-2xl">
        <div className="flex justify-between items-center h-16 px-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => { onClose(); onViewChange('home'); window.scrollTo(0, 0); }}>
            <div className="bg-emerald-500 p-1.5 rounded-lg text-zinc-950">
              <Zap size={20} fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Creator AI</span>
          </div>
          <button onClick={onClose} className="p-2 text-white">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col px-4 pt-2 pb-6 gap-6">
          <button 
            onClick={() => scrollTo('funcionalidades')}
            className="text-left text-[15px] text-zinc-100 hover:text-white transition-colors"
          >
            Funcionalidades
          </button>
          <button 
            onClick={() => scrollTo('plataformas')}
            className="text-left text-[15px] text-zinc-100 hover:text-white transition-colors"
          >
            Plataformas
          </button>
          <button 
            onClick={() => scrollTo('depoimentos')}
            className="text-left text-[15px] text-zinc-100 hover:text-white transition-colors"
          >
            Depoimentos
          </button>
          <button 
            onClick={() => scrollTo('faq')}
            className="text-left text-[15px] text-zinc-100 hover:text-white transition-colors"
          >
            FAQ
          </button>
          
          <div className="h-px bg-zinc-800/50 w-full my-1"></div>
          
          <button 
            onClick={() => { onClose(); onViewChange('login'); }}
            className="w-full bg-transparent border border-zinc-800 hover:bg-zinc-900 text-white font-medium rounded-xl py-3.5 flex items-center justify-center transition-all"
          >
            Entrar
          </button>
          
          <button 
            onClick={() => { onClose(); onViewChange('signup'); }}
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold rounded-xl py-3.5 flex items-center justify-center transition-all"
          >
            Começar grátis
          </button>
        </div>
      </div>
    </div>
  );
}
