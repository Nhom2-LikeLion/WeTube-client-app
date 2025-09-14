"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import apiClient from "@/lib/apiClient";

interface User {
  id: string;
  name: string;
  email: string;
  picture: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get<User>("/api/me");

        console.log("✅ Data from backend:", response.data);

        setUser(response.data);
      } catch (error) {
        console.error("❌ Error call API /me:", error);

        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();

    const handleAuthFailure = () => {
      console.log("Auth failure event received, clearing user.");
      setUser(null);
    };
    window.addEventListener("auth-failure", handleAuthFailure);

    return () => {
      window.removeEventListener("auth-failure", handleAuthFailure);
    };
  }, []);

  const login = useCallback(() => {
    window.location.href = `${apiClient.defaults.baseURL}/api/auth/login/google`;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/api/auth/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading, login, logout]
  );

  console.log("AuthProvider State:", { isLoading, user });

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
