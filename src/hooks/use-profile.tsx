import { UserContext } from "@/contexts/profile-context";
import { useContext } from "react";

export const useProfile = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useProfile must be used within a UserProvider");
  }

  return ctx;
};
