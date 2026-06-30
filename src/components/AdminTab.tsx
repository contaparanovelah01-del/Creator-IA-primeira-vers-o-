import { useState, useEffect } from "react";
import { collection, query, where, getDocs, doc, updateDoc, orderBy, getCountFromServer, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db, auth } from "../lib/firebase";
import { motion } from "framer-motion";
import { Users, FileText, Ban, CheckCircle, Clock, Calendar, Activity, MessageCircle, Trash2 } from "lucide-react";
import { SupportChat } from "./SupportChat";

function UserListItem({ user, selectedUser, onClick, isUserOnline }: any) {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const q = query(
      collection(db, 'messages'),
      where('userId', '==', user.id),
      where('read', '==', false),
      where('sender', '==', 'user')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setUnreadCount(snapshot.docs.length);
    }, () => {});
    return () => unsubscribe();
  }, [user.id]);

  return (
    <div 
      onClick={onClick}
      className={`p-4 border-b border-zinc-200 dark:border-zinc-800 cursor-pointer transition-colors ${selectedUser?.id === user.id ? 'bg-zinc-100 dark:bg-zinc-800/50' : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/30'}`}
    >
      <div className="flex items-center gap-3">
        <div className="relative">
          {user.photoURL ? (
            <img src={user.photoURL} alt={user.displayName} className="w-10 h-10 rounded-full" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold">
              {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-[#18181b] ${isUserOnline(user) ? 'bg-green-500' : 'bg-zinc-500'}`}></div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-zinc-900 dark:text-white truncate flex items-center justify-between">
            <span className="flex-1 truncate">
              {user.displayName || 'Usuário'}
              {user.banned && <span className="ml-2 text-xs text-red-500 font-bold px-1.5 py-0.5 rounded bg-red-500/10">BANIDO</span>}
            </span>
            {unreadCount > 0 && (
               <div className="relative flex items-center justify-center ml-2">
                 <div className="w-6 h-6 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center">
                   <MessageCircle size={12} />
                 </div>
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full w-3.5 h-3.5 flex items-center justify-center pointer-events-none">
                   {unreadCount}
                 </span>
               </div>
            )}
          </div>
          <div className="text-xs text-zinc-500 truncate">{user.email}</div>
        </div>
      </div>
    </div>
  );
}

export function AdminTab() {
  const [users, setUsers] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGenerations: 0,
    todayGenerations: 0,
    weekGenerations: 0,
    monthGenerations: 0,
    yearGenerations: 0,
  });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedUserStats, setSelectedUserStats] = useState({ totalGenerations: 0 });
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchData();
    
    const usersQ = query(collection(db, 'users'), orderBy('lastSeen', 'desc'));
    const unsubscribeUsers = onSnapshot(usersQ, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
      setStats(prev => ({ ...prev, totalUsers: usersData.length }));
    }, (error: any) => {
      if (error.code !== 'permission-denied' && error.message !== 'Failed to fetch') {
        console.error("Erro ao escutar usuários:", error);
      }
    });

    return () => unsubscribeUsers();
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetchSelectedUserStats(selectedUser.id);
      
      // Update selectedUser if their document changes
      const updatedUser = users.find(u => u.id === selectedUser.id);
      if (updatedUser && (updatedUser.isOnline !== selectedUser.isOnline || updatedUser.lastSeen !== selectedUser.lastSeen || updatedUser.banned !== selectedUser.banned)) {
        setSelectedUser(updatedUser);
      }
    }
  }, [selectedUser, users]);

  const fetchSelectedUserStats = async (userId: string) => {
    try {
      const q = query(collection(db, 'generations'), where('userId', '==', userId));
      const count = await getCountFromServer(q);
      setSelectedUserStats({ totalGenerations: count.data().count });
    } catch (error: any) {
      if (error.code !== 'permission-denied' && error.message !== 'Failed to fetch') {
        console.error("Erro ao buscar stats do usuário:", error);
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch generation stats
      const genCol = collection(db, 'generations');
      const totalGenCount = await getCountFromServer(genCol);
      
      const now = new Date();
      
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const todayQ = query(genCol, where('createdAt', '>=', startOfToday));
      const todayCount = await getCountFromServer(todayQ);

      const startOfWeek = new Date(now);
      startOfWeek.setDate(now.getDate() - 7);
      const weekQ = query(genCol, where('createdAt', '>=', startOfWeek));
      const weekCount = await getCountFromServer(weekQ);

      const startOfMonth = new Date(now);
      startOfMonth.setMonth(now.getMonth() - 1);
      const monthQ = query(genCol, where('createdAt', '>=', startOfMonth));
      const monthCount = await getCountFromServer(monthQ);

      const startOfYear = new Date(now);
      startOfYear.setFullYear(now.getFullYear() - 1);
      const yearQ = query(genCol, where('createdAt', '>=', startOfYear));
      const yearCount = await getCountFromServer(yearQ);

      setStats(prev => ({
        ...prev,
        totalGenerations: totalGenCount.data().count,
        todayGenerations: todayCount.data().count,
        weekGenerations: weekCount.data().count,
        monthGenerations: monthCount.data().count,
        yearGenerations: yearCount.data().count,
      }));

    } catch (error: any) {
      if (error.code !== 'permission-denied' && error.message !== 'Failed to fetch') {
        console.error("Erro ao buscar dados admin:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleBanUser = async (userId: string, currentStatus: boolean) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        banned: !currentStatus
      });
      setUsers(users.map(u => u.id === userId ? { ...u, banned: !currentStatus } : u));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser({ ...selectedUser, banned: !currentStatus });
      }
    } catch (error: any) {
      console.error("Erro ao atualizar status:", error);
      setAlertMessage(`Erro ao ${currentStatus ? 'desbanir' : 'banir'} usuário: ${error.message}`);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (auth.currentUser?.uid === userId) {
      setAlertMessage("Você não pode apagar sua própria conta de administrador.");
      return;
    }
    setDeleteConfirm(userId);
  };

  const confirmDeleteUser = async () => {
    if (!deleteConfirm) return;
    const userId = deleteConfirm;
    setDeleteConfirm(null);
    try {
      const userRef = doc(db, 'users', userId);
      await deleteDoc(userRef);
      setUsers(users.filter(u => u.id !== userId));
      setStats(prev => ({ ...prev, totalUsers: prev.totalUsers - 1 }));
      if (selectedUser && selectedUser.id === userId) {
        setSelectedUser(null);
      }
      setAlertMessage("Conta apagada com sucesso do banco de dados.");
    } catch (error: any) {
      console.error("Erro ao apagar usuário:", error);
      setAlertMessage(`Erro ao apagar usuário: ${error.message}`);
    }
  };

  const isUserOnline = (user: any) => {
    if (!user.isOnline || !user.lastSeen) return false;
    const date = user.lastSeen.toDate ? user.lastSeen.toDate() : new Date(user.lastSeen);
    const diff = Math.floor((currentTime - date.getTime()) / 1000);
    return diff < 120; // Consider online if lastSeen is within 2 minutes
  };

  const formatLastSeen = (lastSeen: any, isOnlineFlag: boolean) => {
    if (!lastSeen) return "Desconhecido";
    
    const date = lastSeen.toDate ? lastSeen.toDate() : new Date(lastSeen);
    const diff = Math.floor((currentTime - date.getTime()) / 1000);
    const isReallyOnline = isOnlineFlag && diff < 120;

    if (isReallyOnline) return "Online agora";
    
    const exactTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const exactDate = date.toLocaleDateString();
    
    if (diff < 60) return `${diff}s off-line (Saiu às ${exactTime})`;
    if (diff < 3600) return `${Math.floor(diff / 60)}M off-line (Saiu às ${exactTime})`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}H off-line (Saiu às ${exactTime})`;
    return `${Math.floor(diff / 86400)}d off-line (Saiu em ${exactDate} às ${exactTime})`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-5xl mx-auto pb-24"
    >
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Painel Admin</h1>
        <p className="text-zinc-500 dark:text-zinc-400">Visão geral do sistema e gerenciamento de usuários.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-zinc-500 mb-1 text-sm">
            <Users size={16} />
            <span className="font-medium truncate">Contas</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.totalUsers}</div>
        </div>
        
        <div className="bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-emerald-500 mb-1 text-sm">
            <Activity size={16} />
            <span className="font-medium truncate">Total</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.totalGenerations}</div>
        </div>

        <div className="bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-blue-500 mb-1 text-sm">
            <Clock size={16} />
            <span className="font-medium truncate">Hoje</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.todayGenerations}</div>
        </div>

        <div className="bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-orange-500 mb-1 text-sm">
            <Calendar size={16} />
            <span className="font-medium truncate">Semana</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.weekGenerations}</div>
        </div>

        <div className="bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-purple-500 mb-1 text-sm">
            <Calendar size={16} />
            <span className="font-medium truncate">Mês</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.monthGenerations}</div>
        </div>

        <div className="bg-white dark:bg-[#18181b] p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2 text-pink-500 mb-1 text-sm">
            <Calendar size={16} />
            <span className="font-medium truncate">Ano</span>
          </div>
          <div className="text-2xl font-bold text-zinc-900 dark:text-white">{stats.yearGenerations}</div>
        </div>
      </div>

      {/* Users List & Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 bg-white dark:bg-[#18181b] rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col h-[300px] md:h-[600px]">
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800">
            <h2 className="font-bold text-zinc-900 dark:text-white">Usuários ({users.length})</h2>
          </div>
          <div className="flex-1 overflow-y-auto">
            {users.map(user => (
              <UserListItem 
                key={user.id}
                user={user}
                selectedUser={selectedUser}
                onClick={() => setSelectedUser(user)}
                isUserOnline={isUserOnline}
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          {selectedUser ? (
            <div className="bg-white dark:bg-[#18181b] rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  {selectedUser.photoURL ? (
                    <img src={selectedUser.photoURL} alt={selectedUser.displayName} className="w-16 h-16 rounded-full" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500 font-bold text-xl">
                      {selectedUser.displayName?.charAt(0).toUpperCase() || selectedUser.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                      {selectedUser.displayName || 'Sem nome'}
                      {selectedUser.banned && <span className="text-xs text-red-500 font-bold px-2 py-1 rounded bg-red-500/10">BANIDO</span>}
                    </h2>
                    <div className="flex items-center gap-4 mt-1">
                      <p className="text-zinc-500">{selectedUser.email}</p>
                      <SupportChat userId={selectedUser.id} isAdminView={true} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    onClick={() => handleBanUser(selectedUser.id, !!selectedUser.banned)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center ${selectedUser.banned ? 'bg-green-500/10 text-green-500 hover:bg-green-500/20' : 'bg-red-500/10 text-red-500 hover:bg-red-500/20'}`}
                  >
                    <Ban size={18} />
                    {selectedUser.banned ? 'Desbanir Usuário' : 'Banir Usuário'}
                  </button>
                  <button
                    onClick={() => handleDeleteUser(selectedUser.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors w-full sm:w-auto justify-center bg-red-500/10 hover:bg-red-500/20 text-red-500"
                  >
                    <Trash2 size={18} />
                    Apagar Conta
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800">
                  <div className="text-sm text-zinc-500 mb-1">Status</div>
                  <div className="font-semibold text-zinc-900 dark:text-white flex items-center gap-2">
                    {isUserOnline(selectedUser) ? (
                      <><div className="w-2 h-2 rounded-full bg-green-500"></div> Online agora</>
                    ) : (
                      <><div className="w-2 h-2 rounded-full bg-zinc-500"></div> Off-line</>
                    )}
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800">
                  <div className="text-sm text-zinc-500 mb-1">Última vez visto</div>
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    {formatLastSeen(selectedUser.lastSeen, !!selectedUser.isOnline)}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800">
                  <div className="text-sm text-zinc-500 mb-1">Plano</div>
                  <div className="font-semibold text-zinc-900 dark:text-white capitalize">
                    {selectedUser.plan || 'Free'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800">
                  <div className="text-sm text-zinc-500 mb-1">Criado em</div>
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    {selectedUser.createdAt ? (
                       new Date(selectedUser.createdAt).toLocaleDateString()
                    ) : 'N/A'}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-zinc-50 dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 col-span-2">
                  <div className="text-sm text-zinc-500 mb-1">Gerações (Total)</div>
                  <div className="font-semibold text-zinc-900 dark:text-white text-xl">
                    {selectedUserStats.totalGenerations}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full bg-white dark:bg-[#18181b] rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-zinc-500 p-8 text-center min-h-[400px]">
              <Users size={48} className="mb-4 opacity-50" />
              <p>Selecione um usuário na lista ao lado para ver os detalhes.</p>
            </div>
          )}
        </div>
      </div>

      {alertMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#18181b] p-6 rounded-2xl max-w-sm w-full border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Aviso</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">{alertMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setAlertMessage(null)}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-colors"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#18181b] p-6 rounded-2xl max-w-sm w-full border border-zinc-200 dark:border-zinc-800">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Apagar Conta</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Tem certeza que deseja apagar esta conta? Esta ação não pode ser desfeita e os dados do usuário serão apagados.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-medium transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDeleteUser}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-medium transition-colors"
              >
                Sim, apagar
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
