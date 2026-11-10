import type { ReactNode } from "react";

/* ---------- Layout ---------- */

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  tinted?: boolean;
  children: ReactNode;
}

export function Section({ id, title, subtitle, tinted, children }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-12 md:py-16 scroll-mt-4 ${tinted ? "bg-neutral-50 border-y border-neutral-200" : ""}`}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center text-neutral-800">
            {title}
          </h2>
        )}
        {subtitle && (
          <p className="mt-3 text-center text-neutral-600 italic">{subtitle}</p>
        )}
        <div className={title ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

/* ---------- Figure ---------- */

interface FigureProps {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
}

export function Figure({ src, alt, caption, className = "" }: FigureProps) {
  return (
    <figure className={className}>
      <a href={src} target="_blank" rel="noreferrer" title="Open full-size image">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full h-auto rounded-md border border-neutral-200 bg-white cursor-zoom-in"
        />
      </a>
      {caption && (
        <figcaption className="mt-3 text-sm text-neutral-600 text-center leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- Table wrapper ---------- */

export function TableShell({
  caption,
  children,
}: {
  caption?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="overflow-x-auto rounded-md border border-neutral-300 shadow-sm">
        <table className="w-full text-sm">{children}</table>
      </div>
      {caption && (
        <p className="mt-3 text-sm text-neutral-600 text-center leading-relaxed">
          {caption}
        </p>
      )}
    </div>
  );
}

export const th = "px-4 py-3 text-sm font-semibold whitespace-nowrap";
export const td = "px-4 py-3 text-center tabular-nums whitespace-nowrap";
