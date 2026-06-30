import { useState, useEffect } from "react";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { MobileMenu } from "./components/MobileMenu";
import { onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { doc, setDoc, serverTimestamp, updateDoc, onSnapshot } from "firebase/firestore";
import { auth, db } from "./lib/firebase";
import { AnimatePresence, motion } from "framer-motion";
import { translations } from "./lib/i18n";
import { SupportChat } from "./components/SupportChat";
import { AlertTriangle, LogOut, Mail } from "lucide-react";

function VerifyEmailScreen({ onLogout, onResend, onCheck }: { onLogout: () => void, onResend: () => void, onCheck: () => Promise<void> }) {
  const [resending, setResending] = useState(false);
  const [sent, setSent] = useState(false);
  const [checking, setChecking] = useState(false);
  
  const handleResend = async () => {
    setResending(true);
    try {
      await onResend();
      setSent(true);
    } catch (e) {
      console.error(e);
    }
    setResending(false);
  };

  const handleCheck = async () => {
    setChecking(true);
    try {
      await onCheck();
    } catch (e) {
      console.error(e);
    }
    setChecking(false);
  };
  
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4">
      <div className="bg-[#18181b] border border-zinc-800 p-8 rounded-2xl max-w-md w-full text-center">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-emerald-500" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Verifique seu e-mail</h2>
        <p className="text-zinc-400 mb-2">
          Enviamos um link de verificação para o seu e-mail. Para ativar sua conta, você precisa clicar neste link.
        </p>
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-xl mb-8 text-sm font-medium">
          ⚠️ Importante: Caso não encontre na caixa de entrada principal, verifique sua pasta de SPAM ou Lixo Eletrônico.
        </div>
        <button
          onClick={handleCheck}
          disabled={checking}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold py-3 px-4 rounded-xl transition-colors mb-4 disabled:opacity-50"
        >
          {checking ? "Verificando..." : "Já verifiquei"}
        </button>
        <button
          onClick={handleResend}
          disabled={resending || sent}
          className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors mb-4 disabled:opacity-50"
        >
          {sent ? "E-mail reenviado!" : (resending ? "Enviando..." : "Reenviar e-mail")}
        </button>
        <button
          onClick={onLogout}
          className="text-zinc-500 hover:text-white transition-colors text-sm"
        >
          Sair da Conta
        </button>
      </div>
      <SupportChat isAdminView={false} />
    </div>
  );
}

