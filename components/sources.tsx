import Image from "next/image";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import { ArrowRight, Download, Zap } from "lucide-react";

function Sources() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 space-y-3">
          <h2 className="text-4xl font-bold tracking-tight">Powered By</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vault Launcher integrates with trusted sources to bring you the best
            gaming experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-xl bg-muted">
                  <Image
                    src="/steamrip.png"
                    alt="SteamRip"
                    height={120}
                    width={120}
                    className="w-24 h-24 object-contain rounded-2xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <CardTitle className="text-2xl">SteamRip</CardTitle>
                  <Badge variant="secondary" className="gap-1">
                    <Download className="w-3 h-3" />
                    Direct
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  Seamlessly integrated for instant game searching and
                  downloading
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grow">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Easy One-click downloads in Vault Launcher
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Regular updates and extensive game library
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Button className="w-full group" asChild>
                <Link href="/sources/steamrip">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="flex flex-col hover:shadow-lg transition-shadow">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-4 rounded-xl bg-muted">
                  <Image
                    src="/fitgirl.jpg"
                    alt="FitGirl Repacks"
                    height={120}
                    width={120}
                    className="w-24 h-24 object-contain rounded-2xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  <CardTitle className="text-2xl">FitGirl Repacks</CardTitle>
                  <Badge variant="destructive" className="gap-1">
                    Torrent Required
                  </Badge>
                </div>
                <CardDescription className="text-base">
                  High-quality Compressed Repacks
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="grow">
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Easy One-click downloads in Vault Launcher
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Zap className="w-5 h-5 mt-0.5 shrink-0 text-primary" />
                  <p className="text-sm text-muted-foreground">
                    Downloads With Torrents
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="">
              <Button className="w-full group" asChild>
                <Link href="/sources/fitgirl">
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
        <p className="text-sm text-muted-foreground text-center mt-4">
          SteamRIP is recommended for most users.
        </p>
      </div>
    </section>
  );
}

export default Sources;
