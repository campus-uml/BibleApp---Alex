import { LoginForm } from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  );
}
