import { Zap, Mail, Lock, ArrowLeft, User } from "lucide-react";
import { signInWithGoogle, signUpWithEmail } from "../lib/firebase";
import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { translations } from "../lib/i18n";

export function Signup({ onViewChange }: any) {
  const currentLanguage = localStorage.getItem("preferredLanguage") || "Português";
  const t = translations[currentLanguage as keyof typeof translations] || translations["Português"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      onViewChange("dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmailSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    setIsLoading(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      await signUpWithEmail(email, password, fullName);
      onViewChange("dashboard");
    } catch (err: any) {
      if (err.code === "auth/operation-not-allowed") {
        setError("Login com e-mail e senha não está habilitado no Firebase. Habilite-o na aba Authentication do console do Firebase ou use o login com Google.");
      } else if (err.code === "auth/email-already-in-use") {
        setError("Este e-mail já está em uso.");
      } else {
        setError(err.message || "Erro ao criar conta.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 font-sans relative"
    >
      <div className="absolute top-0 left-0 w-full p-4 sm:p-8">
        <button
          onClick={() => onViewChange("home")}
          className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:text-white transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          <span>{t.back}</span>
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div
          className="flex justify-center mb-6 cursor-pointer"
          onClick={() => onViewChange("home")}
        >
          <div className="bg-emerald-500 p-3 rounded-2xl text-zinc-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
            <Zap size={32} fill="currentColor" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-2 tracking-tight">
          {t.createAccount}
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-center mb-8">
          {t.signupDesc}
        </p>

        <div className="w-full max-w-[400px] bg-zinc-50 dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <button
            onClick={handleGoogleSignIn}
            type="button"
            className="w-full bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold rounded-xl py-3.5 flex items-center justify-center gap-3 transition-all mb-6"
          >
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            {t.continueWithGoogle}
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-zinc-800"></div>
            <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
              {t.or}
            </span>
            <div className="flex-1 h-px bg-zinc-800"></div>
          </div>

          <form className="space-y-4" onSubmit={handleEmailSignUp}>
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 text-red-500 text-sm p-3 rounded-xl mb-4">
                {error}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 dark:text-white">{t.firstName}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-transparent border border-emerald-500/50 rounded-xl py-3 pl-10 pr-3 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                    placeholder="Primeiro nome"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 dark:text-white">
                  {t.lastName}
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-transparent border border-emerald-500/50 rounded-xl py-3 px-4 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all text-sm"
                  placeholder="Sobrenome"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 dark:text-white">E-mail</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-emerald-500/50 rounded-xl py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 dark:text-white">{t.password}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 dark:text-white">
                {t.confirmPassword}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 rounded-xl py-3.5 pl-11 pr-4 text-zinc-900 dark:text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-emerald-400 hover:bg-emerald-500 text-zinc-950 font-bold rounded-xl px-4 py-4 transition-colors mt-6 disabled:opacity-50"
            >
              {isLoading ? t.creating : t.createAccount}
            </button>
          </form>
        </div>

        <div className="mt-8 text-center text-sm text-zinc-500 dark:text-zinc-400">
          {t.alreadyHaveAccount}{" "}
          <button
            onClick={() => onViewChange("login")}
            className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors"
          >
            {t.enter}
          </button>
        </div>

        <div className="mt-6 text-xs text-zinc-600">
          Creator AI — Conteúdo viral com IA
        </div>
      </div>
    </motion.div>
  );
}
