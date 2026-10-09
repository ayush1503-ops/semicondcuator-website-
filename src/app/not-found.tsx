import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      <div className="grid-bg absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="relative mx-auto max-w-2xl px-5 text-center">
        <p className="kicker">ERROR 404 · ROUTE NOT FOUND</p>
        <h1 className="headline-xl mt-6 text-6xl text-paper md:text-8xl">
          <span className="text-outline">OPEN</span> <span className="text-signal">CIRCUIT.</span>
        </h1>
        <p className="mt-6 leading-relaxed text-mist">
          This net leads nowhere — the page you are looking for was moved, renamed, or never routed.
        </p>
        <Link to="/" className="btn btn-primary mt-10">
          <ArrowLeft className="h-4 w-4" /> Return to base
        </Link>
      </div>
    </section>
  );
}
