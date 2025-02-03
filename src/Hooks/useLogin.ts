import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/constants/api";
import { AuthError } from "@supabase/supabase-js";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      alert(error.message);
    } else {
      navigate("/home");
    }
    setLoading(false);
  };

  const signUpNewUser = async (
    email: string,
    password: string,
    fullName: string
  ) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/home`,
        },
      });

      if (error) throw error;

      if (data?.user) {
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          full_name: fullName,

        });
        setFullName(fullName);


        if (profileError) {
          throw profileError;
        }

        return {
          success: true,
          message: "Registro exitoso. Por favor, verifica tu email.",
        };
      } else {
        return {
          success: false,
          message: "No se pudo crear el usuario. Por favor, intenta de nuevo.",
        };
      }
    } catch (error) {
      console.error("Error signing up:", error);
      let errorMessage = "Error al registrarse. Por favor, intenta de nuevo.";

      if (error instanceof AuthError) {
        errorMessage = `Error ${error.status}: ${error.message}`;
        console.error("Detailed error:", JSON.stringify(error, null, 2));
      }

      return { success: false, message: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
    if (error) {
      alert("Error logging in with GitHub");
    }
  };

  const handleGoogleLogin = async () => {
    console.log("Google login");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
    if (error) {
      alert("Error logging in with Google");
    }
  };

  //no se usara por ahora
  const handleAzureLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    });
    if (error) {
      alert("Error logging in with Microsoft");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleEmailLogin,
    handleGithubLogin,
    handleGoogleLogin,
    handleAzureLogin,
    signUpNewUser,
    fullName,
    
  };
};

export default useLogin;
