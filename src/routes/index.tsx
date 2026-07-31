import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  MessageCircle,
  ShieldCheck,
  Clock,
  Wallet,
  Ruler,
  Sparkles,
  Hammer,
  Trees,
  ArrowRight,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Star,
  Check,
  XCircle,
  ClipboardList,
  PencilRuler,
  Calculator,
  HardHat,
  KeyRound,
} from "lucide-react";
import heroImg from "@/assets/video promosi.mp4";
import kacaImg from "@/assets/kanopi-kaca.jpg";
import alderonImg from "@/assets/kanopi-alderon.jpg";
import polyImg from "@/assets/kanopi-polycarbonate.jpg";
import spandekImg from "@/assets/kanopi-spandek.jpg";
import lengkungImg from "@/assets/kanopi-lengkung.jpg";
import acpImg from "@/assets/kanopi-acp.jpg";
import skylightImg from "@/assets/kanopi-skylight.jpg";
import mezaninImg from "@/assets/kanopi-mezanin.jpg";
import logoAsset from "@/assets/brand-logo.png";
import { AiCanopyEstimator } from "@/components/AiCanopyEstimator";

const WA_URL =
  "https://wa.me/6285284485290?text=Halo%20Living%20Space%20Pro%2C%20saya%20ingin%20konsultasi%20gratis%20kanopi.";

const SITE_URL = "https://livingspro.com";
const OG_IMAGE =
  "https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5fd5e209-8871-429f-89ab-d1c0d9c70cbc";

const SEO_TITLE = "Jasa Kanopi Premium Jakarta & Home Improvement | Living Space Pro";
const SEO_DESC =
  "Living Space Production (livingspro.com) — spesialis pembuatan & pemasangan Kanopi Kaca, Alderon, Polycarbonate, Membrane. Gratis survei, RAB transparan, garansi hingga 1 tahun.";
const SEO_KEYWORDS =
  "jasa kanopi, kanopi kaca, kanopi alderon, kanopi polycarbonate, kanopi membrane, kontraktor rumah, renovasi rumah, home improvement, livingspro, Living Space Pro, Jakarta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESC },
      { name: "keywords", content: SEO_KEYWORDS },
      { name: "robots", content: "index, follow" },
      { name: "author", content: "Living Space Pro" },
      { name: "geo.region", content: "ID-JK" },
      { name: "geo.placename", content: "Jakarta" },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:site_name", content: "Living Space Pro" },
      { property: "og:locale", content: "id_ID" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: SEO_TITLE },
      { name: "twitter:description", content: SEO_DESC },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
      {
        rel: "icon",
        type: "image/jpg",
        href: "/favicon.jpg?v=2",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "LocalBusiness",
              "@id": `${SITE_URL}/#business`,
              name: "Living Space Pro",
              url: SITE_URL,
              image: OG_IMAGE,
              telephone: "+62-852-8448-5290",
              email: "admin@livingspro.com",
              priceRange: "$$",
              description: SEO_DESC,
              address: [
                {
                  "@type": "PostalAddress",
                  name: "Workshop Bandung",
                  streetAddress: "Komplek Bukit Permata Blok F3 No.17, Cilame, Kec. Ngamprah",
                  addressLocality: "Kabupaten Bandung Barat",
                  addressRegion: "Jawa Barat",
                  addressCountry: "ID",
                },
                {
                  "@type": "PostalAddress",
                  name: "Workshop Jabodetabek",
                  streetAddress: "Jl. Dahlia 11A, Taman Beji Timur",
                  addressLocality: "Depok",
                  addressRegion: "Jawa Barat",
                  addressCountry: "ID",
                },
              ],
              areaServed: ["Jabodetabek", "Bandung Raya", "Indonesia"],
              sameAs: [
                "https://www.instagram.com/livingspacepro",
                "https://www.facebook.com/livingspacepro",
              ],
            },
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              url: SITE_URL,
              name: "Living Space Pro",
              inLanguage: "id-ID",
            },
            {
              "@type": "Service",
              serviceType: "Jasa Pembuatan & Pemasangan Kanopi",
              provider: { "@id": `${SITE_URL}/#business` },
              areaServed: "Indonesia",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Katalog Kanopi",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Kanopi Spandek Pasir" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Kanopi Alderon Single & Double Layer",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Kanopi Cordoba + Plafon ACP" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Kanopi Transparan Twinlite / Alderon",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Kanopi Lengkung Alderon / Solarflat",
                    },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Kanopi Kaca Tempered 8mm" },
                  },
                  {
                    "@type": "Offer",
                    itemOffered: { "@type": "Service", name: "Skylight Atap Sliding" },
                  },
                  { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kanopi Mezanin" } },
                ],
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Berapa lama pengerjaan pemasangan kanopi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Rata-rata 3–10 hari kerja tergantung ukuran, jenis material, dan tingkat kesulitan pemasangan.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah tersedia survei dan konsultasi gratis?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Ya. Living Space Pro memberikan survei lokasi, konsultasi desain, dan RAB penawaran secara gratis tanpa komitmen.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Apakah kanopi bergaransi?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Material dan pengerjaan bergaransi resmi hingga 1 tahun tergantung jenis kanopi yang dipilih.",
                  },
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: LandingPage,
});

