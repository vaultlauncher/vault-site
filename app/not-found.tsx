import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-6xl font-extrabold">404</CardTitle>
          <CardDescription className="text-lg">Page not found</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-sm text-muted-foreground">
            We couldn’t find the page you were looking for. It may have been
            moved or deleted.
          </p>
          <div className="flex justify-center">
            <Link href="/" aria-label="Go home">
              <Button>Go back home</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
