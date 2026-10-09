import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-void px-5">
      <div className="text-center">
        <p className="font-display text-6xl font-semibold text-paper md:text-8xl">404</p>
        <p className="mt-4 text-lg text-mist">Page not found</p>
        <p className="mt-2 max-w-md mx-auto text-sm text-ash">
          The resource you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-signal hover:text-flare"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>
      </div>
    </div>
  );
}