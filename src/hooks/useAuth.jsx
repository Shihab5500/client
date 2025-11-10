

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { auth } from "../firebase";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  
  const googleProvider = useMemo(() => {
    const p = new GoogleAuthProvider();
    
    p.setCustomParameters({ prompt: "select_account" });
    return p;
  }, []);

  useEffect(() => {
    
    (async () => {
      try {
        await setPersistence(auth, browserLocalPersistence);
      } catch (_) {
        
      }

      
      try {
        const redirectCred = await getRedirectResult(auth);
        if (redirectCred?.user) {
          setUser(redirectCred.user);
        }
      } catch (_) {
        
      }

      const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u || null);
        setLoading(false);
      });
      return () => unsub();
    })();
  }, []);

  // Email + Password login
  const login = async (email, password) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user;
  };

  // Email + Password register
  const register = async ({ name, email, password, photoURL }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (name || photoURL) {
      await updateProfile(cred.user, {
        displayName: name || "",
        photoURL: photoURL || "",
      });
    }
    return cred.user;
  };

  // Google login — popup চেষ্টা করবে; ব্যর্থ হলে redirect-এ fallback
  const _loginWithGoogle = async () => {
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      return cred.user;
    } catch (err) {
      
      await signInWithRedirect(auth, googleProvider);
      
      return null;
    }
  };

  // naming compatibility
  const loginWithGoogle = _loginWithGoogle;
  const loginGoogle = _loginWithGoogle;     

  // Logout
  const logout = () => signOut(auth);

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    loginGoogle,
    logout,
  };

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export const useAuth = () => useContext(AuthCtx);
