"use client";

import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserCircle, User } from "lucide-react";

export function UserNav(userSession) {
 
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  if (!userSession?.userSession) return null;

  return (
    <DropdownMenu >
      <DropdownMenuTrigger asChild color="white">
        <Button 
          variant="outline" 
          className="relative h-8 flex items-center justify-center w-8 rounded-full bg-[red]"
        >
          <User className="h-5 w-5 z-10 absolute " />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white text-blue-600 border-slate-800" align="end" forceMount>
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-slate-200 bg-gray-800 focus:bg-slate-800 focus:text-slate-100 cursor-pointer hover:bg-blue-400"
        >
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