const nav = [
  { label: "Beranda", href: "#beranda" },
  { label: "Layanan Kami", href: "#layanan" },
  { label: "Katalog Kanopi", href: "#katalog" },
  { label: "Proses Kerja", href: "#proses" },
  { label: "RAB AI", href: "/rab" },
  { label: "Blog", href: "/blog" },

  { label: "Kontak", href: "#kontak" },
];

const painPoints = [
  {
    title: "Bingung Estimasi Biaya Kanopi",
    desc: "Sulit tahu harga wajar per meter dan takut membengkak di tengah jalan.",
  },
  {
    title: "Takut Salah Pilih Kontraktor",
    desc: "Proyek terbengkalai, kualitas buruk, tidak ada jaminan garansi material.",
  },
  {
    title: "Sulit Memverifikasi Portofolio",
    desc: "Terlalu banyak pilihan, sulit membedakan mana tim yang benar-benar berpengalaman.",
  },
  {
    title: "Hasil Tidak Sesuai Harapan",
    desc: "Desain meleset, material tidak sesuai spesifikasi awal yang disepakati.",
  },
];

const proses = [
  {
    icon: MessageCircle,
    title: "Gratis Konsultasi",
    desc: "Diskusikan kebutuhan kanopi & renovasi rumah Anda bersama tim kami via WhatsApp.",
  },
  {
    icon: ClipboardList,
    title: "Survey Lokasi",
    desc: "Tim datang mengukur langsung ke lokasi rumah atau bangunan Anda.",
  },
  {
    icon: PencilRuler,
    title: "Desain & Proposal",
    desc: "Pembuatan desain 3D dan proposal sesuai kebutuhan, selera, serta anggaran klien.",
  },
  {
    icon: Calculator,
    title: "Perhitungan RAB Detail",
    desc: "Estimasi biaya transparan dan akurat sebelum proyek dimulai — tanpa biaya tersembunyi.",
  },
  {
    icon: HardHat,
    title: "Proses Pengerjaan",
    desc: "Fabrikasi & pemasangan oleh tim tukang profesional bersertifikat, tepat waktu.",
  },
  {
    icon: KeyRound,
    title: "Serah Terima & Garansi",
    desc: "Quality check bersama, serah terima proyek, and garansi material hingga 1 tahun.",
  },
];

