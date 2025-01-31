import { LoginForm } from "@/components/login-form"


export default function LoginPage() {

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-base">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
