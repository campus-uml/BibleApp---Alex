import type React from "react";
import { useState } from "react";
import useLogin from "../../Hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2, User, Mail, Lock } from "lucide-react";

const Register = () => {
  const { signUpNewUser, loading } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Las contraseñas no coinciden" });
      return;
    }

    if (!fullName) {
      setMessage({ type: "error", text: "El nombre completo es obligatorio" });
      return;
    }

    const result = await signUpNewUser(email, password, fullName);
    setMessage({
      type: result.success ? "success" : "error",
      text: result.message,
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 p-4">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-grid-white/[0.02]" />
      <div className="absolute inset-0 flex items-center justify-center bg-white/[0.02] backdrop-blur-3xl" />

      <Card className="w-full max-w-lg relative overflow-hidden border-none bg-white/90 dark:bg-gray-900/90 shadow-2xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            BibleApp
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-400">
            Crea tu cuenta para comenzar
          </CardDescription>
        </CardHeader>

        <CardContent className="relative z-10">
          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : "default"}
              className="mb-6 animate-fade-in"
            >
              {message.type === "error" ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle2 className="h-4 w-4" />
              )}
              <AlertTitle>
                {message.type === "error" ? "Error" : "Éxito"}
              </AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <Label htmlFor="full-name" className="text-sm font-medium">
                  Nombre Completo
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="full-name"
                    type="text"
                    required
                    className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                    value={fullName}
                    placeholder="ejemplo: Alex Talavera"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                    value={email}
                    placeholder="example@example.com"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                    value={password}
                    placeholder="********"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <Label
                  htmlFor="confirm-password"
                  className="text-sm font-medium"
                >
                  Confirmar Contraseña
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                    value={confirmPassword}
                    placeholder="********"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
                  <span>Registrando...</span>
                </div>
              ) : (
                "Regístrate"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
