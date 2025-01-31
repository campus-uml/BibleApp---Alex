import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "../constants/api";
import { useNavigate } from "react-router-dom";



export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate()

  const handleGithubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: "github" });
    if (error) {
      console.error("Error logging in with GitHub:", error);
      return;
    }   
    navigate("/home");
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="p-6 md:p-8 text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground">Login with GitHub</p>
            <Button onClick={handleGithubLogin} className="w-full mt-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.207 11.385.6.113.793-.258.793-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.547-1.387-1.335-1.757-1.335-1.757-1.09-.744.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.49.997.107-.775.418-1.305.76-1.605-2.665-.304-5.467-1.335-5.467-5.93 0-1.31.47-2.38 1.235-3.22-.125-.303-.535-1.523.115-3.175 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.295-1.552 3.3-1.23 3.3-1.23.65 1.652.24 2.872.115 3.175.765.84 1.235 1.91 1.235 3.22 0 4.605-2.805 5.625-5.475 5.925.43.375.81 1.102.81 2.22 0 1.605-.015 2.895-.015 3.29 0 .32.195.698.8.578C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"
                  clipRule="evenodd"
                />
              </svg>
              Login with GitHub
            </Button>
          </div>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/placeholder.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