const kanopi = [
  {
    name: "Kanopi Spandek Pasir",
    tag: "Ekonomis & Tahan Lama",
    desc: "Atap spandek dengan lapisan pasir untuk meredam suara hujan. Rangka besi hollow galvanis, pilihan hemat namun tetap kokoh untuk carport dan area servis.",
    img: spandekImg,
    features: ["Hollow galvanis 40x60", "Spandek pasir", "Talang air plat besi"],
  },
  {
    name: "Kanopi Alderon Single / Double Layer",
    tag: "Anti Panas & Senyap",
    desc: "Material UPVC Alderon yang meredam panas & suara hujan hingga 90%. Tersedia varian single layer maupun double layer untuk kebutuhan premium.",
    img: alderonImg,
    features: ["Alderon single / double", "Peredam panas & suara", "Anti bocor bertahun"],
  },
  {
    name: "Kanopi Cordoba + Plafon ACP",
    tag: "Estetika Premium",
    desc: "Kombinasi rangka Cordoba dengan atap Alderon double layer dan plafon ACP putih di bagian bawah. Tampilan bersih, rapi, dan mewah cocok untuk fasad rumah modern.",
    img: acpImg,
    features: ["Rangka Cordoba", "Alderon double layer", "Plafon ACP white"],
  },
  {
    name: "Kanopi Transparan (Twinlite / Alderon)",
    tag: "Cahaya Alami",
    desc: "Atap transparan Twinlite Grecca atau Alderon Transparan yang tetap meneruskan cahaya matahari tanpa panas berlebih. Ideal untuk area jemur atau taman.",
    img: polyImg,
    features: ["Twinlite grecca / Alderon transparan", "UV protection", "Cahaya masuk optimal"],
  },
  {
    name: "Kanopi Lengkung (Alderon / Solarflat)",
    tag: "Desain Modern",
    desc: "Model kanopi lengkung dengan tiang hollow 100x100 dan penutup Alderon single/double layer atau Solarflat transparan. Siluet arsitektural elegan.",
    img: lengkungImg,
    features: ["Rangka lengkung custom", "Alderon / Solarflat 3mm", "Tiang hollow 100x100"],
  },
  {
    name: "Kanopi Kaca Tempered 8mm",
    tag: "Mewah & Elegan",
    desc: "Kanopi kaca tempered 8mm dengan rangka hollow 50x100 atau IWF/HBEAM sesuai kebutuhan. Tampilan bening premium untuk teras & pintu masuk utama.",
    img: kacaImg,
    features: ["Tempered glass 8mm", "Rangka hollow / IWF", "Estetika arsitektural"],
  },
  {
    name: "Skylight Atap Sliding",
    tag: "Sliding Manual & Otomatis",
    desc: "Skylight rumah dengan atap Alderon, Solarflat, Twinlite atau Kaca Tempered. Tersedia permanen, sliding katrol manual, dan sliding otomatis dengan motor.",
    img: skylightImg,
    features: ["Permanent / Sliding", "Kaca tempered / Solarflat", "Motor sliding tersedia"],
  },
  {
    name: "Kanopi Mezanin",
    tag: "Struktur Lantai Tambahan",
    desc: "Struktur lantai mezanin dengan tiang hollow 100x100 / IWF, alas plat bordes atau kalsifloor 20mm, sudah termasuk railing balkon. Solusi cepat menambah ruang.",
    img: mezaninImg,
    features: [
      "Plat bordes / Kalsifloor 20mm",
      "Include railing balkon",
      "Tangga opsional per set",
    ],
  },
];

const whyUs = [
  {
    icon: Ruler,
    title: "Gratis Survei & Desain",
    desc: "Tim kami datang mengukur, konsultasi desain, dan memberikan penawaran tanpa biaya.",
  },
  {
    icon: Wallet,
    title: "Harga Transparan",
    desc: "RAB detail per item, tanpa biaya tersembunyi. Anda tahu setiap rupiahnya.",
  },
  {
    icon: ShieldCheck,
    title: "Material Berkualitas & Bergaransi",
    desc: "Rangka SNI dan penutup atap bergaransi hingga 1 tahun sesuai jenis.",
  },
  {
    icon: Clock,
    title: "Tepat Waktu",
    desc: "Timeline pengerjaan jelas dan dieksekusi oleh tim tukang profesional bersertifikat.",
  },
];

const layananLain = [
  {
    icon: Sparkles,
    title: "Interior",
    desc: "Kitchen set, wardrobe, partisi ruangan, plafon, dan built-in furniture custom.",
  },
  {
    icon: Hammer,
    title: "Eksterior",
    desc: "Pagar minimalis, carport, railing tangga, dan fasad rumah.",
  },
  {
    icon: Trees,
    title: "Taman & Landscape",
    desc: "Desain taman kering, decking kayu, dan area outdoor keluarga.",
  },
];

