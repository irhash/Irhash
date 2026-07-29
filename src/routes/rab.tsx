import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState, Fragment } from "react";
import {
  Sparkles,
  Send,
  Calculator,
  MessageCircle,
  Loader2,
  Bot,
  User as UserIcon,
  Printer,
  Copy,
  Plus,
  Trash2,
  SlidersHorizontal,
  FileSpreadsheet,
  Check,
  Building2,
  Wrench,
  Home,
  ShieldCheck,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { generateContractorRabFn } from "@/lib/rab.functions";
import type { ContractorRabData, ContractorRabItem } from "@/lib/gemini.server";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import logoAsset from "@/assets/brand-logo.png";

const WA_NUMBER = "6285284485290";
const SITE = "https://livingspro.com";

export const Route = createFileRoute("/rab")({
  head: () => ({
    meta: [
      {
        title: "AI RAB Kontraktor & Renovasi — Generator Rab Bangunan & Kanopi | Living Space Pro",
      },
      {
        name: "description",
        content:
          "Generator Rencana Anggaran Biaya (RAB) AI untuk Kontraktor & Pemilik Proyek. Otomatis hitung biaya renovasi, bangun rumah, kanopi, dapur, kamar mandi, pagar, dan dak cor dengan acuan HSPK pasar terbaru.",
      },
      {
        property: "og:title",
        content: "AI RAB Kontraktor & Renovasi | Living Space Pro",
      },
      {
        property: "og:description",
        content:
          "Buat RAB Konstruksi & Renovasi otomatis dengan AI. Lengkap dengan rincian material, upah tukang, overhead & profit, serta durasi pengerjaan.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE}/rab` },
    ],
    links: [{ rel: "canonical", href: `${SITE}/rab` }],
  }),
  component: RabPage,
});

function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(amount);
}

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  rabData?: ContractorRabData;
}

const PRESET_CATEGORIES = [
  {
    label: "Kanopi & Atap",
    icon: Home,
    prompt:
      "Hitungkan RAB kanopi carport 5x4 meter pakai atap alderon double layer dan rangka holo galvanis 40x80.",
  },
  {
    label: "Renovasi Dapur",
    icon: Wrench,
    prompt:
      "Buatkan RAB renovasi dapur 3x3 meter termasuk meja cor, granit 60x60, backsplash, kitchen sink, dan instalasi air/listrik.",
  },
  {
    label: "Renovasi Kamar Mandi",
    icon: Building2,
    prompt:
      "RAB renovasi kamar mandi 2x2 meter full keramik dinding, kloset duduk Toto, shower set, dan waterproofing Sika.",
  },
  {
    label: "Pagar & Eksterior",
    icon: ShieldCheck,
    prompt:
      "Hitungkan RAB pembuatan pagar minimalis panjang 8 meter tinggi 1.8 meter rangka besi holo dan woodplank + fondasi batu kali.",
  },
  {
    label: "Dak Cor Beton",
    icon: Calculator,
    prompt:
      "Buatkan RAB dak cor beton lantai 2 ukuran 6x5 meter pakai bondek 0.75mm, wiremesh M8, dan Jayamix K-250.",
  },
  {
    label: "Bangun / Renovasi Rumah",
    icon: Building2,
    prompt:
      "RAB bangun rumah / renovasi total 1 lantai luas 60 m2 dengan struktur hebel, baja ringan, plafon gypsum, dan granit.",
  },
];

