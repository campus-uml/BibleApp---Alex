import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import LogoutButton from "@/components/login/LogoutButton";
import { User } from "@supabase/supabase-js";
import { Settings, UserIcon } from "lucide-react";

interface DropdownUserProps {
  avatarUrl: string | null;
  user: User | null;
}

export function DropdownUser({ avatarUrl, user }: DropdownUserProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-accent"
        >
          <Avatar className="h-8 w-8 transition-transform hover:scale-110">
            <AvatarImage src={avatarUrl ?? undefined} alt="User Avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.user_metadata.name?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl ?? undefined} alt="User Avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.user_metadata.name?.[0] ?? "?"}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-1">
            <DropdownMenuLabel className="font-medium">
              {user?.user_metadata.name}
            </DropdownMenuLabel>
            <p className="text-xs text-muted-foreground">
              @{user?.user_metadata.user_name}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <UserIcon className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
