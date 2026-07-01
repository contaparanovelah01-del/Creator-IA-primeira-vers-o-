import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp, doc, updateDoc, writeBatch } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { MessageCircle, X, Send, Check, CheckCheck } from "lucide-react";
import { translations } from "../lib/i18n";

interface SupportChatProps {
  userId?: string;
  isAdminView?: boolean;
}

export function SupportChat({ userId, isAdminView }: SupportChatProps) {
  const preferredLanguage = localStorage.getItem("preferredLanguage") || "Português";
  const t = translations[preferredLanguage as keyof typeof translations] || translations["Português"];

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(auth.currentUser?.uid);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUserId(user?.uid);
    });
    return () => unsubscribe();
  }, []);

  const targetUserId = isAdminView ? userId : currentUserId;

  useEffect(() => {
    if (!targetUserId) return;

    const q = query(
      collection(db, 'messages'),
      where('userId', '==', targetUserId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by createdAt ascending in memory
      docs.sort((a: any, b: any) => {
        const timeA = a.createdAt?.toMillis?.() || 0;
        const timeB = b.createdAt?.toMillis?.() || 0;
        return timeA - timeB;
      });
      setMessages(docs);
      
      const unread = docs.filter((msg: any) => {
        if (isAdminView) {
          return msg.sender === 'user' && !msg.read;
        }
        return msg.sender === 'support' && !msg.read;
      });
      setUnreadCount(unread.length);
    }, (error: any) => {
      console.error("Error fetching messages:", error);
    });

    return () => unsubscribe();
  }, [targetUserId, isAdminView]);

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      markAsRead();
    }
  }, [messages, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const markAsRead = async () => {
    if (!isOpen || !targetUserId) return;
    
    const unreadMessages = messages.filter(msg => {
      if (isAdminView) return msg.sender === 'user' && !msg.read;
      return msg.sender === 'support' && !msg.read;
    });

    if (unreadMessages.length === 0) return;

    try {
      const batch = writeBatch(db);
      unreadMessages.forEach(msg => {
        batch.update(doc(db, 'messages', msg.id), { read: true });
      });
      await batch.commit();
    } catch (error) {
      console.error("Error marking messages as read", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !targetUserId) return;

    const messageText = newMessage.trim();
    setNewMessage("");

    try {
      await addDoc(collection(db, 'messages'), {
        userId: targetUserId,
        text: messageText,
        sender: isAdminView ? 'support' : 'user',
        createdAt: serverTimestamp(),
        read: false
      });
    } catch (error: any) {
      console.error("Error sending message", error);
      alert("Error: " + error.message);
    }
  };

  return (
    <>
      <div 
        className="relative flex items-center justify-center"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center justify-center rounded-full bg-emerald-500 text-zinc-950 shadow-lg hover:bg-emerald-400 transition-colors ${isAdminView ? 'w-10 h-10' : 'w-14 h-14'}`}
        >
          <MessageCircle size={isAdminView ? 20 : 28} />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center pointer-events-none">
              {unreadCount}
            </span>
          )}
        </button>

        {isAdminView ? (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="support-chat-admin"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                className="absolute mb-4 bg-white dark:bg-[#18181b] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl flex flex-col overflow-hidden cursor-default w-80 h-96 z-50"
                style={{ bottom: 'auto', right: '100%', top: '0', marginRight: '10px' }}
              >
                <div className="bg-emerald-500 p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-zinc-950">{t.supportTitle}</h3>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="text-zinc-950 hover:bg-emerald-600 p-1 rounded-full transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 dark:bg-[#09090b]">
                  {messages.length === 0 ? (
                    <div className="text-center text-zinc-500 text-sm mt-10">
                      {t.noContentYet}
                    </div>
                  ) : (
                    messages.map((msg, index) => {
                      const isMine = msg.sender === 'support';
                      return (
                        <div key={msg.id || index} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[80%] rounded-2xl p-3 ${isMine ? 'bg-emerald-500 text-zinc-950 rounded-tr-sm' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-tl-sm'}`}>
                            <p className="text-sm">{msg.text}</p>
                            <div className={`text-[10px] flex items-center justify-end gap-1 mt-1 ${isMine ? 'text-zinc-800' : 'text-zinc-500'}`}>
                              <span>
                                {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                              </span>
                              {isMine && (
                                <span className="ml-1">
                                  {msg.read ? <CheckCheck size={14} className="text-blue-600" /> : <Check size={14} className="text-zinc-600" />}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="p-3 bg-white dark:bg-[#18181b] border-t border-zinc-200 dark:border-zinc-800 pb-safe pb-4">
                  <form onSubmit={sendMessage} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder={t.chatPlaceholder}
                      className="flex-1 bg-zinc-100 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim()}
                      className="w-10 h-10 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        ) : (
          createPortal(
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  key="support-chat-user"
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="fixed inset-0 z-[9999] bg-white dark:bg-[#18181b] flex flex-col cursor-default"
                >
                  <div className="bg-emerald-500 p-4 pt-safe-top flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-zinc-950">{t.supportTitle}</h3>
                      <p className="text-xs text-zinc-800">{t.supportSub}</p>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-zinc-950 hover:bg-emerald-600 p-1 rounded-full transition-colors">
                      <X size={20} />
                    </button>
                  </div>

                  <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50 dark:bg-[#09090b]">
                    {messages.length === 0 ? (
                      <div className="text-center text-zinc-500 text-sm mt-10">
                        {t.noContentYet}
                      </div>
                    ) : (
                      messages.map((msg, index) => {
                        const isMine = msg.sender === 'user';
                        return (
                          <div key={msg.id || index} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl p-3 ${isMine ? 'bg-emerald-500 text-zinc-950 rounded-tr-sm' : 'bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-tl-sm'}`}>
                              <p className="text-sm">{msg.text}</p>
                              <div className={`text-[10px] flex items-center justify-end gap-1 mt-1 ${isMine ? 'text-zinc-800' : 'text-zinc-500'}`}>
                                <span>
                                  {msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                                </span>
                                {isMine && (
                                  <span className="ml-1">
                                    {msg.read ? <CheckCheck size={14} className="text-blue-600" /> : <Check size={14} className="text-zinc-600" />}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="p-3 bg-white dark:bg-[#18181b] border-t border-zinc-200 dark:border-zinc-800 pb-safe pb-4">
                    <form onSubmit={sendMessage} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder={t.chatPlaceholder}
                        className="flex-1 bg-zinc-100 dark:bg-[#09090b] border border-zinc-200 dark:border-zinc-800 rounded-full px-4 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:border-emerald-500 transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={!newMessage.trim()}
                        className="w-10 h-10 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center hover:bg-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shrink-0"
                      >
                        <Send size={18} />
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        )}
      </div>
    </>
  );
}
