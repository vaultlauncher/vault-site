"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/auth";
import { gravatarUrl } from "@/lib/gravatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Loader2,
  LogOut,
  Save,
  Mail,
  AtSign,
  User as UserIcon,
} from "lucide-react";

export default function ProfilePage() {
  const { user, signOut, updateProfile } = useAuthStore();
  const router = useRouter();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [avatarFailed, setAvatarFailed] = useState(false);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setAvatarFailed(false);
    setAvatarUrl(user?.email ? gravatarUrl(user.email, 96) : null);
  }, [user?.email]);

  useEffect(() => {
    setUsername(user?.displayUsername || user?.username || "");
    setName(user?.name || "");
  }, [user?.username, user?.displayUsername, user?.name]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <CardTitle>Not Signed In</CardTitle>
            <CardDescription>
              Sign in to view and edit your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center pb-6">
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const initials = (
    user.displayUsername ||
    user.username ||
    user.name ||
    user.email ||
    "U"
  )
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await updateProfile({
        username: username.trim(),
        name: name.trim(),
      });
      setDirty(false);
      setSaved(true);
    } catch {
      // error is surfaced via store
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex flex-col min-h-screen px-4 py-12">
      <div className="mx-auto w-full max-w-2xl gap-6 flex flex-col">
        <div className="flex items-center gap-6">
          {avatarUrl && !avatarFailed ? (
            <img
              src={avatarUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full flex-shrink-0"
              onError={() => setAvatarFailed(true)}
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-primary/15 flex items-center justify-center text-2xl font-semibold text-primary flex-shrink-0">
              {initials}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">
              {user.displayUsername || user.username || user.name}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline">@{user.username}</Badge>
              {user.emailVerified && <Badge>Verified</Badge>}
              {user.vaultPlus && (
                <Badge className="bg-gradient-to-r from-amber-600 to-yellow-300 text-black border-transparent">
                  Vault+
                </Badge>
              )}
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Profile Details</CardTitle>
            <CardDescription>
              Update your username and display name
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="profile-username" className="text-sm font-medium">
                Username
              </label>
              <div className="relative">
                <AtSign className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profile-username"
                  type="text"
                  className="pl-9"
                  placeholder="e.g. gamer_123"
                  value={username}
                  minLength={3}
                  maxLength={30}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setDirty(true);
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Lowercase letters, numbers, dots and underscores.
              </p>
            </div>
            <div className="space-y-2">
              <label htmlFor="profile-name" className="text-sm font-medium">
                Display Name
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="profile-name"
                  type="text"
                  className="pl-9"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setDirty(true);
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{user.email}</span>
            </div>
            <Separator />
            <Button variant="destructive" onClick={handleSignOut}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-4">
          {saved && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Profile updated
            </p>
          )}
          <Button onClick={handleSave} disabled={!dirty || saving}>
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
