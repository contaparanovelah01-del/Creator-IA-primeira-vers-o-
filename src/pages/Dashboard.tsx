import React, { useState, useEffect, useRef } from "react";
import { collection, addDoc, serverTimestamp, query, where, orderBy, onSnapshot, doc, updateDoc, deleteDoc, limit } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { SupportChat } from "../components/SupportChat";
import {
  Home,
  Sparkles,
  Clock,
  Heart,
  Settings,
  Plus,
  LayoutDashboard,
  Copy,
  Share2,
  FileText,
  Search,
  User,
  Crown,
  LogOut,
  Moon,
  ArrowLeft,
  Zap,
  X,
  Download,
  Globe,
  ShieldAlert,
  Edit2,
} from "lucide-react";
import { auth, logout, db } from "../lib/firebase";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { useTheme } from "../contexts/ThemeContext";
import jsPDF from "jspdf";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function timeAgo(date: any, t: any) {
  if (!date) return "";
  const dateObj = date.toDate ? date.toDate() : new Date(date);
  const seconds = Math.floor((new Date().getTime() - dateObj.getTime()) / 1000);
  
  if (seconds < 60) return t.timeJustNow;
  
  const minutes = Math.floor(seconds / 60);
  if (minutes === 1) return t.timeMinute;
  if (minutes < 60) return t.timeMinutes.replace("{n}", minutes.toString());
  
  const hours = Math.floor(minutes / 60);
  if (hours === 1) return t.timeHour;
  if (hours < 24) return t.timeHours.replace("{n}", hours.toString());
  
  const days = Math.floor(hours / 24);
  if (days === 1) return t.timeDay;
  return t.timeDays.replace("{n}", days.toString());
}

// --- Tabs Components ---

