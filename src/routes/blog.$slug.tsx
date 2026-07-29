import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BLOG_POSTS, getPostBySlug, type BlogPost } from "@/data/blog-posts";
import { Calendar, Clock, ArrowLeft, MessageCircle } from "lucide-react";

const SITE = "https://livingspro.com";
const WA_URL =
  "https://wa.me/6285284485290?text=Halo%20Living%20Space%20Pro%2C%20saya%20mau%20konsultasi%20kanopi.";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPostBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Artikel tidak ditemukan | Living Space Pro" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.post;
    const url = `${SITE}/blog/${params.slug}`;
    return {
      meta: [
        { title: `${p.title} | Living Space Pro` },
        { name: "description", content: p.description },
        { name: "keywords", content: p.keywords },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: p.cover },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.description },
        { name: "twitter:image", content: p.cover },
        { property: "article:published_time", content: p.publishedAt },
        { property: "article:section", content: p.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.description,
            image: p.cover,
            datePublished: p.publishedAt,
            author: { "@type": "Organization", name: "Living Space Pro" },
            publisher: {
              "@type": "Organization",
              name: "Living Space Pro",
              url: SITE,
            },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  component: BlogDetail,
  notFoundComponent: NotFoundArticle,
});

function NotFoundArticle() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <h1 className="font-display text-2xl font-bold">Artikel tidak ditemukan</h1>
      <p className="mt-2 text-muted-foreground">
        Artikel yang Anda cari mungkin telah dipindahkan.
      </p>
      <Link
        to="/blog"
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Blog
      </Link>
    </main>
  );
}

function BlogDetail() {
  const { post } = Route.useLoaderData();
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 md:py-14">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Kembali ke Blog
      </Link>

      <div className="mt-6">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          {post.category}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            {new Date(post.publishedAt).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> {post.readMinutes} menit baca
          </span>
        </div>
      </div>

      <div className="mt-8 aspect-[16/9] overflow-hidden rounded-xl bg-muted">
        <img src={post.cover} alt={post.title} className="h-full w-full object-cover" />
      </div>

      <article className="mt-10 space-y-5 leading-relaxed text-foreground">
        <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        {(post.content as BlogPost["content"]).map((block, i) => {
          switch (block.type) {
            case "h2":
              return (
                <h2 key={i} className="mt-8 font-display text-2xl font-bold text-foreground">
                  {block.text}
                </h2>
              );
            case "h3":
              return (
                <h3 key={i} className="mt-6 font-display text-xl font-semibold">
                  {block.text}
                </h3>
              );
            case "p":
              return (
                <p key={i} className="text-[15px] text-foreground/90">
                  {block.text}
                </p>
              );
            case "ul":
              return (
                <ul key={i} className="ml-5 list-disc space-y-1.5 text-[15px] text-foreground/90">
                  {block.items.map((it, j) => (
                    <li key={j}>{it}</li>
                  ))}
                </ul>
              );
            case "quote":
              return (
                <blockquote
                  key={i}
                  className="border-l-4 border-accent bg-surface/60 px-5 py-4 italic text-foreground/90"
                >
                  {block.text}
                </blockquote>
              );
          }
        })}
      </article>

      {/* CTA */}
      <div className="mt-12 rounded-2xl border border-border bg-primary p-6 text-primary-foreground md:p-8">
        <h3 className="font-display text-xl font-bold">Butuh konsultasi kanopi atau renovasi?</h3>
        <p className="mt-2 text-sm text-primary-foreground/80">
          Tim Living Space Pro siap membantu survei gratis & memberikan RAB transparan sesuai
          kebutuhan Anda.
        </p>
        <a
          href={WA_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:brightness-105"
        >
          <MessageCircle className="h-4 w-4" /> Konsultasi via WhatsApp
        </a>
      </div>

      {/* Related */}
      <section className="mt-14">
        <h3 className="font-display text-lg font-bold">Artikel Terkait</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {related.map((p) => (
            <Link
              key={p.slug}
              to="/blog/$slug"
              params={{ slug: p.slug }}
              className="group overflow-hidden rounded-lg border border-border bg-card transition hover:shadow-md"
            >
              <div className="aspect-video overflow-hidden bg-muted">
                <img
                  src={p.cover}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-3">
                <h4 className="line-clamp-2 text-sm font-semibold">{p.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
