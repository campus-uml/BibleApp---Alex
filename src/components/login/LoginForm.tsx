import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "@/Hooks/useLogin";

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
        className="absolute inset-0 -z-10 h-full w-full bg-cover bg-center bg-no-repeat"
        style={{
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
        }}
      ></div>
      <div className={`flex flex-col gap-6 xs: p-2 ${className}`} {...props}>
        <Card className="overflow-hidden backdrop-blur-sm bg-white/70 dark:bg-gray-800/70">
          <CardContent className="grid p-0 md:grid-cols-2">
            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Bienvenido a BibleApp</h1>
                  <p className="text-balance text-slate-950">
                    Inicia sesión para continuar
                  </p>
                </div>
                <form onSubmit={handleEmailLogin} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-50"
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a
                        href="#"
                        className="ml-auto text-sm underline-offset-2 hover:underline"
                      >
                        Olvidaste tu clave?
                      </a>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      placeholder="********"
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-slate-50"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Cargando..." : "Login"}
                  </Button>
                </form>
                <div className="flex items-center justify-center gap-4">
                  <span className="relative z-10 bg-transparent px-2 text-gray-800">
                    Continuar con
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGithubLogin}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.005-.404 1.02.005 2.048.138 3.005.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with GitHub</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleGoogleLogin}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                      <path
                        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                        fill="currentColor"
                      />
                    </svg>
                    <span className="sr-only">Login with Google</span>
                  </Button>

                </div>
                <div className="text-center text-sm">
                  no tienes una cuenta?{' '}
                  <a href="#" className="underline underline-offset-4">
                    Registrarse
                  </a>
                </div>
              </div>
            </div>
            <div className="relative hidden bg-muted md:block">
              <img
                src="https://th.bing.com/th/id/R.2e1213504f697b8b6d0a1a7c9043fe7d?rik=sYZBctqIfVFsUw&pid=ImgRaw&r=0"
                alt="Image"
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-slate-950[&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}