function HomeTab({ setActiveTab, setSelectedType, currentLanguage, setViewingContent }: any) {
  const user = auth.currentUser;
  const firstName = user?.displayName?.split(" ")[0] || "Criador";
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const [recentItems, setRecentItems] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    const q = query(
      collection(db, 'generations'),
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc'),
      limit(3)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRecentItems(docs);
    }, (error: any) => {
      if (error.code !== 'permission-denied' && error.message !== 'Failed to fetch') {
        console.error("Error fetching recent items:", error);
      }
    });
    return () => unsubscribe();
  }, [user]);

  const handleQuickCreate = (type: string) => {
    setSelectedType(type);
    setActiveTab("create");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="pb-24 pt-8 px-4 max-w-lg mx-auto"
    >
      <div className="mb-8">
        <p className="text-zinc-500 dark:text-zinc-400 text-sm mb-1">{t.hello},</p>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white flex items-center gap-2 mb-2">
          {firstName}{" "}
          <Sparkles
            className="text-emerald-400"
            size={24}
            fill="currentColor"
          />
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {t.whatToCreate}
        </p>
      </div>

      <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 pl-4 flex items-center gap-3 mb-10">
        <Sparkles className="text-emerald-500 shrink-0" size={20} />
        <input
          type="text"
          placeholder={t.topicPlaceholder}
          className="bg-transparent border-none text-zinc-900 dark:text-white text-sm focus:outline-none w-full placeholder-zinc-500"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setActiveTab("create");
            }
          }}
        />
        <button
          onClick={() => setActiveTab("create")}
          className="bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 font-medium px-4 py-2 rounded-xl flex items-center gap-2 text-sm transition-colors shrink-0"
        >
          <Zap size={16} /> {t.generateBtn}
        </button>
      </div>

      <div className="mb-10">
        <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">
          {t.quickCreate}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => handleQuickCreate(t.genType1)}
            className="bg-emerald-50 dark:bg-[#0f1c16] border border-emerald-200 dark:border-emerald-900/50 hover:bg-emerald-100 dark:hover:bg-[#14251d] p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors"
          >
            <div className="text-emerald-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18h6" />
                <path d="M10 22h4" />
                <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1.55.75 2.82 1.5 3.5.76.76 1.23 1.52 1.41 2.5" />
                <path d="M12 2v2" />
              </svg>
            </div>
            <span className="text-emerald-900 dark:text-emerald-50 font-medium text-sm">
              {t.genType1}
            </span>
          </button>
          <button
            onClick={() => handleQuickCreate(t.genType2)}
            className="bg-purple-50 dark:bg-[#181024] border border-purple-200 dark:border-purple-900/50 hover:bg-purple-100 dark:hover:bg-[#1f152e] p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors"
          >
            <div className="text-purple-600 dark:text-purple-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 20h9" />
                <path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z" />
                <path d="m15 5 3 3" />
              </svg>
            </div>
            <span className="text-purple-900 dark:text-purple-50 font-medium text-sm">{t.genType2}</span>
          </button>
          <button
            onClick={() => handleQuickCreate(t.genType3)}
            className="bg-amber-50 dark:bg-[#1a1409] border border-amber-200 dark:border-amber-900/50 hover:bg-amber-100 dark:hover:bg-[#211a0c] p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors"
          >
            <div className="text-amber-600 dark:text-amber-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 7 4 4 20 4 20 7" />
                <line x1="9" x2="15" y1="20" y2="20" />
                <line x1="12" x2="12" y1="4" y2="20" />
              </svg>
            </div>
            <span className="text-amber-900 dark:text-amber-50 font-medium text-sm">{t.genType3}</span>
          </button>
          <button
            onClick={() => handleQuickCreate(t.genType4)}
            className="bg-blue-50 dark:bg-[#0f1424] border border-blue-200 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-[#141b2e] p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors"
          >
            <div className="text-blue-600 dark:text-blue-400">
              <FileText size={24} />
            </div>
            <span className="text-blue-900 dark:text-blue-50 font-medium text-sm">{t.genType4}</span>
          </button>
          <button
            onClick={() => handleQuickCreate(t.genType5)}
            className="bg-pink-50 dark:bg-[#1e0f18] border border-pink-200 dark:border-pink-900/50 hover:bg-pink-100 dark:hover:bg-[#26131f] p-4 rounded-2xl flex flex-col items-center justify-center gap-3 transition-colors"
          >
            <div className="text-pink-600 dark:text-pink-400">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="9" y2="9" />
                <line x1="4" x2="20" y1="15" y2="15" />
                <line x1="10" x2="8" y1="3" y2="21" />
                <line x1="16" x2="14" y1="3" y2="21" />
              </svg>
            </div>
            <span className="text-pink-900 dark:text-pink-50 font-medium text-sm">{t.genType5}</span>
          </button>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">
            {t.recents}
          </h2>
          <button
            onClick={() => setActiveTab("history")}
            className="text-xs font-medium text-emerald-400 hover:text-emerald-300"
          >
            {t.viewAll}
          </button>
        </div>

        {recentItems.length === 0 ? (
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 mb-4 flex flex-col items-center justify-center text-center">
            <FileText className="text-zinc-700 mb-3" size={32} />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t.noContentYet}</p>
            <button
              onClick={() => setActiveTab("create")}
              className="mt-4 text-emerald-400 text-sm font-medium hover:text-emerald-300"
            >
              {t.createNow}
            </button>
          </div>
        ) : (
          <div className="space-y-3 mb-4">
            {recentItems.map(item => (
              <div 
                key={item.id} 
                onClick={() => setViewingContent(item)}
                className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm flex items-start justify-between group cursor-pointer hover:border-emerald-500/50 transition-colors"
              >
                <div className="pr-2 overflow-hidden">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md whitespace-nowrap">
                      {item.type}
                    </span>
                    <span className="text-xs text-zinc-400 whitespace-nowrap">{timeAgo(item.createdAt, t)}</span>
                  </div>
                  <h3 className="font-medium text-sm text-zinc-900 dark:text-white line-clamp-1">{item.topic}</h3>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(item.content).then(() => alert("Copiado!"));
                  }}
                  className="p-2 shrink-0 text-zinc-400 hover:text-emerald-500 transition-colors"
                >
                  <Copy size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function CreateTab({ selectedType, setSelectedType, setActiveTab, currentLanguage }: any) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const contentTypes = [
    t.genType1,
    t.genType2,
    t.genType3,
    t.genType4,
    t.genType5,
  ];
  const platforms = [
    "TikTok",
    "Instagram",
    "YouTube",
    "Facebook",
    "Kwai",
    "Threads",
    "X (Twitter)",
  ];
  const tones = [
    { label: t.tone1, emoji: "😂" },
    { label: t.tone2, emoji: "💼" },
    { label: t.tone3, emoji: "🔥" },
    { label: t.tone6, emoji: "📚" },
    { label: t.tone7, emoji: "📖" },
    { label: t.tone8, emoji: "💪" },
    { label: t.tone4, emoji: "✨" },
    { label: t.tone5, emoji: "🔮" },
    { label: t.tone9, emoji: "💖" },
    { label: t.tone10, emoji: "🎯" },
    { label: t.tone11, emoji: "📰" },
  ];

  const languages = [
    "Português",
    "English",
    "Español",
    "Français",
    "Deutsch",
    "Italiano"
  ];

  const scriptTypes = [
    "Curto",
    "Médio",
    "Longo",
    "Narrado"
  ];

  const [platform, setPlatform] = useState("TikTok");
  const [tone, setTone] = useState(() => {
    const currentLang = localStorage.getItem("preferredLanguage") || "Português";
    const t = translations[currentLang as keyof typeof translations] || translations["Português"];
    return t.tone2;
  });
  const [topic, setTopic] = useState("");
  const [language, setLanguage] = useState(() => localStorage.getItem("preferredLanguage") || "Português");
  const [scriptType, setScriptType] = useState("Curto");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<{id: string, text: string, isFavorite: boolean} | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    
    setIsGenerating(true);
    setGeneratedContent(null);
    try {
      let quantityStr = selectedType !== t.genType2 ? "20 " : "";
      let scriptTypeStr = selectedType === t.genType2 ? `Tipo de Roteiro: ${scriptType}.\n      ` : "";

      const prompt = `Atue como um especialista em redes sociais. Crie ${quantityStr}${selectedType} para a plataforma ${platform}.
      Tom de voz: ${tone}.
      Idioma: ${language}.
      ${scriptTypeStr}Tema: ${topic}.
      REGRAS DE FORMATAÇÃO (MUITO IMPORTANTE):
      1. NÃO use formatação markdown (como ** ou *).
      2. Estruture o conteúdo de forma extremamente limpa e organizada, usando quebras de linha duplas para separar tópicos ou itens.
      3. DESTAQUE EM LETRAS MAIÚSCULAS as palavras de instrução, elementos de tela e indicações de ação para chamar a atenção (Exemplo: IMAGEM:, FALA:, TEXTO NA TELA:, CENÁRIO:, ÁUDIO:, AÇÃO:, NESTE MOMENTO:).
      4. Forneça apenas o conteúdo final pronto para uso. Se for mais de uma opção, enumere-as claramente com números (1., 2., 3.).`;

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        let errorData;
        try {
            errorData = await response.json();
        } catch (e) {
            // Ignore if not json
        }
        if (response.status === 503 || (errorData && errorData.error && errorData.error.includes("503"))) {
            throw new Error('O modelo está temporariamente indisponível devido à alta demanda. Por favor, tente novamente em alguns instantes.');
        }
        throw new Error(errorData?.error || 'Falha ao gerar conteúdo. Tente novamente mais tarde.');
      }

      const data = await response.json();
      
      const docRef = await addDoc(collection(db, 'generations'), {
        userId: auth.currentUser?.uid,
        topic,
        content: data.text || "",
        type: selectedType,
        platform,
        tone,
        language,
        ...(selectedType === t.genType2 ? { scriptType } : {}),
        isFavorite: false,
        createdAt: serverTimestamp()
      });

      setGeneratedContent({ id: docRef.id, text: data.text, isFavorite: false });
    } catch (error: any) {
      if (error?.code !== 'permission-denied' && error?.message !== 'Failed to fetch') {
        console.error(error);
      }
      alert(error.message || 'Erro ao gerar conteúdo. Tente novamente mais tarde.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToggleFavorite = async () => {
    if (!generatedContent) return;
    try {
      const newFavoriteState = !generatedContent.isFavorite;
      await updateDoc(doc(db, 'generations', generatedContent.id), {
        isFavorite: newFavoriteState
      });
      setGeneratedContent({ ...generatedContent, isFavorite: newFavoriteState });
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  const handleCopy = () => {
    if (generatedContent) {
      navigator.clipboard.writeText(generatedContent.text);
      alert('Conteúdo copiado!');
    }
  };

  const handleExportPDF = () => {
    if (generatedContent) {
      const pdfDoc = new jsPDF();
      
      const margin = 10;
      const pageWidth = pdfDoc.internal.pageSize.getWidth();
      const textWidth = pageWidth - margin * 2;
      
      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.text(topic || 'Conteúdo Gerado', margin, 20);
      
      pdfDoc.setFont("helvetica", "normal");
      pdfDoc.setFontSize(12);
      
      const splitText = pdfDoc.splitTextToSize(generatedContent.text, textWidth);
      pdfDoc.text(splitText, margin, 35);
      
      pdfDoc.save(`${topic ? topic.substring(0, 20) : 'conteudo'}.pdf`);
    }
  };

  const handleShare = async () => {
    if (generatedContent && navigator.share) {
      try {
        await navigator.share({
          title: topic || 'Conteúdo Gerado',
          text: generatedContent.text,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', err);
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="pb-24 pt-4 px-4 max-w-lg mx-auto flex flex-col h-full min-h-screen"
    >
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => setActiveTab("home")}
          className="p-2 -ml-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white leading-tight">
            {t.createTitle}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm">
            {t.quickCreateDesc}
          </p>
        </div>
      </div>

      <div className="space-y-6 flex-1">
        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 block">
            {t.topicLabel}
          </label>
          <div className="relative">
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 text-zinc-900 dark:text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500 resize-none min-h-[100px]"
              placeholder={t.topicPlaceholder}
            ></textarea>
            <span className="absolute bottom-4 right-4 text-xs text-zinc-500">
              {topic.length}
            </span>
          </div>
        </div>



        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
            {t.whatToGenerate}
          </label>
          <div className="flex flex-wrap gap-2">
            {contentTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  selectedType === type
                    ? "bg-[#0f1c16] text-emerald-400 border border-emerald-900"
                    : "bg-zinc-50 dark:bg-[#18181b] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {selectedType === t.genType2 && (
          <div>
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
              Tipo de Roteiro
            </label>
            <div className="flex flex-wrap gap-2">
              {scriptTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setScriptType(type)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                    scriptType === type
                      ? "bg-[#0f1c16] text-emerald-400 border border-emerald-900"
                      : "bg-zinc-50 dark:bg-[#18181b] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                  )}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
            {t.platformLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setPlatform(p)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  platform === p
                    ? "bg-[#0f1c16] text-emerald-400 border border-emerald-900"
                    : "bg-zinc-50 dark:bg-[#18181b] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
            {t.outputLang}
          </label>
          <div className="flex flex-wrap gap-2">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-colors",
                  language === lang
                    ? "bg-[#0f1c16] text-emerald-400 border border-emerald-900"
                    : "bg-zinc-50 dark:bg-[#18181b] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                )}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        <div className="pb-6">
          <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 block">
            {t.toneLabel}
          </label>
          <div className="flex flex-wrap gap-2">
            {tones.map((toneObj) => (
              <button
                key={toneObj.label}
                onClick={() => setTone(toneObj.label)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-colors",
                  tone === toneObj.label
                    ? "bg-[#0f1c16] text-emerald-400 border border-emerald-900"
                    : "bg-zinc-50 dark:bg-[#18181b] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800",
                )}
              >
                <span>{toneObj.emoji}</span> {toneObj.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-20 mt-6 pt-4 pb-2 bg-zinc-50 dark:bg-[#09090b]">
        <button 
          onClick={handleGenerate}
          disabled={!topic.trim() || isGenerating}
          className={cn(
            "w-full font-bold rounded-2xl py-4 flex items-center justify-center gap-2 transition-all",
            !topic.trim() || isGenerating 
              ? "bg-[#1a3a2a] text-emerald-500/50 cursor-not-allowed" 
              : "bg-emerald-500 text-zinc-950 hover:bg-emerald-600"
          )}
        >
          {isGenerating ? (
            <span className="flex items-center gap-2"><div className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin"></div> {t.generating}</span>
          ) : (
            <><Zap size={20} /> {t.generateBtn}</>
          )}
        </button>
      </div>

      <AnimatePresence>
        {generatedContent && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-[#09090b] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-[#121214]/50 backdrop-blur-xl shrink-0 pt-safe-top">
              <h2 className="font-bold text-lg text-zinc-900 dark:text-white truncate pr-4">
                {topic || 'Resultado'}
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleToggleFavorite}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-rose-500 dark:hover:text-rose-500 transition-colors"
                >
                  <Heart size={20} className={generatedContent.isFavorite ? "fill-rose-500 text-rose-500" : ""} />
                </button>
                <button 
                  onClick={() => setGeneratedContent(null)}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <div className="text-zinc-950 dark:text-zinc-100 text-base md:text-lg whitespace-pre-wrap leading-relaxed font-medium tracking-wide">
                  {generatedContent.text}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-[#121214]/50 backdrop-blur-xl shrink-0 pb-safe">
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleCopy}
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Copy size={18} /> {t.copy}
                </button>
                <button 
                  onClick={handleExportPDF}
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Download size={18} /> PDF
                </button>
                <button 
                  onClick={handleShare}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <Share2 size={18} /> Compartilhar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function HistoryTab({ currentLanguage, setViewingContent }: any) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const filters = [
    t.all,
    t.genType1,
    t.genType2,
    t.genType3,
    t.genType4,
    t.genType5,
  ];
  const [activeFilter, setActiveFilter] = useState(t.all);
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const q = query(
      collection(db, 'generations'),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHistory(docs);
    }, (error: any) => {
      if (error.code !== 'permission-denied' && error.message !== 'Failed to fetch') {
        console.error("Error fetching history:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const filteredHistory = history.filter(item => {
    const matchesSearch = item.topic?.toLowerCase().includes(searchQuery.toLowerCase()) || item.content?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === t.all || item.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'generations', id), {
        isFavorite: !currentStatus
      });
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'generations', id));
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="pb-24 pt-8 px-4 max-w-lg mx-auto"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{t.historyTitle}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {t.historyDesc}
        </p>
      </div>

      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t.searchHistoryPlaceholder}
          className="w-full bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 pl-11 pr-4 text-zinc-900 dark:text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
        />
      </div>

      <div className="flex overflow-x-auto pb-4 mb-2 -mx-4 px-4 scrollbar-hide gap-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors",
              activeFilter === filter
                ? "bg-[#0f1c16] text-emerald-400 border border-emerald-900"
                : "bg-zinc-50 dark:bg-[#18181b] text-zinc-500 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800",
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredHistory.length === 0 ? (
          <div className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-10 mt-8 flex flex-col items-center justify-center text-center">
            <Clock className="text-zinc-700 mb-4" size={40} />
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t.noHistory}</p>
          </div>
        ) : (
          filteredHistory.map(item => (
            <div 
              key={item.id} 
              onClick={() => setViewingContent(item)}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm relative group cursor-pointer hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                  {item.type}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); handleToggleFavorite(item.id, item.isFavorite); }} className="p-2 text-zinc-400 hover:text-rose-500 transition-colors">
                    <Heart size={16} className={item.isFavorite ? "fill-rose-500 text-rose-500" : ""} />
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }} className="p-2 text-zinc-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{item.topic}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3">
                {item.content}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(item.content).then(() => alert("Copiado!"));
                }}
                className="mt-4 flex items-center gap-2 text-sm text-emerald-500 font-medium hover:text-emerald-400"
              >
                <Copy size={14} /> Copiar Conteúdo
              </button>
            </div>
          ))
        )}
      </div>
    </motion.div>
  );
}

function FavoritesTab({ currentLanguage, setViewingContent }: any) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    if (!auth.currentUser) return;
    
    const q = query(
      collection(db, 'generations'),
      where('userId', '==', auth.currentUser.uid),
      where('isFavorite', '==', true),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFavorites(docs);
    }, (error: any) => {
      if (error.code !== 'permission-denied' && error.message !== 'Failed to fetch') {
        console.error("Error fetching favorites:", error);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleToggleFavorite = async (id: string, currentStatus: boolean) => {
    try {
      await updateDoc(doc(db, 'generations', id), {
        isFavorite: !currentStatus
      });
    } catch (error) {
      console.error("Erro ao favoritar:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="pb-24 pt-8 px-4 max-w-lg mx-auto flex flex-col min-h-screen"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{t.favTitle}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {t.favDesc}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4 mt-12">
          <div className="bg-zinc-50 dark:bg-[#18181b] p-6 rounded-3xl mb-6">
            <Heart size={48} className="text-zinc-600" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{t.noFavTitle}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-[250px]">
            {t.noFavDesc}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {favorites.map(item => (
            <div 
              key={item.id} 
              onClick={() => setViewingContent(item)}
              className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 shadow-sm relative group cursor-pointer hover:border-emerald-500/50 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                  {item.type}
                </span>
                <div className="flex items-center gap-1">
                  <button onClick={(e) => { e.stopPropagation(); handleToggleFavorite(item.id, item.isFavorite); }} className="p-2 text-zinc-400 hover:text-rose-500 transition-colors">
                    <Heart size={16} className={item.isFavorite ? "fill-rose-500 text-rose-500" : ""} />
                  </button>
                </div>
              </div>
              <h3 className="font-bold text-zinc-900 dark:text-white mb-2">{item.topic}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm line-clamp-3">
                {item.content}
              </p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigator.clipboard.writeText(item.content).then(() => alert("Copiado!"));
                }}
                className="mt-4 flex items-center gap-2 text-sm text-emerald-500 font-medium hover:text-emerald-400"
              >
                <Copy size={14} /> Copiar Conteúdo
              </button>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}

function SettingsTab({ onViewChange, currentLanguage }: any) {
  const user = auth.currentUser;
  const { theme, toggleTheme } = useTheme();
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = async () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 256;
        const MAX_HEIGHT = 256;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
          
          try {
            await updateProfile(user, { photoURL: dataUrl });
            await updateDoc(doc(db, 'users', user.uid), { photoURL: dataUrl });
          } catch (error) {
            console.error("Error updating profile photo:", error);
          } finally {
            setIsUploading(false);
          }
        }
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleLogout = async () => {
    try {
      await logout();
      onViewChange("home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="pb-24 pt-8 px-4 max-w-lg mx-auto"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{t.settingsTitle}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-sm">{t.settingsDesc}</p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-2">
            {t.profile}
          </h2>
          <button 
            onClick={() => setShowProfileModal(true)}
            className="w-full bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-4 flex items-center gap-4 text-left transition-colors hover:bg-zinc-50 dark:hover:bg-[#1f1f22]"
          >
            <div className="w-16 h-16 rounded-2xl bg-emerald-500 flex items-center justify-center text-zinc-950 shrink-0">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <User size={32} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-zinc-900 dark:text-white text-lg truncate">
                {user?.displayName || "Criador"}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm truncate">{user?.email}</p>
            </div>
          </button>
        </div>

        <div className="bg-emerald-50 dark:bg-[#0f1c16] border border-emerald-200 dark:border-emerald-900/50 rounded-3xl p-5 relative overflow-hidden transition-colors duration-300">
          <div className="flex items-center justify-between mb-6 relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 p-2.5 rounded-xl">
                <Crown size={24} />
              </div>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-white text-base">
                  {t.freePlan}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-xs">
                  {t.upgradeToPremium}
                </p>
              </div>
            </div>
            <div className="text-zinc-500">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </div>
          </div>

          <div className="bg-emerald-100/50 dark:bg-[#12231c] rounded-2xl p-5 border border-emerald-200 dark:border-emerald-900/30 relative z-10 transition-colors duration-300">
            <h4 className="text-emerald-900 dark:text-emerald-50 text-sm font-bold flex items-center gap-2 mb-4">
              <Zap size={16} className="text-emerald-500 dark:text-emerald-400" fill="currentColor" />{" "}
              Creator AI Premium
            </h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                {t.premiumFeat1}
              </li>
              <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                {t.premiumFeat2}
              </li>
              <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                {t.premiumFeat3}
              </li>
              <li className="flex items-start gap-2 text-zinc-600 dark:text-zinc-300 text-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
                {t.premiumFeat4}
              </li>
            </ul>
            <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white dark:text-zinc-950 font-bold py-3 rounded-xl transition-colors">
              {t.comingSoon}
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-2">
            {t.appearance}
          </h2>
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-2 transition-colors duration-300">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 text-purple-600 dark:text-purple-400 bg-purple-500/10 rounded-xl">
                  <Moon size={20} />
                </div>
                <div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">
                    {t.darkTheme}
                  </div>
                  <div className="text-zinc-500 text-xs">
                    Toque para alternar
                  </div>
                </div>
              </div>
              <div
                onClick={toggleTheme}
                className={cn(
                  "w-12 h-6 rounded-full relative cursor-pointer transition-colors duration-200",
                  theme === "dark" ? "bg-emerald-500" : "bg-zinc-600"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200",
                    theme === "dark" ? "right-1" : "left-1"
                  )}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-2">
            Idioma
          </h2>
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-2 transition-colors duration-300">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="p-2 text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-xl">
                  <Globe size={20} />
                </div>
                <div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">
                    Idioma do App
                  </div>
                  <div className="text-zinc-500 text-xs">
                    Selecione o idioma da interface
                  </div>
                </div>
              </div>
              <select
                value={localStorage.getItem("preferredLanguage") || "Português"}
                onChange={(e) => {
                  localStorage.setItem("preferredLanguage", e.target.value);
                  window.location.reload();
                }}
                className="bg-zinc-100 dark:bg-[#09090b] text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-emerald-500"
              >
                <option value="Português">Português</option>
                <option value="English">English</option>
                <option value="Español">Español</option>
                <option value="Français">Français</option>
                <option value="Deutsch">Deutsch</option>
                <option value="Italiano">Italiano</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-2">
            Ajuda & Suporte
          </h2>
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-2 transition-colors duration-300 flex flex-col gap-2">
            <button onClick={() => setShowTerms(true)} className="flex items-center justify-between p-3 w-full text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 text-amber-600 dark:text-amber-400 bg-amber-500/10 rounded-xl">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">
                    Termos de Serviço
                  </div>
                </div>
              </div>
            </button>
            
            <button onClick={() => setShowPrivacy(true)} className="flex items-center justify-between p-3 w-full text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 text-rose-600 dark:text-rose-400 bg-rose-500/10 rounded-xl">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">
                    Política de Privacidade
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
        
        <div>
          <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3 pl-2">
            Sobre
          </h2>
          <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-2 transition-colors duration-300 flex flex-col gap-2">
            <button onClick={() => setShowAbout(true)} className="flex items-center justify-between p-3 w-full text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 rounded-2xl transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2 text-blue-600 dark:text-blue-400 bg-blue-500/10 rounded-xl">
                  <User size={20} />
                </div>
                <div>
                  <div className="text-zinc-900 dark:text-white font-medium text-sm">
                    Sobre Mim (Victor Mizael)
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 font-medium py-4 rounded-3xl flex items-center justify-center gap-2 transition-colors mt-8"
        >
          <LogOut size={18} /> {t.dashLogout}
        </button>
      </div>

      <AnimatePresence>
        {showProfileModal && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 pt-safe-top">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Perfil</h2>
              <button onClick={() => setShowProfileModal(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center pt-12">
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handlePhotoChange} 
                accept="image/*" 
                className="hidden" 
              />
              <button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="w-32 h-32 rounded-full bg-emerald-500 flex items-center justify-center text-zinc-950 relative overflow-hidden group hover:opacity-90 transition-opacity mb-4"
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={48} />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-white flex flex-col items-center">
                    <Edit2 size={24} className="mb-1" />
                  </div>
                </div>
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}
              </button>
              
              <h3 className="font-bold text-zinc-900 dark:text-white text-xl mb-1">
                {user?.displayName || "Criador"}
              </h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-sm">{user?.email}</p>
            </div>
          </motion.div>
        )}

        {showTerms && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 pt-safe-top">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Termos de Serviço</h2>
              <button onClick={() => setShowTerms(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose dark:prose-invert prose-zinc max-w-none text-sm space-y-4">
                <h3 className="font-bold text-lg">1. Aceitação dos Termos</h3>
                <p>Ao acessar e utilizar o aplicativo Creator AI, você concorda em cumprir e estar vinculado a estes Termos de Serviço. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossa plataforma.</p>
                <h3 className="font-bold text-lg">2. Uso da Plataforma</h3>
                <p>O Creator AI fornece ferramentas baseadas em inteligência artificial para auxiliar criadores de conteúdo na geração de textos, roteiros e legendas. O uso das ferramentas deve ser feito de maneira ética e em conformidade com as leis aplicáveis.</p>
                <h3 className="font-bold text-lg">3. Contas de Usuário</h3>
                <p>Para acessar certas funcionalidades, você deve criar uma conta. Você é responsável por manter a confidencialidade de suas credenciais de login e por todas as atividades que ocorrem sob sua conta.</p>
                <h3 className="font-bold text-lg">4. Geração de Conteúdo e Propriedade</h3>
                <p>O conteúdo gerado através do Creator AI utilizando inteligência artificial pertence ao usuário. No entanto, o Creator AI não garante a originalidade, precisão ou adequação do conteúdo gerado para fins específicos, cabendo ao usuário revisar e adaptar o conteúdo antes de sua publicação.</p>
                <h3 className="font-bold text-lg">5. Limitação de Responsabilidade</h3>
                <p>Em nenhuma circunstância o Creator AI ou seus fundadores serão responsabilizados por quaisquer danos diretos, indiretos, incidentais ou consequentes resultantes do uso ou da incapacidade de usar o serviço.</p>
                <h3 className="font-bold text-lg">6. Modificações dos Termos</h3>
                <p>Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após sua publicação na plataforma. O uso contínuo do serviço constitui aceitação dos novos termos.</p>
              </div>
            </div>
          </motion.div>
        )}

        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 pt-safe-top">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Política de Privacidade</h2>
              <button onClick={() => setShowPrivacy(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose dark:prose-invert prose-zinc max-w-none text-sm space-y-4">
                <h3 className="font-bold text-lg">1. Informações que Coletamos</h3>
                <p>Coletamos informações que você nos fornece diretamente, como nome, endereço de e-mail, foto de perfil (quando aplicável) e os dados inseridos nas solicitações de geração de conteúdo para fins de prestação do serviço.</p>
                <h3 className="font-bold text-lg">2. Como Usamos suas Informações</h3>
                <p>Utilizamos suas informações para criar e gerenciar sua conta, fornecer e personalizar os serviços do Creator AI, processar suas solicitações de geração de conteúdo e enviar comunicações importantes sobre atualizações ou suporte.</p>
                <h3 className="font-bold text-lg">3. Compartilhamento de Dados</h3>
                <p>Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros para fins de marketing. Seus dados podem ser processados através de provedores de infraestrutura seguros (como Firebase e OpenAI/Google AI) estritamente para a operação da plataforma.</p>
                <h3 className="font-bold text-lg">4. Armazenamento e Segurança</h3>
                <p>Implementamos medidas de segurança padrão da indústria para proteger suas informações contra acesso não autorizado, alteração, divulgação ou destruição. Seus históricos e conteúdos gerados são armazenados de forma segura e atrelados unicamente à sua conta.</p>
                <h3 className="font-bold text-lg">5. Seus Direitos</h3>
                <p>Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento. Você pode gerenciar seus dados diretamente pelas configurações da conta ou contatando o suporte.</p>
                <h3 className="font-bold text-lg">6. Uso de Cookies e Tecnologias Semelhantes</h3>
                <p>Utilizamos armazenamento local e cookies essenciais para manter sua sessão ativa, gerenciar preferências (como idioma e tema) e melhorar a experiência de navegação.</p>
              </div>
            </div>
          </motion.div>
        )}

        {showAbout && (
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[100] bg-white dark:bg-[#09090b] flex flex-col"
          >
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 pt-safe-top">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">Sobre Mim</h2>
              <button onClick={() => setShowAbout(false)} className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="prose dark:prose-invert prose-zinc max-w-none text-sm space-y-4">
                <h3 className="font-bold text-xl text-emerald-600 dark:text-emerald-400 mb-2">Olá! Sou Victor,</h3>
                <p>
                  Fundador desta plataforma e apaixonado por tecnologia, inovação e empreendedorismo digital.
                </p>
                <p>
                  Minha visão é desenvolver soluções que simplifiquem o dia a dia de criadores de conteúdo, oferecendo ferramentas práticas, acessíveis e eficientes para apoiar o planejamento, a produção e o crescimento nas principais plataformas digitais.
                </p>
                <p>
                  Acredito que a tecnologia deve eliminar barreiras e permitir que os criadores concentrem seu tempo no que realmente importa: criar conteúdo de qualidade e expandir sua audiência. Por isso, cada ferramenta disponibilizada aqui é desenvolvida com foco em simplicidade, desempenho e experiência do usuário.
                </p>
                <p>
                  Este projeto representa o primeiro passo de uma missão maior: construir uma empresa de tecnologia dedicada ao desenvolvimento de produtos que impulsionem a Creator Economy e gerem impacto positivo para milhões de criadores ao redor do mundo.
                </p>
                <p className="font-medium pt-4">
                  Obrigado por visitar a plataforma e fazer parte desta jornada de inovação e crescimento.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Main Dashboard Component ---

import { translations } from "../lib/i18n";
import { motion, AnimatePresence } from "framer-motion";

function ContentViewerModal({ content, onClose, t }: any) {
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  if (!localContent) return null;

  const handleToggleLocalFavorite = async () => {
    try {
      const newFavoriteState = !localContent.isFavorite;
      setLocalContent({ ...localContent, isFavorite: newFavoriteState });
      await updateDoc(doc(db, 'generations', localContent.id), {
        isFavorite: newFavoriteState
      });
    } catch (error) {
      console.error("Erro ao favoritar:", error);
      setLocalContent({ ...localContent, isFavorite: !localContent.isFavorite });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(localContent.content || localContent.text);
    alert('Conteúdo copiado!');
  };

  const handleExportPDF = () => {
      const pdfDoc = new jsPDF();
      const margin = 10;
      const pageWidth = pdfDoc.internal.pageSize.getWidth();
      const textWidth = pageWidth - margin * 2;
      
      pdfDoc.setFont("helvetica", "bold");
      pdfDoc.setFontSize(16);
      pdfDoc.text(localContent.topic || 'Conteúdo Gerado', margin, 20);
      
      pdfDoc.setFont("helvetica", "normal");
      pdfDoc.setFontSize(12);
      
      const splitText = pdfDoc.splitTextToSize(localContent.content || localContent.text, textWidth);
      pdfDoc.text(splitText, margin, 35);
      
      pdfDoc.save(`${localContent.topic ? localContent.topic.substring(0, 20) : 'conteudo'}.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: localContent.topic || 'Conteúdo Gerado',
          text: localContent.content || localContent.text,
        });
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Erro ao compartilhar:', err);
        }
      }
    } else {
      handleCopy();
    }
  };

  return (
      <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-zinc-50 dark:bg-[#09090b] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-[#121214]/50 backdrop-blur-xl shrink-0 pt-safe-top">
              <h2 className="font-bold text-lg text-zinc-900 dark:text-white truncate pr-4">
                {localContent.topic || 'Resultado'}
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleToggleLocalFavorite}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-rose-500 dark:hover:text-rose-500 transition-colors"
                >
                  <Heart size={20} className={localContent.isFavorite ? "fill-rose-500 text-rose-500" : ""} />
                </button>
                <button 
                  onClick={onClose}
                  className="p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
                <div className="text-zinc-950 dark:text-zinc-100 text-base md:text-lg whitespace-pre-wrap leading-relaxed font-medium tracking-wide">
                  {localContent.content || localContent.text}
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-white dark:bg-[#121214] border-t border-zinc-200 dark:border-zinc-800 shrink-0 pb-safe-bottom">
              <div className="flex gap-2 max-w-md mx-auto">
                <button
                  onClick={handleCopy}
                  className="flex-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95"
                >
                  <Copy size={18} />
                  Copiar
                </button>
                
                <button
                  onClick={handleExportPDF}
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                >
                  <Download size={18} />
                  PDF
                </button>

                <button
                  onClick={handleShare}
                  className="flex-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white py-3.5 px-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all active:scale-95"
                >
                  <Share2 size={18} />
                  Compartilhar
                </button>
              </div>
            </div>
          </motion.div>
      </AnimatePresence>
  );
}

import { AdminTab } from "../components/AdminTab";

export function Dashboard({ onViewChange }: any) {
  const [activeTab, setActiveTab] = useState("home");
  const [viewingContent, setViewingContent] = useState<any>(null);
  const [selectedType, setSelectedType] = useState(() => {
    const currentLang = localStorage.getItem("preferredLanguage") || "Português";
    const t = translations[currentLang as keyof typeof translations] || translations["Português"];
    return t.genType1;
  });
  
  const currentLanguage = localStorage.getItem("preferredLanguage") || "Português";
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];

  const isAdmin = auth.currentUser?.email?.toLowerCase() === 'victormizael09@gmail.com';

  const baseTabs = [
    { id: "home", label: t.dashHome, icon: LayoutDashboard },
    { id: "create", label: t.dashCreate, icon: Sparkles },
    { id: "history", label: t.dashHistory, icon: Clock },
    { id: "favorites", label: t.dashFav, icon: Heart },
    { id: "settings", label: t.dashConfig, icon: Settings },
  ];

  const tabs = isAdmin 
    ? [...baseTabs, { id: "admin", label: "Admin", icon: ShieldAlert }] 
    : baseTabs;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-[#09090b] dark:text-zinc-50 font-sans relative transition-colors duration-300"
    >
      <div className="h-full overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <HomeTab
              key="home"
              setActiveTab={setActiveTab}
              setSelectedType={setSelectedType}
              currentLanguage={currentLanguage}
              setViewingContent={setViewingContent}
            />
          )}
          {activeTab === "create" && (
            <CreateTab
              key="create"
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              setActiveTab={setActiveTab}
              currentLanguage={currentLanguage}
            />
          )}
          {activeTab === "history" && <HistoryTab key="history" currentLanguage={currentLanguage} setViewingContent={setViewingContent} />}
          {activeTab === "favorites" && <FavoritesTab key="favorites" currentLanguage={currentLanguage} setViewingContent={setViewingContent} />}
          {activeTab === "settings" && (
            <SettingsTab key="settings" onViewChange={onViewChange} currentLanguage={currentLanguage} />
          )}
          {activeTab === "admin" && isAdmin && (
            <AdminTab key="admin" />
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 w-full bg-white/90 dark:bg-[#121214]/90 backdrop-blur-xl border-t border-zinc-200 dark:border-zinc-800/50 pb-safe pt-2 px-2 z-50 transition-colors duration-300">
        <div className="flex justify-between max-w-lg mx-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <div key={tab.id} className="relative flex flex-col items-center justify-center w-16 h-14">
                {tab.id === 'settings' && !isAdmin && (
                  <div className="absolute bottom-full mb-4 z-50">
                    <SupportChat isAdminView={false} />
                  </div>
                )}
                {tab.id === 'admin' && isAdmin && (
                  <div className="absolute bottom-full mb-4 z-50">
                    <SupportChat isAdminView={false} />
                  </div>
                )}
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center justify-center w-full h-full relative"
                >
                {isActive && (
                  <div className="absolute -top-3 w-12 h-1 bg-emerald-500 rounded-b-md shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                )}
                <div
                  className={cn(
                    "p-1.5 rounded-xl mb-1 transition-all",
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400"
                      : "text-zinc-500 hover:text-zinc-600 dark:text-zinc-300",
                  )}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span
                  className={cn(
                    "text-[10px] font-medium transition-colors",
                    isActive ? "text-emerald-400" : "text-zinc-500",
                  )}
                >
                  {tab.label}
                </span>
              </button>
            </div>
            );
          })}
        </div>
      </div>
      
      {viewingContent && (
        <ContentViewerModal 
          content={viewingContent} 
          onClose={() => setViewingContent(null)} 
          t={t} 
        />
      )}
    </motion.div>
  );
}
