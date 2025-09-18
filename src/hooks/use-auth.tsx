'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateUserInFirestore: (user: User, additionalData?: object) => Promise<void>;
  pseudoLogin?: (userData: {uid: string, email: string, displayName: string}) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for pseudo-user in session storage
    const pseudoUserJson = sessionStorage.getItem('pseudo-user');
    if (pseudoUserJson) {
      setUser(JSON.parse(pseudoUserJson) as User);
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
      return () => unsubscribe();
    }
  }, []);

  const logout = async () => {
    // Clear pseudo-user session
    if (sessionStorage.getItem('pseudo-user')) {
      sessionStorage.removeItem('pseudo-user');
      setUser(null);
    } else {
      await firebaseSignOut(auth);
    }
  };

  const pseudoLogin = (userData: {uid: string, email: string, displayName: string}) => {
    const pseudoUser = {
      ...userData,
      // Add any other mock user properties your app might need
      emailVerified: true,
    } as User;
    sessionStorage.setItem('pseudo-user', JSON.stringify(pseudoUser));
    setUser(pseudoUser);
  };
  
  const updateUserInFirestore = async (user: User, additionalData = {}) => {
    if (user.uid === 'admin-synvora') return; // Do not write pseudo-admin to firestore
    const userRef = doc(db, `users/${user.uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      const { displayName, email } = user;
      try {
        await setDoc(userRef, {
          name: displayName,
          email,
          createdAt: serverTimestamp(),
          lastSeen: serverTimestamp(),
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user document in Firestore:", error);
      }
    }
  };


  const value = { user, loading, logout, updateUserInFirestore, pseudoLogin };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
