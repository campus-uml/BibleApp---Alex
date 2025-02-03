import type React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/Hooks/useLogin";
import { Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleEmailLogin,
    handleGithubLogin,
    handleGoogleLogin,
  } = useLogin();

  return (
    <>
      <div
        className="absolute inset-0 -z-10 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          background: "linear-gradient(to bottom, #7c3aed, #f97316)",
          height: "100vh",
        }}
      ></div>

      <div className={`w-full max-w-5xl relative p-3 ${className}`} {...props}>
        <Card className="overflow-hidden border-none bg-white/90 dark:bg-gray-900/90 shadow-2xl">
          <CardContent className="p-0 grid md:grid-cols-2">
            <div className="p-6 md:p-8">
              <CardHeader className="space-y-1 text-center p-0 mb-8">
                <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  BibleApp
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400">
                  Inicia sesión para continuar 
                </CardDescription>
              </CardHeader>

              <div className="flex flex-col gap-6">
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="space-y-4">
                    <div className="relative">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email
                      </Label>
                      <div className="relative mt-1">
                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="password"
                          className="text-sm font-medium"
                        >
                          Password
                        </Label>
                        <Link
                          to="/forgot-password"
                          className="text-sm text-purple-600 hover:text-purple-700 dark:text-purple-400"
                        >
                          Olvidaste tu clave?
                        </Link>
                      </div>
                      <div className="relative mt-1">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                        <Input
                          id="password"
                          type="password"
                          value={password}
                          placeholder="********"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                          className="pl-10 bg-white/50 dark:bg-gray-800/50 border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-purple-500"
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
                        <span>Cargando...</span>
                      </div>
                    ) : (
                      "Iniciar Sesión"
                    )}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/90 dark:bg-gray-900/90 text-gray-500">
                      Continuar con
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={handleGithubLogin}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.005-.404 1.02.005 2.048.138 3.005.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with GitHub</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    onClick={handleGoogleLogin}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>
                </div>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  ¿No tienes una cuenta?{" "}
                  <Link
                    to="/register"
                    className="text-purple-600 hover:text-purple-700 dark:text-purple-400 font-medium"
                  >
                    Regístrate
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative hidden md:block">
              <img
                src="https://th.bing.com/th/id/R.2e1213504f697b8b6d0a1a7c9043fe7d?rik=sYZBctqIfVFsUw&pid=ImgRaw&r=0"
                alt="Login background"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
          Al continuar, aceptas nuestros{" "}
          <Link
            to="/terms"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
          >
            Términos de Servicio
          </Link>{" "}
          y{" "}
          <Link
            to="/privacy"
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400"
          >
            Política de Privacidad
          </Link>
          .
        </div>
      </div>
    </>
  );
}
