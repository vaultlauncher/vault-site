import Logo from "./logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { Folder, Paperclip, Gamepad, Github } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./user-menu";

export default function Navbar() {
  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="bg-card/80 backdrop-blur-sm p-4 rounded-xl flex flex-row items-center justify-between m-4 border shadow-sm w-full">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex gap-3  items-center">
            <Logo className="w-6 h-6 text-primary stroke-border" />
            <span className="font-semibold text-lg hidden sm:flex gap-1 ">
              Vault <p className="text-primary">Launcher</p>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex gap-1 px-0">
            <div>
              <Link
                href="#features"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
              >
                <Folder className="w-4 h-4" /> Features
              </Link>
            </div>
            <div>
              <Link
                href="/games"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
              >
                <Gamepad className="w-4 h-4" /> Browse Games
              </Link>
            </div>
            <div>
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
              >
                <Paperclip className="w-4 h-4" /> Docs
              </Link>
            </div>
            <div>
              <Link
                href="https://github.com/vaultlauncher"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
              >
                <Github className="w-4 h-4" />
                Github
              </Link>
            </div>
          </div>

          <Button size="sm" asChild>
            <Link href="/">Download</Link>
          </Button>
          <UserMenu />
          <ModeToggle />
        </div>

        <div className="md:hidden flex items-center gap-2">
          <UserMenu />
          <ModeToggle />
        </div>
      </div>
    </div>
  );
}
