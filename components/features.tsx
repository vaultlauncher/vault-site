import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Download, Library, Github } from "lucide-react";

const features = [
  {
    title: "Fast Downloads",
    description:
      "Download your favorite Steam games quickly with our download sources.",
    icon: Download,
  },
  {
    title: "Game Library Management",
    description: "Organize and manage your game collection in Vault.",
    icon: Library,
  },
  {
    title: "Open Source",
    description: "Built with community contributions in mind.",
    icon: Github,
  },
];

export default function Features() {
  return (
    <div className="mt-16 px-4" id="features">
      <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="text-center max-w-sm">
              <CardHeader className="pb-4">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