const testimonials = [
  {
    name: "Budi Santoso",
    role: "Pemilik Rumah, BSD",
    text: "Kanopi kaca dari Living Space Pro benar-benar mengubah tampilan teras kami. Pengerjaan rapi, timnya sopan, dan hasilnya persis seperti render 3D awal.",
  },
  {
    name: "Rina Wijaya",
    role: "Pemilik Cafe, Bandung",
    text: "Pasang kanopi membrane untuk outdoor cafe. Prosesnya cepat, materialnya premium, dan pelanggan jadi lebih betah nongkrong meski gerimis.",
  },
  {
    name: "Andi Pratama",
    role: "Pemilik Rumah, Bekasi",
    text: "Awalnya cuma mau ganti kanopi carport, akhirnya sekalian renovasi kitchen set. Harga transparan, tepat waktu, hasilnya bikin rumah terasa baru.",
  },
];
const socialLinks = [
  {
    icon: Instagram,
    href: "https://www.instagram.com/livingspacepro",
    label: "Instagram Living Space Pro",
  },
  {
    icon: Facebook,
    href: "https://www.facebook.com/livingspacepro",
    label: "Facebook Living Space Pro",
  },
  {
    icon: Youtube,
    href: "https://www.youtube.com/@livingspacepro",
    label: "Youtube Living Space Pro",
  },
];
function LandingPage() {
  const [open, setOpen] = useState(false);
  // Script paksa ubah Favicon ke file di folder public
  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = "/favicon.jpg?v=1";
  }, []);
  return (
    <div id="beranda" className="min-h-screen bg-background text-foreground">
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <a href="#beranda" className="flex items-center gap-3 min-w-0">
            <img
              src={logoAsset}
              alt="Living Space Pro logo"
              width={96}
              height={96}
              className="h-10 w-10 shrink-0 object-contain sm:h-12 sm:w-12"
            />
            <div className="min-w-0 leading-tight">
              <div className="truncate font-display text-sm font-bold sm:text-base">
                Living Space Pro
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                livingspro.com
              </div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi Gratis
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-background md:hidden">
            <div className="flex flex-col px-6 py-4">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="py-3 text-sm text-foreground"
                >
                  {n.label}
                </a>
              ))}
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground"
              >
                <MessageCircle className="h-4 w-4" /> Konsultasi Gratis
              </a>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 md:py-24 md:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Spesialis Kanopi & Home Improvement
            </span>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Ubah Kanopi Rumah Jadi Mewah,{" "}
              <span className="text-primary">Nyaman & Berkarakter.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Living Space Production adalah Perusahaan konstruksi dibidang spesialis pembuatan
              kanopi premium untuk melindungi sekaligus mempercantik rumah, cafe, dan hunian modern
              Anda.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#katalog"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5"
              >
                Lihat Model Kanopi <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href={WA_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold text-foreground hover:bg-surface"
              >
                <MessageCircle className="h-4 w-4" /> Chat via WhatsApp
              </a>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-6 text-left">
              {[
                { k: "100+", v: "Proyek Selesai" },
                { k: "1 Th", v: "Garansi Material" },
                { k: "4.9/5", v: "Rating Klien" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="font-display text-2xl font-bold text-foreground md:text-3xl">
                    {s.k}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-transparent blur-2xl" />
            <img
              src={heroImg}
              alt="Rumah modern dengan kanopi kaca elegan karya Living Space Pro"
              width={1024}
              height={1024}
              className="aspect-square w-full rounded-2xl object-cover shadow-2xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden max-w-[220px] rounded-xl border border-border bg-card p-4 shadow-lg md:block">
              <div className="flex items-center gap-2 text-accent">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold text-foreground">Bergaransi</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Material & pengerjaan bergaransi hingga 1 tahun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI CANOPY ESTIMATOR */}
      <AiCanopyEstimator />

      {/* PAIN POINTS */}
      <section className="border-t border-border bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Masalah Umum
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Bingung Mulai Bangun atau Renovasi Rumah dari Mana?
            </h2>
            <p className="mt-4 text-primary-foreground/75">
              Banyak pemilik rumah ingin membangun atau merenovasi, tapi sering menghadapi masalah
              berikut:
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {painPoints.map((p) => (
              <div
                key={p.title}
                className="flex items-start gap-4 rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 backdrop-blur"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-destructive/20 text-destructive-foreground">
                  <XCircle className="h-5 w-5 text-red-300" />
                </div>
                <div>
                  <div className="font-semibold text-primary-foreground">{p.title}</div>
                  <p className="mt-1 text-sm text-primary-foreground/70">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground"
            >
              <MessageCircle className="h-4 w-4" /> Konsultasi Gratis Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* KATALOG KANOPI */}
      <section id="katalog" className="border-t border-border bg-surface/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Hero Product
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Pilihan Kanopi Terbaik untuk Hunian Anda
            </h2>
            <p className="mt-4 text-muted-foreground">
              Setiap kanopi kami dirancang, difabrikasi, dan dipasang oleh tim ahli — dengan standar
              material premium, presisi arsitektural, dan garansi tertulis.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {kanopi.map((k) => (
              <article
                key={k.name}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={k.img}
                    alt={k.name}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
                    {k.tag}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold">{k.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{k.desc}</p>
                  <ul className="mt-4 space-y-2">
                    {k.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                  >
                    Minta Penawaran <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="grid gap-6 md:grid-cols-4">
              {[
                "Material Bergaransi",
                "Pengerjaan Cepat & Rapi",
                "Tim Ahli Berpengalaman",
                "Desain Custom Sesuai Rumah",
              ].map((v) => (
                <div key={v} className="flex items-start gap-3">
                  <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-md bg-primary/10 text-primary">
                    <Check className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Layanan Lainnya
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
                Solusi Interior & Eksterior Lengkap
              </h2>
              <p className="mt-4 text-muted-foreground">
                Selain kanopi, Living Space Pro melayani berbagai kebutuhan home improvement — dari
                kitchen set hingga taman modern — dengan pendekatan desain yang konsisten.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {layananLain.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-accent/15 text-accent">
                  <s.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROSES KERJA */}
      <section id="proses" className="border-t border-border bg-surface/60 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Cara Kerja
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Proses Mudah Bersama Living Space Pro
            </h2>
            <p className="mt-4 text-muted-foreground">
              Enam langkah sederhana dari konsultasi hingga serah terima proyek dengan garansi.
            </p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {proses.map((p, i) => (
              <div
                key={p.title}
                className="relative flex items-start gap-5 rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-primary font-display text-lg font-bold text-primary-foreground">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p.icon className="h-4 w-4 text-accent" />
                    <h3 className="font-display text-base font-bold">{p.title}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="border-y border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Why Choose Us
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Mengapa Ratusan Klien Memilih Living Space Pro
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyUs.map((w) => (
              <div
                key={w.title}
                className="rounded-2xl border border-primary-foreground/15 bg-primary-foreground/5 p-6 backdrop-blur"
              >
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent text-accent-foreground">
                  <w.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold">{w.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/75">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTOFOLIO / TESTIMONI */}
      <section id="portofolio" className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Testimoni Klien
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">
              Cerita dari Rumah yang Sudah Kami Kerjakan
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-foreground">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 border-t border-border pt-4">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="kontak" className="pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface p-10 md:p-16">
            <div className="grid gap-8 md:grid-cols-2 md:items-center">
              <div>
                <img
                  src={logoAsset}
                  alt="Living Space Pro logo"
                  width={128}
                  height={128}
                  className="mb-6 h-16 w-16 object-contain sm:h-20 sm:w-20"
                />
                <h2 className="font-display text-3xl font-bold md:text-4xl">
                  Siap merenovasi rumah Anda?
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Konsultasikan kebutuhan kanopi atau renovasi Anda. Gratis survei lokasi dan desain
                  awal — tanpa komitmen.
                </p>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground"
                >
                  <MessageCircle className="h-4 w-4" /> Konsultasi Gratis Sekarang
                </a>
              </div>
              <div className="grid gap-4">
                <ContactRow icon={Phone} label="Telepon / WhatsApp" value="+62 852-8448-5290" />
                <ContactRow icon={Mail} label="Email" value="admin@livingspro.com" />
                <ContactRow
                  icon={MapPin}
                  label="Workshop Bandung"
                  value="Komplek Bukit Permata Blok F3 No.17, Cilame, Kec. Ngamprah, Kab. Bandung Barat, Jawa Barat"
                />
                <ContactRow
                  icon={MapPin}
                  label="Workshop Jabodetabek"
                  value="Jl. Dahlia 11A, Taman Beji Timur, Depok"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border bg-surface">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <img
                  src={logoAsset}
                  alt="Living Space Pro logo"
                  width={96}
                  height={96}
                  className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
                />
                <div className="min-w-0">
                  <div className="truncate font-display text-base font-bold">Living Space Pro</div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    livingspro.com
                  </div>
                </div>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                Spesialis desain & konstruksi kanopi premium serta home improvement interior dan
                eksterior untuk hunian modern.
              </p>
              <div className="mt-6 flex gap-3">
                {socialLinks.map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-md border border-border bg-background text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Navigasi</div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {nav.map((n) => (
                  <li key={n.href}>
                    <a href={n.href} className="hover:text-foreground">
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold">Kontak</div>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0" /> +62 852-8448-5290
                </li>
                <li className="flex items-start gap-2">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0" /> admin@livingspro.com
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="text-foreground">Workshop Bandung:</strong> Komplek Bukit
                    Permata Blok F3 No.17, Cilame, Kec. Ngamprah, Kab. Bandung Barat, Jawa Barat
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                  <span>
                    <strong className="text-foreground">Workshop Jabodetabek:</strong> Jl. Dahlia
                    11A, Taman Beji Timur, Depok
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
            <div>Copyright © 2026 Living Space Pro. All rights reserved.</div>
            <div>livingspro.com</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4">
      <div className="grid h-10 w-10 place-items-center rounded-md bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="mt-0.5 text-sm font-semibold">{value}</div>
      </div>
    </div>
  );
}
