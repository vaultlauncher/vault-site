"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BellRing, CheckCircle2 } from "lucide-react";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [joined, setJoined] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  if (joined) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-3 rounded-md bg-primary/10 border border-primary/20 text-sm font-medium text-primary">
        <CheckCircle2 className="w-4 h-4" />
        You&apos;re on the list. We&apos;ll let you know when Vault drops.
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full"
    >
      <Input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 h-11"
      />
      <Button type="submit" size="lg" className="h-11">
        <BellRing className="w-4 h-4" />
        Notify me
      </Button>
    </form>
  );
}