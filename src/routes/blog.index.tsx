import { createFileRoute, Link } from "@tanstack/react-router";
import { BLOG_POSTS } from "@/data/blog-posts";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const SITE = "https://livingspro.com";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      {
        title: "Blog Kanopi & Renovasi Rumah — Tips, Harga & Panduan | Living Space Pro",
      },
      {
        name: "description",
        content:
          "Kumpulan artikel & tips seputar kanopi, atap, renovasi rumah, dan home improvement dari Living Space Pro. Update harga material, panduan memilih kanopi, dan tips hemat renovasi 2026.",
      },
      {
        property: "og:title",
        content: "Blog Kanopi & Renovasi Rumah | Living Space Pro",
      },
      {
        property: "og:description",
        content:
          "Tips memilih kanopi, perbandingan material, harga per meter, dan panduan renovasi rumah minimalis.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/blog` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/blog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Living Space Pro Blog",
          url: `${SITE}/blog`,
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE}/blog/${p.slug}`,
            datePublished: p.publishedAt,
            image: p.cover,
            author: { "@type": "Organization", name: "Living Space Pro" },
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = BLOG_POSTS;
  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Blog & Tips
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-5xl">
          Panduan Kanopi & Renovasi Rumah
        </h1>
        <p className="mt-4 text-muted-foreground md:text-lg">
          Artikel pilihan dari tim Living Space Pro — pelajari cara memilih kanopi terbaik, hitung
          biaya per meter, hingga tips renovasi hemat.
        </p>
      </div>

      {/* Featured */}
      <Link
        to="/blog/$slug"
        params={{ slug: featured.slug }}
        className="mt-10 grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition hover:shadow-lg md:grid-cols-2"
      >
        <div className="aspect-[16/10] overflow-hidden bg-muted md:aspect-auto">
          <img
            src={featured.cover}
            alt={featured.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-center p-6 md:p-10">
          <span className="text-xs font-semibold uppercase tracking-wider text-accent">
            {featured.category}
          </span>
          <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">{featured.title}</h2>
          <p className="mt-3 text-muted-foreground">{featured.excerpt}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(featured.publishedAt).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> {featured.readMinutes} menit
            </span>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            Baca artikel <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </Link>

      {/* Grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((p) => (
          <Link
            key={p.slug}
            to="/blog/$slug"
            params={{ slug: p.slug }}
            className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition hover:shadow-lg"
          >
            <div className="aspect-[16/10] overflow-hidden bg-muted">
              <img
                src={p.cover}
                alt={p.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-accent">
                {p.category}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {p.readMinutes} menit
                </span>
                <span>
                  {new Date(p.publishedAt).toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
