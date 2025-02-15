import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/constants/api";
import { Loading } from "../components/Loading";

interface AuthContextType {
  user: User | null;
  logout: () => Promise<void>;
  avatarUrl: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);

      if (user?.user_metadata.avatar_url) {
        setAvatarUrl(user.user_metadata.avatar_url);
      }
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (event === "SIGNED_IN") {
          navigate("/home");
        } else if (event === "SIGNED_OUT") {
          navigate("/login");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  useEffect(() => {
    if (!loading) {
      if (user && location.pathname === "/login") {
        navigate("/home");
      } else if (
        !user &&
        location.pathname !== "/login" &&
        location.pathname !== "/register" &&
        location.pathname !== "/terminos"
      ) {
        navigate("/login");
      }
    }
  }, [user, loading, navigate, location]);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider value={{ avatarUrl, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
