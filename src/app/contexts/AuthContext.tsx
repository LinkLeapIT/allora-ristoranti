"use client";
import React, { createContext, useContext, useMemo, useState, ReactNode, useEffect } from "react";
import FirebaseAuth from "../handlers/auth";

const { signIn, signOut, getCurrentUser } = FirebaseAuth;

interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

interface AuthContextProps {
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authenticate: () => Promise<void>;
  currentUser: User | null;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = async () => {
    const user = await signIn();
    setCurrentUser(user);
    document.cookie = `token=${user.uid}; path=/`; // Set token as a cookie
  };

  const logout = async () => {
    await signOut();
    setCurrentUser(null);
    document.cookie = 'token=; Max-Age=0; path=/'; // Clear the token cookie
  };

  const authenticate = async () => {
    const user = await getCurrentUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    authenticate();
  }, []);

  const value = useMemo(() => {
    return {
      login,
      logout,
      authenticate,
      currentUser,
    };
  }, [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
