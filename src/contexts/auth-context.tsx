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
import axios from "axios";

interface User {
  sub: string;
  name: string;
  email: string;
  picture: string;
  channelId: string;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get<User>("/me");

        console.log("✅ Data from backend:", response.data);

        setUser(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          console.log("User is not authenticated (handled gracefully).");
        } else {
          console.error(
            "❌ An unexpected error occurred while fetching user:",
            error
          );
        }
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
    window.location.href = `${apiClient.defaults.baseURL}/auth/login/google`;
  }, []);

  const logout = useCallback(async () => {
    try {
      await apiClient.post("/auth/logout");
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
