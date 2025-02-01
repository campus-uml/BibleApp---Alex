import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/constants/api"

const useLogin = () => {
    const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (error) {
      alert(error.message)
    } else {
      navigate("/home")
    }
    setLoading(false)
  }

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    })
    if (error) {
      alert("Error logging in with GitHub")
    }
  }

  const handleGoogleLogin = async () => {
    console.log("Google login")
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    })
    if (error) {
      alert("Error logging in with Google")
    }
  }

  const handleAzureLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        redirectTo: `${window.location.origin}/home`,
      },
    })
    if (error) {
      alert("Error logging in with Microsoft")
    }
  }


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
  };
};

export default useLogin;
