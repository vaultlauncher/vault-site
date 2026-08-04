"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { gravatarUrl } from "@/lib/gravatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

export default function UserMenu() {
  const { user, loadSession, signOut } = useAuthStore();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);

  useEffect(() => {
    loadSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAvatarFailed(false);
    setAvatarUrl(user?.email ? gravatarUrl(user.email) : null);
  }, [user?.email]);

  if (!user) {
    return (
      <Button size="sm" asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    );
  }

  const initials = (user.displayUsername || user.username || user.name || user.email || "U")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="w-8 h-8 rounded-full overflow-hidden border border-border flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          title={user.displayUsername || user.username || user.name}
        >
          {avatarUrl && !avatarFailed ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-full h-full object-cover"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <span className="w-full h-full flex items-center justify-center text-xs font-semibold bg-primary/15 text-primary">
              {initials}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="truncate">{user.displayUsername || user.username || user.name}</div>
          <div className="text-xs font-normal text-muted-foreground truncate">@{user.username}</div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User /> Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={handleSignOut}>
          <LogOut /> Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
