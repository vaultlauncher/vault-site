"use client";

import Logo from "./logo";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Folder, Github } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { motion } from "motion/react";

export default function Navbar() {
  return (
    <motion.div
      className="px-6 mx-auto max-w-7xl"
      initial={{ opacity: 0, y: -48 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.9, bounce: 0.2 }}
    >
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
                href="https://github.com/vaultlauncher"
                className="px-4 py-2 text-sm font-medium transition-colors hover:text-primary rounded-md hover:bg-accent flex flex-row items-center gap-2"
              >
                <Github className="w-4 h-4" />
                Github
              </Link>
            </div>
          </div>

          {/* <Button size="sm" asChild>
            <Link href="#waitlist">Get notified</Link>
          </Button> */}
          <ModeToggle />
        </div>
      </div>
    </motion.div>
  );
}