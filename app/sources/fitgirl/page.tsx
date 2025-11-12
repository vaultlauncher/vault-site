import { Metadata } from "next/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gauge, HardDrive, RefreshCcw, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "FitGirl",
  description:
    "Learn about FitGirl, a source for high-quality game repacks with optimized compression.",
};

function FitGirlPage() {
  return (
    <div className="min-h-screen px-4 py-12">
      <div className="mx-auto max-w-5xl">
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block p-4 rounded-2xl bg-muted">
            <img
              src="/fitgirl.jpg"
              alt="FitGirl"
              className="w-32 h-32 object-contain rounded-2xl "
            />
          </div>
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              Premium Game Repacks
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              FitGirl
            </h1>
            <p className="text-muted-foreground text-xl max-w-2xl mx-auto leading-relaxed">
              Renowned for providing high-quality game repacks with exceptional
              compression techniques. Ensuring games are accessible while
              maintaining optimal performance and file sizes.
            </p>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-3xl">What is FitGirl?</CardTitle>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed">
            <p className="text-muted-foreground">
              FitGirl is a popular source for game repacks, known for their
              meticulous approach to compressing large game files without
              compromising quality. They specialize in creating repacks that are
              both efficient and reliable, allowing users to download and
              install games quickly.
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
                    <HardDrive className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Advanced Compression
                    </CardTitle>
                    <CardDescription className="mt-2">
                      State-of-the-art compression algorithms dramatically
                      reduce file sizes without quality loss.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Gauge className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      High-Quality Repacks
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Amazing repacks ensure minimal loss while maximizing
                      efficiency and filesizes.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <RefreshCcw className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">
                      Latest Game Support
                    </CardTitle>
                    <CardDescription className="mt-2">
                      Regular updates and support for the newest releases and
                      trending titles.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Community Driven</CardTitle>
                    <CardDescription className="mt-2">
                      Built with user feedback and community input to deliver
                      the best experience.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Why trust FitGirl?</CardTitle>
          </CardHeader>
          <CardContent className="text-lg leading-relaxed">
            <p className="text-muted-foreground">
              FitGirl's repacks are trusted by the gaming community for their
              consistency and quality. Whether you're looking to save storage
              space or download games faster, FitGirl provides an excellent
              solution for modern gaming needs. With years of experience and a
              dedication to excellence, FitGirl continues to set the standard
              for game repacking.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FitGirlPage;
