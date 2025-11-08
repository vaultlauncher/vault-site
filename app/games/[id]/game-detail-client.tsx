"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download, Zap } from "lucide-react";
import { useState } from "react";

interface GameDetail {
  steam_appid?: number;
  name?: string;
  short_description?: string;
  detailed_description?: string;
  developers?: string[];
  publishers?: string[];
  release_date?: {
    date?: string;
  };
  price_overview?: {
    final_formatted?: string;
  };
  screenshots?: Array<{
    path_thumbnail: string;
  }>;
  [key: string]: unknown;
}



interface GameDetailClientProps {
  game: GameDetail;
}

export function GameDetailClient({ game }: GameDetailClientProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hoveredScreenshot, setHoveredScreenshot] = useState<number | null>(
    null
  );

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <div
            className="relative overflow-hidden rounded-lg shadow-lg transition-opacity duration-500"
            style={{ opacity: imageLoaded ? 1 : 0 }}
          >
            <Image
              src={`https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.steam_appid}/header.jpg?t=1749053861`}
              alt={game.name || "Game hero image"}
              width={600}
              height={300}
              className="w-full rounded-lg"
              onLoad={() => setImageLoaded(true)}
            />
          </div>

          <h1
            className="text-3xl md:text-4xl font-bold mt-6 transition-opacity duration-700"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transitionDelay: "200ms",
            }}
          >
            {game.name}
          </h1>
          <p
            className="text-muted-foreground mt-2 transition-opacity duration-700"
            style={{
              opacity: imageLoaded ? 1 : 0,
              transitionDelay: "400ms",
            }}
          >
            {game.short_description}
          </p>
        </div>

        <div
          className="space-y-6 transition-opacity duration-700"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transitionDelay: "600ms",
          }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Game Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>
                <strong>App ID:</strong> {game.steam_appid}
              </p>
              <p>
                <strong>Developer:</strong> {game.developers?.join(", ")}
              </p>
              <p>
                <strong>Publisher:</strong> {game.publishers?.join(", ")}
              </p>
              <p>
                <strong>Release Date:</strong> {game.release_date?.date}
              </p>
              {game.price_overview && (
                <p>
                  <strong>Price:</strong> {game.price_overview.final_formatted}
                </p>
              )}
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="flex-1 font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button
              variant="secondary"
              className="flex-1 font-semibold"
              onClick={() => {
                window.location.href = `vault://game/${game.steam_appid}`;
              }}
            >
              <Zap className="w-4 h-4 mr-2" />
              Open in Vault
            </Button>
          </div>
        </div>
      </div>

      {game.detailed_description && (
        <Card
          className="mb-8 transition-opacity duration-700"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transitionDelay: "800ms",
          }}
        >
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              dangerouslySetInnerHTML={{
                __html: game.detailed_description,
              }}
            />
          </CardContent>
        </Card>
      )}

      {game.screenshots && game.screenshots.length > 0 && (
        <Card
          className="transition-opacity duration-700"
          style={{
            opacity: imageLoaded ? 1 : 0,
            transitionDelay: "1000ms",
          }}
        >
          <CardHeader>
            <CardTitle>Screenshots</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {game.screenshots.slice(0, 4).map((screenshot, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg transition-transform duration-300"
                  style={{
                    transform:
                      hoveredScreenshot === index ? "scale(1.05)" : "scale(1)",
                  }}
                  onMouseEnter={() => setHoveredScreenshot(index)}
                  onMouseLeave={() => setHoveredScreenshot(null)}
                >
                  <Image
                    src={screenshot.path_thumbnail}
                    alt={`Screenshot ${index + 1}`}
                    width={300}
                    height={169}
                    className="rounded-lg w-full"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
