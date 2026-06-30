import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { getFirestore, initializeFirestore, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA1A1AvoD3Jj1WZBGskr3mpJG8rcBQ7-6k",
  authDomain: "creator-ia.firebaseapp.com",
  projectId: "creator-ia",
  storageBucket: "creator-ia.firebasestorage.app",
  messagingSenderId: "827217720852",
  appId: "1:827217720852:web:1b27213065c405a4199901",
  measurementId: "G-4TBF8P7ERB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export let analytics: any = null;
isSupported().then(yes => yes ? analytics = getAnalytics(app) : null);
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
}, "ai-studio-creatorailanding-324fa99e-1031-482e-a0ec-517d9432e88a");

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string, fullName: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    if (result.user) {
      await updateProfile(result.user, {
        displayName: fullName
      });
      await sendEmailVerification(result.user);
    }
    return result.user;
  } catch (error) {
    console.error("Error signing up with email:", error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
  } catch (error) {
    console.error("Error signing in with email:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    if (auth.currentUser) {
      const userRef = doc(db, 'users', auth.currentUser.uid);
      await updateDoc(userRef, {
        lastSeen: serverTimestamp(),
        isOnline: false
      });
    }
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
