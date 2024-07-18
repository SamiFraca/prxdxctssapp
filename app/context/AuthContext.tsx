import React, { useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

type User = {
  email: string;
  password: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3000/users.json", {
        withCredentials: true,
      });
      if (response.data) {
        setUser(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3000/users.json",
        { email, password },
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        setUser(response.data);
        Cookies.set("token", response.data.token);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
