import type React from "react";
import { useState } from "react";
import useLogin from "../../Hooks/useLogin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, CheckCircle2 } from "lucide-react";

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
    <>
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }}
      ></div>

      <div className="flex w-full  gap-6 p-2 min-h-screen items-center justify-center">
        <Card className="w-full max-w-md overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido a BibleApp</h1>
                <p className="text-balance text-slate-950">
                  Regístrate para continuar
                </p>
              </div>
              {message && (
                <Alert
                  variant={message.type === "error" ? "destructive" : "default"}
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
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="full-name">Nombre Completo</Label>
                  <Input
                    id="full-name"
                    type="text"
                    required
                    className="bg-slate-50"
                    value={fullName}
                    placeholder="ejemplo: Alex Talavera"
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="example@example.com"
                    required
                    className="bg-slate-50"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="********"
                    required
                    className="bg-slate-50"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirmar Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    placeholder="********"
                    required
                    className="bg-slate-50"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registrando..." : "Regístrate"}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Register;
