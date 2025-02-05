import { useState } from "react";
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
import { Settings, ChevronRight } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ModeToggle } from "./ui/mode-toggle";
import { motion } from "framer-motion";

interface DropdownUserProps {
  avatarUrl: string | null;
}

export function DropdownUser({ avatarUrl }: DropdownUserProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const displayName = user?.user_metadata.full_name || user?.user_metadata.name;

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full hover:bg-accent transition-all duration-300 ease-in-out"
        >
          <Avatar className="h-8 w-8 transition-transform duration-300 ease-in-out hover:scale-110">
            <AvatarImage src={avatarUrl ?? undefined} alt="User Avatar" />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.email?.[0].toUpperCase() ?? "?"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 p-2">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex items-center justify-start gap-3 p-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatarUrl ?? undefined} alt="User Avatar" />
              <AvatarFallback className="bg-primary text-primary-foreground">
                {user?.email?.[0].toUpperCase() ?? "?"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <DropdownMenuLabel className="font-medium text-base">
                {displayName}
              </DropdownMenuLabel>
              <p className="text-xs text-muted-foreground">
                @{user?.user_metadata.user_name || user?.email}
              </p>
            </div>
          </div>
        </motion.div>
        <DropdownMenuSeparator className="my-2" />
        <div className="p-2 flex justify-between items-center">
          <span className="text-sm font-medium">Tema</span>
          <ModeToggle />
        </div>
        <DropdownMenuItem className="cursor-pointer rounded-md transition-colors duration-200 ease-in-out hover:bg-accent focus:bg-accent">
          <Settings className="mr-2 h-4 w-4" />
          <span>Configuración</span>
          <ChevronRight className="ml-auto h-4 w-4" />
        </DropdownMenuItem>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuItem asChild>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
