import Logo from "./logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Folder, Paperclip, Gamepad } from "lucide-react";

export default function Navbar() {
  return (
    <div className="px-6 mx-auto max-w-7xl">
      <div className="bg-card/80 backdrop-blur-sm p-4 rounded-xl flex flex-row items-center justify-between m-4 border shadow-sm w-full">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex gap-3  items-center">
            <Logo className="w-6 h-6 text-primary stroke-border" />
            <span className="font-semibold text-lg hidden sm:flex gap-1 ">
              Vault <p className="text-primary">Launcher</p>
            </span>
          </Link>
        </div>

        {/* Right: Navigation + Download */}
        <div className="hidden md:flex items-center gap-4">
          <NavigationMenu>
            <NavigationMenuList className="flex gap-1 px-0">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="#features"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
                  >
                    <Folder /> Features
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/games"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
                  >
                    <Gamepad /> Browse Games
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link
                    href="/"
                    className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
                  >
                    <Paperclip /> Docs
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button size="sm" asChild>
            <Link href="/">Download</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
