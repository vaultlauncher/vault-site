"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "motion/react";
import { Download, Github } from "lucide-react";

export default function DownloadsPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8">
          Download <span className="text-primary">Vault Launcher</span>
        </h1>
        <p className="text-center text-lg mb-12 text-secondary-foreground">
          Choose your platform to download the latest version of Vault Launcher.
        </p>

        <div className="grid gap-8 mx-auto grid-cols-2  max-w-4xl">
          <motion.div
            className="bg-card border rounded-lg p-8 text-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto text-primary"
                viewBox="0 0 128 128"
              >
                <path
                  fill="currentColor"
                  d="M67.328 67.331h60.669V128H67.328zm-67.325 0h60.669V128H.003zM67.328 0h60.669v60.669H67.328zM.003 0h60.669v60.669H.003z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4">Windows</h3>
            <p className="text-muted-foreground mb-6">
              Download the Windows installer for Vault Launcher.
            </p>
            <div className="space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher-setup.exe">
                  <Download className="w-4 h-4 mr-2" />
                  Download for Windows (Installer)
                </Link>
              </Button>
              <Button size="lg" className="w-full" asChild variant="outline">
                <Link href="https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher-setup.exe">
                  <Download className="w-4 h-4 mr-2" />
                  Download for Windows (Portable)
                </Link>
              </Button>
            </div>
          </motion.div>
          <motion.div
            className="bg-card border rounded-lg p-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-4 text-center">
              <svg
                viewBox="0 0 128 128"
                className="w-16 h-16 mx-auto text-primary"
              >
                <path
                  fillRule="evenodd"
                  fill="currentColor"
                  clipRule="evenodd"
                  d="M113.823 104.595c-1.795-1.478-3.629-2.921-5.308-4.525-1.87-1.785-3.045-3.944-2.789-6.678.147-1.573-.216-2.926-2.113-3.452.446-1.154.864-1.928 1.033-2.753.188-.92.178-1.887.204-2.834.264-9.96-3.334-18.691-8.663-26.835-2.454-3.748-5.017-7.429-7.633-11.066-4.092-5.688-5.559-12.078-5.633-18.981a47.564 47.564 0 00-1.081-9.475C80.527 11.956 77.291 7.233 71.422 4.7c-4.497-1.942-9.152-2.327-13.901-1.084-6.901 1.805-11.074 6.934-10.996 14.088.074 6.885.417 13.779.922 20.648.288 3.893-.312 7.252-2.895 10.34-2.484 2.969-4.706 6.172-6.858 9.397-1.229 1.844-2.317 3.853-3.077 5.931-2.07 5.663-3.973 11.373-7.276 16.5-1.224 1.9-1.363 4.026-.494 6.199.225.563.363 1.429.089 1.882-2.354 3.907-5.011 7.345-10.066 8.095-3.976.591-4.172 1.314-4.051 5.413.1 3.337.061 6.705-.28 10.021-.363 3.555.008 4.521 3.442 5.373 7.924 1.968 15.913 3.647 23.492 6.854 3.227 1.365 6.465.891 9.064-1.763 2.713-2.771 6.141-3.855 9.844-3.859 6.285-.005 12.572.298 18.86.369 1.702.02 2.679.653 3.364 2.199.84 1.893 2.26 3.284 4.445 3.526 4.193.462 8.013-.16 11.19-3.359 3.918-3.948 8.436-7.066 13.615-9.227 1.482-.619 2.878-1.592 4.103-2.648 2.231-1.922 2.113-3.146-.135-5z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-center">Linux</h3>
            <p className="text-muted-foreground mb-6 text-center">
              Choose your preferred Linux package format.
            </p>
            <div className="space-y-3">
              <Button size="lg" className="w-full" asChild>
                <Link href="https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher.AppImage">
                  <Download className="w-4 h-4 mr-2" />
                  AppImage (Universal)
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher.deb">
                  <Download className="w-4 h-4 mr-2" />
                  DEB (Debian/Ubuntu)
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher.snap">
                  <Download className="w-4 h-4 mr-2" />
                  Snap
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="w-full" asChild>
                <Link href="https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher.pacman">
                  <Download className="w-4 h-4 mr-2" />
                  Pacman (Arch)
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p className="text-muted-foreground mb-4">
            Prefer to build from source or check the latest releases?
          </p>
          <Button variant="outline" asChild>
            <Link href="https://github.com/vaultlauncher/vault/releases">
              <Github className="w-4 h-4 mr-2" />
              View All Releases
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
