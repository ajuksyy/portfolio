"use client";

/** Grain only below the first viewport so the hero stays clean. */
export function FilmGrain() {
  return (
    <div
      className="film-grain pointer-events-none fixed inset-x-0 bottom-0 top-[100vh] z-[1] mix-blend-overlay opacity-[0.12]"
      aria-hidden
    />
  );
}
