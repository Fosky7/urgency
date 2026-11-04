import { createFileRoute, Link } from '@tanstack/react-router';

export const Route = createFileRoute('/create')({
  component: CreatePage,
});

function CreatePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-14 sm:px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Create</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight">Launch a bill campaign</h1>
      <p className="mt-3 text-base leading-relaxed text-muted-foreground">
        Module 7 adds the validated form that publishes a new bill to the deck — title, story,
        category, goal amount and photo.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to="/plan"
          className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Read the build plan
        </Link>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition hover:border-primary/40"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}
