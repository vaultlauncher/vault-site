"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type OS = "windows" | "linux" | "unknown";

const detectOS = (): OS => {
  if (typeof window === "undefined") return "windows";

  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform.toLowerCase();

  if (userAgent.includes("win") || platform.includes("win")) {
    return "windows";
  }
  if (userAgent.includes("linux") || platform.includes("linux")) {
    return "linux";
  }
  return "windows";
};

export default function OSDownloadButton() {
  const [os, setOs] = useState<OS>(detectOS);

  const getDownloadConfig = () => {
    switch (os) {
      case "windows":
        return {
          text: "Download For Windows",
          href: "https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher-setup.exe",
          icon: (
            <svg className="w-4 h-4 mr-2" viewBox="0 0 128 128">
              <path
                fill="currentColor"
                d="M67.328 67.331h60.669V128H67.328zm-67.325 0h60.669V128H.003zM67.328 0h60.669v60.669H67.328zM.003 0h60.669v60.669H.003z"
              />
            </svg>
          ),
        };
      case "linux":
        return {
          text: "Download For Linux",
          href: "/downloads",
          icon: (
            <svg viewBox="0 0 128 128" className="w-4 h-4 mr-2">
              <path
                fillRule="evenodd"
                fill="currentColor"
                clipRule="evenodd"
                d="M113.823 104.595c-1.795-1.478-3.629-2.921-5.308-4.525-1.87-1.785-3.045-3.944-2.789-6.678.147-1.573-.216-2.926-2.113-3.452.446-1.154.864-1.928 1.033-2.753.188-.92.178-1.887.204-2.834.264-9.96-3.334-18.691-8.663-26.835-2.454-3.748-5.017-7.429-7.633-11.066-4.092-5.688-5.559-12.078-5.633-18.981a47.564 47.564 0 00-1.081-9.475C80.527 11.956 77.291 7.233 71.422 4.7c-4.497-1.942-9.152-2.327-13.901-1.084-6.901 1.805-11.074 6.934-10.996 14.088.074 6.885.417 13.779.922 20.648.288 3.893-.312 7.252-2.895 10.34-2.484 2.969-4.706 6.172-6.858 9.397-1.229 1.844-2.317 3.853-3.077 5.931-2.07 5.663-3.973 11.373-7.276 16.5-1.224 1.9-1.363 4.026-.494 6.199.225.563.363 1.429.089 1.882-2.354 3.907-5.011 7.345-10.066 8.095-3.976.591-4.172 1.314-4.051 5.413.1 3.337.061 6.705-.28 10.021-.363 3.555.008 4.521 3.442 5.373 7.924 1.968 15.913 3.647 23.492 6.854 3.227 1.365 6.465.891 9.064-1.763 2.713-2.771 6.141-3.855 9.844-3.859 6.285-.005 12.572.298 18.86.369 1.702.02 2.679.653 3.364 2.199.84 1.893 2.26 3.284 4.445 3.526 4.193.462 8.013-.16 11.19-3.359 3.918-3.948 8.436-7.066 13.615-9.227 1.482-.619 2.878-1.592 4.103-2.648 2.231-1.922 2.113-3.146-.135-5z"
              />
            </svg>
          ),
        };
      default:
        return {
          text: "Download For Windows",
          href: "https://github.com/vaultlauncher/vault/releases/latest/download/vault-launcher-setup.exe",
          icon: (
            <svg className="w-4 h-4 mr-2" viewBox="0 0 128 128">
              <path
                fill="currentColor"
                d="M67.328 67.331h60.669V128H67.328zm-67.325 0h60.669V128H.003zM67.328 0h60.669v60.669H67.328zM.003 0h60.669v60.669H.003z"
              />
            </svg>
          ),
        };
    }
  };

  const config = getDownloadConfig();

  return (
    <Button size="lg" asChild>
      <Link href={config.href}>
        {config.icon}
        {config.text}
      </Link>
    </Button>
  );
}