function BannedScreen({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-4">
      <div className="bg-[#18181b] border border-red-500/20 p-8 rounded-2xl max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="text-red-500" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-white mb-4">Conta Suspensa</h2>
        <p className="text-zinc-400 mb-8">
          Contate o suporte pra ver oq aconteceu com sua conta. Você pode usar o botão de suporte no canto da tela para falar com um administrador. Espere até a resposta do suporte, caso houver engano sua conta será desbanida.
        </p>
        <button
          onClick={onLogout}
          className="flex items-center justify-center gap-2 w-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          Sair da Conta
        </button>
      </div>
      <SupportChat isAdminView={false} />
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isBanned, setIsBanned] = useState(false);
  
  const [showLangModal, setShowLangModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState("Português");

  useEffect(() => {
    const hasSelectedLang = localStorage.getItem("hasSelectedLanguage");
    const preferredLang = localStorage.getItem("preferredLanguage");
    if (preferredLang) {
      setSelectedLang(preferredLang);
    }
    if (!hasSelectedLang) {
      setShowLangModal(true);
    }
  }, []);

  useEffect(() => {
    let intervalId: any;
    let unsubUser: any;
    
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        if (!user.emailVerified) {
          setCurrentView("verify-email");
        } else {
          setCurrentView("dashboard");
        }
        
        // Update user status to online
        const userRef = doc(db, 'users', user.uid);
        try {
          await setDoc(userRef, {
            email: user.email,
            displayName: user.displayName || user.email?.split('@')[0],
            photoURL: user.photoURL || '',
            lastSeen: serverTimestamp(),
            isOnline: true,
            plan: 'free',
            createdAt: user.metadata.creationTime,
          }, { merge: true });
        } catch (error: any) {
          if (error.code !== 'permission-denied') {
            console.error("Error setting user doc:", error);
          }
        }
        
        // Listen for ban
        unsubUser = onSnapshot(userRef, (docSnap) => {
          if (docSnap.exists()) {
            setIsBanned(!!docSnap.data().banned);
          }
        }, (error: any) => {
          if (error.code !== 'permission-denied' && error.message !== 'Failed to fetch') {
            console.error("Error listening to user ban status:", error);
          }
        });

        intervalId = setInterval(async () => {
          try {
            await updateDoc(userRef, {
              lastSeen: serverTimestamp(),
              isOnline: true
            });
          } catch (error) {}
        }, 60000); // Update every minute
        
      } else {
        if (intervalId) clearInterval(intervalId);
        if (unsubUser) unsubUser();
        if (currentView === "dashboard") {
          setCurrentView("home");
        }
      }
      setLoading(false);
    });
    
    const handleBeforeUnload = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, 'users', user.uid);
          await updateDoc(userRef, {
            lastSeen: serverTimestamp(),
            isOnline: false
          });
        } catch (error) {}
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      unsubscribe();
      if (intervalId) clearInterval(intervalId);
      if (unsubUser) unsubUser();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [currentView]);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  };

  const handleLangContinue = () => {
    localStorage.setItem("hasSelectedLanguage", "true");
    localStorage.setItem("preferredLanguage", selectedLang);
    setShowLangModal(false);
    // Reload to apply language everywhere if needed, or just let state handle it.
    // For simplicity, dispatch an event or just reload, but our Home handles local storage on mount.
    // A quick reload makes sure it applies perfectly everywhere immediately.
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <>
      <AnimatePresence>
        {showLangModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center p-4"
          >
            <div className="max-w-md w-full bg-[#18181b] p-8 rounded-2xl border border-zinc-800 text-center">
              <h2 className="text-2xl font-bold text-white mb-2">Bem-vindo / Welcome</h2>
              <p className="text-zinc-400 mb-8">Selecione seu idioma para continuar</p>
              
              <div className="flex flex-col gap-3 mb-8">
                {Object.keys(translations).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`w-full py-3 px-4 rounded-xl text-left font-medium transition-colors ${
                      selectedLang === lang
                        ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30"
                        : "bg-[#09090b] text-zinc-300 border border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={handleLangContinue}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold py-3 px-4 rounded-xl transition-colors"
              >
                Continuar / Continue
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {currentView === "home" && (
          <Home
            key="home"
            onViewChange={handleViewChange}
            onMenuClick={() => setIsMenuOpen(true)}
          />
        )}
        {currentView === "login" && (
          <Login key="login" onViewChange={handleViewChange} />
        )}
        {currentView === "signup" && (
          <Signup key="signup" onViewChange={handleViewChange} />
        )}
        {currentView === "verify-email" && (
          <motion.div key="verify-email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <VerifyEmailScreen 
              onLogout={() => auth.signOut()} 
              onResend={() => auth.currentUser && sendEmailVerification(auth.currentUser)} 
              onCheck={async () => {
                if (auth.currentUser) {
                  await auth.currentUser.reload();
                  if (auth.currentUser.emailVerified) {
                    window.location.reload(); // Hard reload to reset state properly
                  } else {
                    alert("Seu e-mail ainda não foi verificado. Verifique também a pasta de spam (Lixo Eletrônico).");
                  }
                }
              }}
            />
          </motion.div>
        )}
        {currentView === "dashboard" && isBanned && (
          <motion.div key="banned" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <BannedScreen onLogout={() => auth.signOut()} />
          </motion.div>
        )}
        {currentView === "dashboard" && !isBanned && (
          <Dashboard key="dashboard" onViewChange={handleViewChange} />
        )}
      </AnimatePresence>

      {currentView !== "dashboard" && (
        <MobileMenu
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
          onViewChange={handleViewChange}
        />
      )}
    </>
  );
}
