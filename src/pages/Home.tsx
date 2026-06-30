import { useState } from "react";
import {
  Sparkles,
  Zap,
  ArrowRight,
  Lightbulb,
  PenTool,
  Type,
  FileText,
  Hash,
  TrendingUp,
  Star,
  ArrowDown,
  Menu,
  Globe,
} from "lucide-react";
import { motion } from "framer-motion";

import { translations } from "../lib/i18n";

function Header({ onMenuClick, onViewChange, currentLanguage, onLanguageChange }: any) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  
  return (
    <header className="sticky top-0 z-50 bg-zinc-50 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => onViewChange("home")}
        >
          <div className="bg-emerald-500 p-1.5 rounded-lg text-zinc-950">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="font-bold text-xl tracking-tight">Creator AI</span>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button
            onClick={() => onViewChange("login")}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white font-medium transition-colors"
          >
            {t.login}
          </button>
          <button
            onClick={() => onViewChange("signup")}
            className="bg-emerald-500 hover:bg-emerald-600 text-zinc-950 px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            {t.startFree}
          </button>
        </div>

        <button
          className="md:hidden text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:text-white p-1"
          onClick={onMenuClick}
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

function HeroSection({ onViewChange, currentLanguage }: any) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  
  return (
    <section className="pt-20 pb-16 px-4 max-w-6xl mx-auto flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 text-sm rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-8"
      >
        <Sparkles size={16} />
        <span className="font-medium">{t.poweredBy}</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl leading-tight"
        dangerouslySetInnerHTML={{ __html: t.heroTitle.replace("viral", "<span class='text-emerald-400'>viral</span>") }}
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-10 max-w-2xl leading-relaxed"
      >
        {t.heroDesc}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-md mx-auto mb-6"
      >
        <button
          onClick={() => onViewChange("signup")}
          className="w-full sm:flex-1 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold rounded-xl px-6 py-4 flex items-center justify-center gap-2 transition-all"
        >
          <Zap size={20} fill="currentColor" />
          {t.startFree}
        </button>
        <button
          onClick={() => onViewChange("login")}
          className="w-full sm:flex-1 bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold rounded-xl px-6 py-4 flex items-center justify-center gap-2 transition-all"
        >
          {t.login}
          <ArrowRight size={20} />
        </button>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-sm text-zinc-500 mb-16"
      >
        {t.noCreditCard}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="w-full max-w-3xl mx-auto bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 md:p-6 text-left shadow-2xl shadow-emerald-500/5"
      >
        <div className="flex items-center gap-2 mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
          </div>
          <div className="ml-4 text-sm text-zinc-500 font-medium">
            {t.mockPlatformTitle}
          </div>
        </div>

        <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mb-4 flex items-start gap-3">
          <Sparkles className="text-emerald-400 mt-1" size={20} />
          <div>
            <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{t.mockThemeLabel}</div>
            <div className="font-medium text-zinc-900 dark:text-white">
              {t.mockTheme}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
            TikTok
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
            {t.mockType}
          </span>
          <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-sm font-medium border border-orange-500/20 flex items-center gap-1">
            🔥 {t.mockTone}
          </span>
        </div>

        <div className="bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4 font-semibold text-zinc-900 dark:text-white">
            <span>🎬</span> {t.mockContentTitle}
          </div>

          <div className="space-y-4 text-zinc-600 dark:text-zinc-300">
            <p>
              <span className="text-emerald-400 font-bold">{t.mockHook}</span> {t.mockHookText}
            </p>
            <p>
              <span className="text-emerald-400 font-bold">
                {t.mockBody}
              </span>{" "}
              {t.mockBodyText}
            </p>
            <p>
              <span className="text-emerald-400 font-bold">{t.mockCta}</span> {t.mockCtaText}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function FeaturesSection({ currentLanguage }: { currentLanguage: string }) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  
  const features = [
    {
      icon: <Lightbulb size={24} className="text-emerald-400" />,
      iconBg: "bg-emerald-500/10",
      title: t.fIdeias,
      desc: t.fIdeiasDesc,
    },
    {
      icon: <PenTool size={24} className="text-purple-400" />,
      iconBg: "bg-purple-500/10",
      title: t.fRoteiros,
      desc: t.fRoteirosDesc,
    },
    {
      icon: <Type size={24} className="text-orange-400" />,
      iconBg: "bg-orange-500/10",
      title: t.fTitulos,
      desc: t.fTitulosDesc,
    },
    {
      icon: <FileText size={24} className="text-blue-400" />,
      iconBg: "bg-blue-500/10",
      title: t.fDescricoes,
      desc: t.fDescricoesDesc,
    },
    {
      icon: <Hash size={24} className="text-pink-400" />,
      iconBg: "bg-pink-500/10",
      title: t.fHashtags,
      desc: t.fHashtagsDesc,
    },
    {
      icon: <TrendingUp size={24} className="text-cyan-400" />,
      iconBg: "bg-cyan-500/10",
      title: t.fPlataformas,
      desc: t.fPlataformasDesc,
    },
  ];

  return (
    <section id="funcionalidades" className="py-20 px-4 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.featuresTitle}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
          {t.featuresDesc}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 hover:border-zinc-300 dark:border-zinc-700 transition-colors"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${f.iconBg}`}
            >
              {f.icon}
            </div>
            <h3 className="text-xl font-semibold mb-3 text-zinc-900 dark:text-white">{f.title}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TonesSection({ currentLanguage }: { currentLanguage: string }) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const tones = [
    { emoji: "😂", text: t.tone1 },
    { emoji: "💼", text: t.tone2 },
    { emoji: "🔥", text: t.tone3 },
    { emoji: "📚", text: t.tone6 },
    { emoji: "📖", text: t.tone7 },
    { emoji: "💪", text: t.tone8 },
    { emoji: "✨", text: t.tone4 },
    { emoji: "🔮", text: t.tone5 },
    { emoji: "💖", text: t.tone9 },
    { emoji: "🎯", text: t.tone10 },
    { emoji: "📰", text: t.tone11 },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center border-t border-zinc-200 dark:border-zinc-800/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.tonesTitle}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10">
          {t.tonesDesc}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3">
        {tones.map((tone, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:border-zinc-700 transition-colors rounded-xl px-5 py-3 flex items-center gap-2 font-medium text-zinc-900 dark:text-white shadow-sm"
          >
            <span>{tone.emoji}</span>
            <span>{tone.text}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PlatformsSection({ currentLanguage }: { currentLanguage: string }) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const platforms = [
    { name: "TikTok", color: "text-pink-500" },
    { name: "Instagram", color: "text-orange-500", icon: true },
    { name: "YouTube", color: "text-red-500" },
    { name: "Facebook", color: "text-blue-500" },
    { name: "Kwai", color: "text-orange-600" },
    { name: "Threads", color: "text-zinc-900 dark:text-zinc-100" },
    { name: "X (Twitter)", color: "text-sky-400" },
  ];

  return (
    <section
      id="plataformas"
      className="py-20 px-4 max-w-4xl mx-auto text-center border-t border-zinc-200 dark:border-zinc-800/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.platformTitle}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-10">
          {t.platformDesc}
        </p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3">
        {platforms.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl px-5 py-3 flex items-center gap-2 font-semibold shadow-sm"
          >
            {p.icon && (
              <div className="w-2 h-2 rounded-full bg-orange-500"></div>
            )}
            <span className={p.color}>{p.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function HowItWorksSection({ currentLanguage }: { currentLanguage: string }) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  
  const steps = [
    {
      num: "1",
      title: t.step1Title,
      desc: t.step1Desc,
    },
    {
      num: "2",
      title: t.step2Title,
      desc: t.step2Desc,
    },
    {
      num: "3",
      title: t.step3Title,
      desc: t.step3Desc,
    },
  ];

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto border-t border-zinc-200 dark:border-zinc-800/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.howItWorksTitle}</h2>
      </motion.div>

      <div className="space-y-6">
        {steps.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col sm:flex-row sm:items-start gap-6"
          >
            <div className="w-12 h-12 shrink-0 rounded-full bg-emerald-500/10 text-emerald-400 font-bold text-xl flex items-center justify-center border border-emerald-500/20">
              {s.num}
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">{s.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection({ currentLanguage }: { currentLanguage: string }) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  
  const testimonials = [
    {
      text: t.testi1,
      name: "Ana S.",
      role: t.testi1Role,
    },
    {
      text: t.testi2,
      name: "Pedro M.",
      role: t.testi2Role,
    },
    {
      text: t.testi3,
      name: "Carla T.",
      role: t.testi3Role,
    },
  ];

  return (
    <section
      id="depoimentos"
      className="py-20 px-4 max-w-6xl mx-auto border-t border-zinc-200 dark:border-zinc-800/50"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t.testiTitle}
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col"
          >
            <div className="flex text-yellow-500 mb-6 gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={20}
                  fill="currentColor"
                  className="text-yellow-500"
                />
              ))}
            </div>
            <p className="text-zinc-600 dark:text-zinc-300 text-lg leading-relaxed mb-8 flex-1">
              {t.text}
            </p>
            <div>
              <div className="font-bold text-zinc-900 dark:text-white">{t.name}</div>
              <div className="text-zinc-500">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQSection({ currentLanguage }: { currentLanguage: string }) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: t.faq1Q,
      a: t.faq1A,
    },
    {
      q: t.faq2Q,
      a: t.faq2A,
    },
    {
      q: t.faq3Q,
      a: t.faq3A,
    },
    {
      q: (t as any).faq4Q,
      a: (t as any).faq4A,
    }
  ];

  return (
    <section
      id="faq"
      className="py-20 px-4 max-w-3xl mx-auto border-t border-zinc-200 dark:border-zinc-800/50"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-center"
      >
        {t.faqTitle}
      </motion.h2>

      <div className="space-y-4">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              className="bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span className="font-bold text-lg text-zinc-900 dark:text-white">{faq.q}</span>
                {isOpen ? (
                  <ArrowDown
                    size={20}
                    className="text-zinc-500 shrink-0 ml-4"
                  />
                ) : (
                  <ArrowRight
                    size={20}
                    className="text-zinc-500 shrink-0 ml-4"
                  />
                )}
              </button>

              {isOpen && (
                <div className="px-6 pb-5 text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {faq.a}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function CTASection({ onViewChange, currentLanguage }: any) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  return (
    <section className="py-24 px-4 border-t border-zinc-200 dark:border-zinc-800/50 flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
      >
        <Zap size={32} className="text-zinc-950" fill="currentColor" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6"
      >
        {t.ctaTitle}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-zinc-500 dark:text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10"
      >
        {t.ctaDesc}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.3 }}
        onClick={() => onViewChange("signup")}
        className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-bold text-lg rounded-xl px-8 py-5 flex items-center justify-center gap-2 mb-4 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      >
        <Zap size={22} fill="currentColor" />
        {t.startFree}
      </motion.button>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-sm text-zinc-500"
      >
        {t.noCreditCard}
      </motion.p>
    </section>
  );
}

function Footer({ onViewChange, currentLanguage }: any) {
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800/50 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="flex items-center gap-2 mb-6">
          <div className="bg-emerald-500 p-1.5 rounded-lg text-zinc-950">
            <Zap size={16} fill="currentColor" />
          </div>
          <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
            Creator AI
          </span>
        </div>

        <p className="text-zinc-500 text-sm mb-6 text-center">
          © 2026 Creator AI. {t.footerRights}
        </p>

        <div className="flex items-center gap-6 text-sm font-medium text-zinc-500 dark:text-zinc-400">
          <button
            onClick={() => onViewChange("login")}
            className="hover:text-zinc-900 dark:text-white transition-colors"
          >
            {t.login}
          </button>
          <button
            onClick={() => onViewChange("signup")}
            className="hover:text-zinc-900 dark:text-white transition-colors"
          >
            {t.startFree}
          </button>
        </div>
      </div>
    </footer>
  );
}

export function Home({ onViewChange, onMenuClick }: any) {
  const [currentLanguage, setCurrentLanguage] = useState(() => localStorage.getItem("preferredLanguage") || "Português");

  const handleLanguageChange = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem("preferredLanguage", lang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans selection:bg-emerald-500/30"
    >
      <Header onMenuClick={onMenuClick} onViewChange={onViewChange} currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
      <main>
        <HeroSection onViewChange={onViewChange} currentLanguage={currentLanguage} onLanguageChange={handleLanguageChange} />
        <FeaturesSection currentLanguage={currentLanguage} />
        <TonesSection currentLanguage={currentLanguage} />
        <PlatformsSection currentLanguage={currentLanguage} />
        <HowItWorksSection currentLanguage={currentLanguage} />
        <TestimonialsSection currentLanguage={currentLanguage} />
        <FAQSection currentLanguage={currentLanguage} />
        <CTASection onViewChange={onViewChange} currentLanguage={currentLanguage} />
      </main>
      <Footer onViewChange={onViewChange} currentLanguage={currentLanguage} />
    </motion.div>
  );
}
