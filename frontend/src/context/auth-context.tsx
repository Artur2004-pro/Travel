import { createContext, useContext, useEffect, useState } from "react";
import type { IAccount, IResponse } from "../types";
import { Axios } from "../lib/axios-config";

interface AuthContextValue {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
  account: IAccount | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    Boolean(localStorage.getItem("Authorization"))
  );
  const [account, setAccount] = useState<IAccount | null>(null);

  const fetchAccount = async () => {
    const { data } = await Axios.get<IResponse<IAccount>>("account");
    setAccount(data.payload);
  };
  const login = (token: string) => {
    localStorage.setItem("Authorization", token);
    setIsAuthenticated(true);
    fetchAccount();
  };

  const logout = () => {
    localStorage.removeItem("Authorization");
    setIsAuthenticated(false);
    setAccount(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, account }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return ctx;
}