function RabPage() {
  const generateRab = useServerFn(generateContractorRabFn);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-init",
      role: "assistant",
      text: "Halo! Saya **AI Quantity Surveyor & Estimator Kontraktor** dari Living Space Pro. \n\nSaya bisa menghitung Rencana Anggaran Biaya (RAB) otomatis untuk berbagai proyek kontraktor & renovasi: **Kanopi, Renovasi Dapur & Kamar Mandi, Pembuatan Pagar, Dak Cor Beton, Pengecatan, hingga Bangun/Renovasi Rumah Total**. \n\nCeritakan proyek Anda atau klik salah satu contoh di bawah ini!",
    },
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  const handleSend = async (customPrompt?: string) => {
    const promptText = (customPrompt || input).trim();
    if (!promptText || loading) return;

    if (!customPrompt) setInput("");

    const userMsgId = `user-${Date.now()}`;
    setMessages((m) => [...m, { id: userMsgId, role: "user", text: promptText }]);
    setLoading(true);

    try {
      const res = await generateRab({ data: { prompt: promptText } });

      if (res.status === "need_clarification") {
        setMessages((m) => [
          ...m,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            text:
              res.clarification ||
              "Bisa sebutkan detail ukuran atau jenis pekerjaan yang ingin dihitung?",
          },
        ]);
      } else if (res.status === "ok" && res.data) {
        setMessages((m) => [
          ...m,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            text:
              res.data.summaryMessage ||
              `Berikut rincian RAB Kontraktor untuk **${res.data.projectName}**.`,
            rabData: res.data,
          },
        ]);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            text: "Maaf, sistem tidak dapat memproses format permintaan tersebut. Silakan sebutkan jenis pekerjaan dan ukurannya.",
          },
        ]);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menghubungi AI.";
      setMessages((m) => [
        ...m,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          text: `⚠️ Kendala Sistem: ${msg}. Silakan coba kembali.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground print:bg-white print:text-black">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/90 backdrop-blur-md print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset}
              alt="Living Space Pro"
              className="h-10 w-10 object-contain sm:h-11 sm:w-11"
            />
            <div className="leading-tight">
              <div className="font-display text-sm font-bold sm:text-base">Living Space Pro</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                AI RAB KONTRAKTOR
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-xs font-medium sm:text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Beranda
            </Link>
            <Link to="/blog" className="text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Link to="/rab" className="font-semibold text-primary">
              RAB Kontraktor AI
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-10">
        {/* Title Banner */}
        <div className="mb-6 text-center print:hidden">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Generative AI Quantity Surveyor
          </span>
          <h1 className="mt-3 font-display text-2xl font-bold md:text-4xl">
            AI RAB Kontraktor & Renovasi
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-xs text-muted-foreground md:text-sm">
            Sistem estimasi RAB cerdas berbasis acuan HSPK & pasar terbaru. Lengkap dengan rincian
            material, upah tukang, penyesuaian overhead/profit kontraktor, dan opsi ekspor resmi.
          </p>
        </div>

        {/* Quick Category Chips */}
        <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 print:hidden">
          {PRESET_CATEGORIES.map((preset) => {
            const IconComp = preset.icon;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => handleSend(preset.prompt)}
                disabled={loading}
                className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-border bg-card p-3 text-center transition hover:border-primary hover:bg-primary/5 hover:shadow-sm active:scale-95 disabled:opacity-50"
              >
                <IconComp className="h-5 w-5 text-primary" />
                <span className="text-[11px] font-semibold text-foreground leading-tight">
                  {preset.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Chat / RAB Workspace Container */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 print:border-none print:shadow-none">
          <div
            ref={scrollRef}
            className="max-h-[700px] overflow-y-auto p-4 md:p-6 print:max-h-none print:overflow-visible"
          >
            <div className="space-y-6">
              {messages.map((m) => (
                <ChatBubble key={m.id} message={m} copiedId={copiedId} setCopiedId={setCopiedId} />
              ))}

              {loading && (
                <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-primary">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <div>
                    <div className="font-semibold">
                      AI sedang menganalisis spesifikasi & menghitung RAB...
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Mengkalkulasi volume material, standar upah tukang HSPK, dan overhead proyek.
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Prompt Composer */}
          <div className="border-t border-border bg-surface/60 p-3 md:p-4 print:hidden">
            <div className="flex items-end gap-2">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                rows={2}
                placeholder="Ceritakan proyek Anda... Contoh: 'RAB renovasi dapur 3x4 meter meja granit' atau 'Hitungkan kanopi kaca 6x4m'"
                className="min-h-[56px] flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="inline-flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition hover:brightness-110 active:scale-95 disabled:opacity-50"
                aria-label="Kirim Permintaan RAB"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </div>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-muted-foreground">
              <span>
                💡 **Tips Kontraktor:** Anda dapat menyesuaikan persentase Overhead & Profit
                (5%-25%) langsung pada tabel RAB yang dihasilkan.
              </span>
              <span className="font-medium text-primary">Powered by Gemini AI</span>
            </div>
          </div>
        </div>

        {/* Informational Cards for Contractors */}
        <div className="mt-10 grid gap-4 md:grid-cols-3 print:hidden">
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <Calculator className="h-4 w-4 text-primary" />
              <span>Acuan HSPK / AHSP Standard</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Perhitungan menggunakan standar Analisa Harga Satuan Pekerjaan (AHSP) konstruksi
              Indonesia terbaru untuk akurasi tinggi.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span>Fleksibilitas Kontraktor</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Bisa menyesuaikan margin overhead/profit, mengubah harga satuan, serta menambah atau
              menghapus baris item pekerjaan.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-center gap-2 font-semibold text-foreground">
              <FileSpreadsheet className="h-4 w-4 text-primary" />
              <span>Siap Kirim & Cetak</span>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Format proposal profesional lengkap dengan tombol cetak PDF, copy tabel Excel, dan
              pengiriman langsung via WhatsApp.
            </p>
          </div>
        </div>
      </main>

      <FloatingWhatsApp />
    </div>
  );
}

function ChatBubble({
  message,
  copiedId,
  setCopiedId,
}: {
  message: ChatMessage;
  copiedId: string | null;
  setCopiedId: (id: string | null) => void;
}) {
  const isUser = message.role === "user";

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "print:block"}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full print:hidden ${
          isUser ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
        }`}
      >
        {isUser ? <UserIcon className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>
      <div className={`flex-1 ${isUser ? "max-w-[85%] text-right" : "w-full"}`}>
        <div
          className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed print:bg-transparent print:p-0 ${
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-surface text-foreground print:text-black"
          }`}
        >
          <div className="whitespace-pre-wrap">{message.text}</div>
        </div>

        {message.role === "assistant" && message.rabData && (
          <div className="mt-4">
            <InteractiveRabTable
              initialData={message.rabData}
              messageId={message.id}
              copiedId={copiedId}
              setCopiedId={setCopiedId}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function InteractiveRabTable({
  initialData,
  messageId,
  copiedId,
  setCopiedId,
}: {
  initialData: ContractorRabData;
  messageId: string;
  copiedId: string | null;
  setCopiedId: (id: string | null) => void;
}) {
  const [rab, setRab] = useState<ContractorRabData>(initialData);
  const [editingOverhead, setEditingOverhead] = useState(false);
  const [showTechNotes, setShowTechNotes] = useState(true);

  // Recalculate RAB whenever items, overheadPercent, or contingencyPercent changes
  const updateOverhead = (newOverhead: number) => {
    const overheadPercent = Math.max(0, Math.min(50, newOverhead));
    setRab((prev) => {
      const directCost = prev.subtotalDirectCost;
      const overheadAmount = Math.round((directCost * overheadPercent) / 100);
      const contingencyAmount = Math.round((directCost * prev.contingencyPercent) / 100);
      const totalRab = directCost + overheadAmount + contingencyAmount;
      const hargaPerM2 = prev.areaM2 ? Math.round(totalRab / prev.areaM2) : undefined;

      return {
        ...prev,
        overheadPercent,
        overheadAmount,
        totalRab,
        hargaPerM2,
      };
    });
  };

  const updateContingency = (newContingency: number) => {
    const contingencyPercent = Math.max(0, Math.min(20, newContingency));
    setRab((prev) => {
      const directCost = prev.subtotalDirectCost;
      const overheadAmount = Math.round((directCost * prev.overheadPercent) / 100);
      const contingencyAmount = Math.round((directCost * contingencyPercent) / 100);
      const totalRab = directCost + overheadAmount + contingencyAmount;
      const hargaPerM2 = prev.areaM2 ? Math.round(totalRab / prev.areaM2) : undefined;

      return {
        ...prev,
        contingencyPercent,
        contingencyAmount,
        totalRab,
        hargaPerM2,
      };
    });
  };

  const updateItem = (id: string, field: keyof ContractorRabItem, value: string | number) => {
    setRab((prev) => {
      const updatedItems = prev.items.map((item) => {
        if (item.id !== id) return item;

        const newItem = { ...item, [field]: value };
        if (field === "volume" || field === "hargaSatuan") {
          newItem.subtotal = Math.round(Number(newItem.volume) * Number(newItem.hargaSatuan));
        }
        return newItem;
      });

      const directCost = updatedItems.reduce((acc, curr) => acc + curr.subtotal, 0);
      const overheadAmount = Math.round((directCost * prev.overheadPercent) / 100);
      const contingencyAmount = Math.round((directCost * prev.contingencyPercent) / 100);
      const totalRab = directCost + overheadAmount + contingencyAmount;
      const hargaPerM2 = prev.areaM2 ? Math.round(totalRab / prev.areaM2) : undefined;

      return {
        ...prev,
        items: updatedItems,
        subtotalDirectCost: directCost,
        overheadAmount,
        contingencyAmount,
        totalRab,
        hargaPerM2,
      };
    });
  };

  const deleteItem = (id: string) => {
    setRab((prev) => {
      const updatedItems = prev.items.filter((item) => item.id !== id);
      const directCost = updatedItems.reduce((acc, curr) => acc + curr.subtotal, 0);
      const overheadAmount = Math.round((directCost * prev.overheadPercent) / 100);
      const contingencyAmount = Math.round((directCost * prev.contingencyPercent) / 100);
      const totalRab = directCost + overheadAmount + contingencyAmount;
      const hargaPerM2 = prev.areaM2 ? Math.round(totalRab / prev.areaM2) : undefined;

      return {
        ...prev,
        items: updatedItems,
        subtotalDirectCost: directCost,
        overheadAmount,
        contingencyAmount,
        totalRab,
        hargaPerM2,
      };
    });
  };

  const addItem = () => {
    const newItem: ContractorRabItem = {
      id: `custom-${Date.now()}`,
      category: "VI. PEKERJAAN TAMBAHAN / KHUSUS",
      item: "Item Pekerjaan Baru",
      volume: 1,
      satuan: "ls",
      hargaSatuan: 500000,
      subtotal: 500000,
      notes: "Kustomisasi kontraktor",
    };

    setRab((prev) => {
      const updatedItems = [...prev.items, newItem];
      const directCost = updatedItems.reduce((acc, curr) => acc + curr.subtotal, 0);
      const overheadAmount = Math.round((directCost * prev.overheadPercent) / 100);
      const contingencyAmount = Math.round((directCost * prev.contingencyPercent) / 100);
      const totalRab = directCost + overheadAmount + contingencyAmount;
      const hargaPerM2 = prev.areaM2 ? Math.round(totalRab / prev.areaM2) : undefined;

      return {
        ...prev,
        items: updatedItems,
        subtotalDirectCost: directCost,
        overheadAmount,
        contingencyAmount,
        totalRab,
        hargaPerM2,
      };
    });
  };

  // Group items by category
  const categoriesMap = new Map<string, ContractorRabItem[]>();
  rab.items.forEach((item) => {
    const cat = item.category || "UMUM";
    if (!categoriesMap.has(cat)) {
      categoriesMap.set(cat, []);
    }
    categoriesMap.get(cat)!.push(item);
  });

  const buildWaMessage = () => {
    const lines = [
      `*PROPOSAL RAB KONTRAKTOR — LIVING SPACE PRO*`,
      `*Proyek:* ${rab.projectName}`,
      `*Kategori:* ${rab.category}`,
      `*Estimasi Durasi:* ${rab.estimatedDuration}`,
      `*Alokasi Tenaga:* ${rab.workersCount}`,
      "",
      `*RINCIAN PEKERJAAN:*`,
    ];

    Array.from(categoriesMap.entries()).forEach(([cat, items]) => {
      lines.push(`\n*${cat}*`);
      items.forEach((item) => {
        lines.push(
          `• ${item.item}: ${item.volume} ${item.satuan} × ${formatRupiah(item.hargaSatuan)} = ${formatRupiah(item.subtotal)}`,
        );
      });
    });

    lines.push(
      "",
      `*Subtotal Biaya Langsung:* ${formatRupiah(rab.subtotalDirectCost)}`,
      `*Overhead & Profit Kontraktor (${rab.overheadPercent}%):* ${formatRupiah(rab.overheadAmount)}`,
      `*Biaya Tak Terduga / Contingency (${rab.contingencyPercent}%):* ${formatRupiah(rab.contingencyAmount)}`,
      `---------------------------------------`,
      `*TOTAL RAB PROYEK: ${formatRupiah(rab.totalRab)}*`,
      rab.hargaPerM2 ? `*Estimasi Biaya / m²:* ${formatRupiah(rab.hargaPerM2)}` : "",
      "",
      "Mohon dijadwalkan survey lokasi untuk verifikasi lapangan & penandatanganan SPK. Terima kasih!",
    );

    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines.filter(Boolean).join("\n"))}`;
  };

  const handleCopyText = () => {
    const textLines = [
      `=== RAB KONTRAKTOR LIVING SPACE PRO ===`,
      `Proyek: ${rab.projectName}`,
      `Kategori: ${rab.category}`,
      `Lokasi Benchmark: ${rab.location}`,
      `Estimasi Durasi: ${rab.estimatedDuration}`,
      `Tenaga Kerja: ${rab.workersCount}`,
      "",
      "--- RINCIAN BIAYA ---",
    ];

    Array.from(categoriesMap.entries()).forEach(([cat, items]) => {
      textLines.push(`\n${cat}`);
      items.forEach((item) => {
        textLines.push(
          `- ${item.item} (${item.volume} ${item.satuan} x ${formatRupiah(item.hargaSatuan)}) = ${formatRupiah(item.subtotal)}`,
        );
      });
    });

    textLines.push(
      "",
      `Subtotal Biaya Langsung: ${formatRupiah(rab.subtotalDirectCost)}`,
      `Overhead & Profit Kontraktor (${rab.overheadPercent}%): ${formatRupiah(rab.overheadAmount)}`,
      `Biaya Tak Terduga (${rab.contingencyPercent}%): ${formatRupiah(rab.contingencyAmount)}`,
      `TOTAL ESTIMASI RAB: ${formatRupiah(rab.totalRab)}`,
    );

    navigator.clipboard.writeText(textLines.join("\n"));
    setCopiedId(messageId);
    setTimeout(() => setCopiedId(null), 3000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card text-left shadow-lg print:border-none print:shadow-none">
      {/* Formal Header Banner for Print & View */}
      <div className="border-b border-border bg-surface/80 p-4 md:p-5 print:border-b-2 print:border-black print:bg-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary print:border print:border-black print:bg-transparent">
                PROPOSAL KONTRAKTOR
              </span>
              <span className="text-xs text-muted-foreground">• {rab.category}</span>
            </div>
            <h2 className="mt-1 font-display text-lg font-bold text-foreground sm:text-xl print:text-black">
              {rab.projectName}
            </h2>
            <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground print:text-black">
              <span>📍 {rab.location}</span>
              <span>⏱️ Durasi: {rab.estimatedDuration}</span>
              <span>👷 {rab.workersCount}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 print:hidden">
            <button
              type="button"
              onClick={handleCopyText}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted active:scale-95"
            >
              {copiedId === messageId ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-600" /> Tersalin!
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" /> Copy Teks
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background px-3 py-1.5 text-xs font-semibold text-foreground transition hover:bg-muted active:scale-95"
            >
              <Printer className="h-3.5 w-3.5" /> Cetak / PDF
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar for Contractors */}
      <div className="border-b border-border bg-primary/5 p-3 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-semibold text-primary">
            <SlidersHorizontal className="h-4 w-4" />
            <span>Pengaturan Profit & Margin Kontraktor:</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <label htmlFor="overhead-range" className="text-muted-foreground">
                Overhead & Profit:
              </label>
              <input
                id="overhead-range"
                type="range"
                min="0"
                max="30"
                value={rab.overheadPercent}
                onChange={(e) => updateOverhead(Number(e.target.value))}
                className="h-1.5 w-20 cursor-pointer accent-primary"
              />
              <span className="w-8 font-bold text-foreground">{rab.overheadPercent}%</span>
            </div>

            <div className="flex items-center gap-1.5">
              <label htmlFor="contingency-range" className="text-muted-foreground">
                Contingency:
              </label>
              <input
                id="contingency-range"
                type="range"
                min="0"
                max="10"
                value={rab.contingencyPercent}
                onChange={(e) => updateContingency(Number(e.target.value))}
                className="h-1.5 w-16 cursor-pointer accent-primary"
              />
              <span className="w-6 font-bold text-foreground">{rab.contingencyPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main RAB Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="bg-surface/60 text-muted-foreground print:bg-gray-100 print:text-black">
            <tr>
              <th className="px-3 py-2.5 text-left font-semibold">
                Uraian Pekerjaan & Spesifikasi
              </th>
              <th className="px-2 py-2.5 text-center font-semibold w-16">Vol</th>
              <th className="px-2 py-2.5 text-center font-semibold w-16">Sat</th>
              <th className="px-3 py-2.5 text-right font-semibold">Harga Satuan</th>
              <th className="px-3 py-2.5 text-right font-semibold">Subtotal</th>
              <th className="px-2 py-2.5 text-center font-semibold w-10 print:hidden"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border print:divide-black">
            {Array.from(categoriesMap.entries()).map(([catName, categoryItems]) => (
              <Fragment key={catName}>
                {/* Category Header Row */}
                <tr className="bg-surface/30 font-semibold text-primary print:bg-gray-50 print:text-black">
                  <td colSpan={6} className="px-3 py-2 text-xs uppercase tracking-wide">
                    {catName}
                  </td>
                </tr>

                {categoryItems.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition">
                    <td className="px-3 py-2">
                      <input
                        type="text"
                        value={item.item}
                        onChange={(e) => updateItem(item.id, "item", e.target.value)}
                        className="w-full bg-transparent font-medium text-foreground outline-none focus:underline print:border-none"
                      />
                      {item.notes && (
                        <input
                          type="text"
                          value={item.notes}
                          onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                          className="w-full bg-transparent text-[11px] text-muted-foreground outline-none focus:underline print:border-none"
                        />
                      )}
                    </td>
                    <td className="px-2 py-2 text-center">
                      <input
                        type="number"
                        value={item.volume}
                        onChange={(e) => updateItem(item.id, "volume", Number(e.target.value))}
                        className="w-14 rounded border border-border bg-background p-1 text-center font-mono text-xs text-foreground outline-none focus:border-primary print:border-none"
                      />
                    </td>
                    <td className="px-2 py-2 text-center text-muted-foreground print:text-black">
                      <input
                        type="text"
                        value={item.satuan}
                        onChange={(e) => updateItem(item.id, "satuan", e.target.value)}
                        className="w-12 bg-transparent text-center text-xs outline-none focus:underline print:border-none"
                      />
                    </td>
                    <td className="px-3 py-2 text-right font-mono">
                      <input
                        type="number"
                        value={item.hargaSatuan}
                        onChange={(e) => updateItem(item.id, "hargaSatuan", Number(e.target.value))}
                        className="w-24 rounded border border-border bg-background p-1 text-right font-mono text-xs text-foreground outline-none focus:border-primary print:border-none"
                      />
                    </td>
                    <td className="px-3 py-2 text-right font-mono font-semibold text-foreground print:text-black">
                      {formatRupiah(item.subtotal)}
                    </td>
                    <td className="px-2 py-2 text-center print:hidden">
                      <button
                        type="button"
                        onClick={() => deleteItem(item.id)}
                        className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        title="Hapus baris"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </Fragment>
            ))}
          </tbody>

          <tfoot>
            {/* Direct Cost Subtotal */}
            <tr className="border-t-2 border-border bg-surface/50 font-medium text-foreground print:bg-white print:text-black">
              <td colSpan={4} className="px-3 py-2.5 text-right font-semibold">
                Subtotal Biaya Langsung (Material + Upah):
              </td>
              <td className="px-3 py-2.5 text-right font-mono font-bold">
                {formatRupiah(rab.subtotalDirectCost)}
              </td>
              <td className="print:hidden"></td>
            </tr>

            {/* Overhead & Profit Row */}
            <tr className="bg-surface/30 text-xs text-muted-foreground print:bg-white print:text-black">
              <td colSpan={4} className="px-3 py-2 text-right">
                Overhead & Profit Kontraktor ({rab.overheadPercent}%):
              </td>
              <td className="px-3 py-2 text-right font-mono font-medium">
                {formatRupiah(rab.overheadAmount)}
              </td>
              <td className="print:hidden"></td>
            </tr>

            {/* Contingency Row */}
            {rab.contingencyPercent > 0 && (
              <tr className="bg-surface/30 text-xs text-muted-foreground print:bg-white print:text-black">
                <td colSpan={4} className="px-3 py-2 text-right">
                  Biaya Tak Terduga / Contingency ({rab.contingencyPercent}%):
                </td>
                <td className="px-3 py-2 text-right font-mono font-medium">
                  {formatRupiah(rab.contingencyAmount)}
                </td>
                <td className="print:hidden"></td>
              </tr>
            )}

            {/* GRAND TOTAL RAB */}
            <tr className="border-t-2 border-primary bg-primary text-primary-foreground print:bg-black print:text-white">
              <td colSpan={4} className="px-3 py-3 text-right font-bold text-sm md:text-base">
                TOTAL RAB PROYEK
                {rab.hargaPerM2 ? ` (${formatRupiah(rab.hargaPerM2)} / m²)` : ""}:
              </td>
              <td className="px-3 py-3 text-right font-display text-base md:text-lg font-bold text-accent print:text-white">
                {formatRupiah(rab.totalRab)}
              </td>
              <td className="print:hidden"></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Action to Add New Line Item */}
      <div className="border-t border-border bg-surface/30 p-2 text-center print:hidden">
        <button
          type="button"
          onClick={addItem}
          className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
        >
          <Plus className="h-3.5 w-3.5" /> Tambah Baris Pekerjaan
        </button>
      </div>

      {/* AI Technical Recommendations & Tips */}
      {((rab.technicalNotes && rab.technicalNotes.length > 0) ||
        (rab.costSavingTips && rab.costSavingTips.length > 0)) && (
        <div className="border-t border-border bg-surface/50 p-4 print:border-t print:bg-white">
          <button
            type="button"
            onClick={() => setShowTechNotes(!showTechNotes)}
            className="flex w-full items-center justify-between text-xs font-semibold text-foreground print:hidden"
          >
            <span className="flex items-center gap-1.5 text-primary">
              <Info className="h-4 w-4" /> Catatan Teknis & Rekomendasi Efisiensi AI
            </span>
            {showTechNotes ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {(showTechNotes || window.matchMedia("print").matches) && (
            <div className="mt-3 grid gap-3 text-xs md:grid-cols-2">
              {rab.technicalNotes && rab.technicalNotes.length > 0 && (
                <div className="rounded-lg border border-border bg-background p-3 print:border-black">
                  <div className="font-semibold text-foreground print:text-black">
                    📌 Spesifikasi & Keselamatan Teknis:
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-muted-foreground print:text-black">
                    {rab.technicalNotes.map((note, idx) => (
                      <li key={idx}>{note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {rab.costSavingTips && rab.costSavingTips.length > 0 && (
                <div className="rounded-lg border border-border bg-background p-3 print:border-black">
                  <div className="font-semibold text-emerald-700 dark:text-emerald-400 print:text-black">
                    💡 Tips Efisiensi Biaya Kontraktor:
                  </div>
                  <ul className="mt-1.5 list-disc space-y-1 pl-4 text-muted-foreground print:text-black">
                    {rab.costSavingTips.map((tip, idx) => (
                      <li key={idx}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* WhatsApp Send Call to Action */}
      <div className="border-t border-border bg-surface/80 p-3.5 print:hidden">
        <a
          href={buildWaMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:brightness-110 active:scale-95"
        >
          <MessageCircle className="h-5 w-5 fill-white" /> Kirim Proposal RAB ini ke WhatsApp Tim
          Survey
        </a>
      </div>
    </div>
  );
}
