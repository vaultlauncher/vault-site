import { Metadata } from "next/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Download, Shield, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "SteamRip",
  description: "Learn about SteamRip, a reliable source for game repacks.",
};

function SteamRipPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block p-4 rounded-2xl bg-muted">
            <img
              src="/steamrip.png"
              alt="SteamRip"
              className="w-32 h-32 object-contain rounded-2xl"
            />
          </div>
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              Trusted Gaming Platform
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              SteamRip
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              A trusted source for game downloads, offering reliable and
              up-to-date game files with a focus on quality and user experience.
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">What is SteamRip?</CardTitle>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed">
            <p className="text-muted-foreground">
              SteamRip specializes in providing game downloads that mirror the
              Steam experience. They focus on delivering games in a format
              that's easy to install and manage, ensuring compatibility and
              performance.
            </p>
          </CardContent>
        </Card>

        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Key Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Verified Integrity
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Reliable downloads and starred on{" "}
                      <a
                        href="https://fmhy.net/gaming#download-games"
                        className="text-primary"
                      >
                        FMHY
                      </a>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Download className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Regular Updates</CardTitle>
                    <CardDescription className="mt-2">
                      Consistent updates for game patches and DLCs, keeping your
                      library current.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Zap className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Easy Installation</CardTitle>
                    <CardDescription className="mt-2">
                      User-friendly installation processes When using Vault
                      Launcher
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Wide Selection</CardTitle>
                    <CardDescription className="mt-2">
                      Extensive library of popular titles across various genres
                      and platforms. 2000+ games available to download in Vault
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Why Trust SteamRip?</CardTitle>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed">
            <p className="text-muted-foreground">
              SteamRip stands out for its commitment to quality and reliability.
              Their downloads are designed to provide a seamless gaming
              experience, making it easy for users to access their favorite
              games. With a focus on user satisfaction and technical excellence,
              SteamRip has become a go-to platform for gaming enthusiasts.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default SteamRipPage;
