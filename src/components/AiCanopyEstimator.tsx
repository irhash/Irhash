import { useState } from "react";
import {
  Calculator,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  AlertTriangle,
  Ruler,
  Wrench,
} from "lucide-react";
import { CANOPY_TYPES, type CanopyType } from "@/lib/canopy-catalog";

const WA_URL =
  "https://wa.me/6285284485290?text=Halo%20Living%20Space%20Pro%2C%20saya%20ingin%20konsultasi%20estimasi%20kanopi.";

const rupiah = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");

const CATEGORIES = Array.from(new Set(CANOPY_TYPES.map((c) => c.category)));

export function AiCanopyEstimator() {
  const [length, setLength] = useState<number>(4);
  const [width, setWidth] = useState<number>(3);
  const [typeId, setTypeId] = useState<string>("alderon-double");
  const [budget, setBudget] = useState<string>("");
  const [result, setResult] = useState<null | {
    area: number;
    total: number;
    type: CanopyType;
    withinBudget: boolean | null;
    suggestion: { type: CanopyType; total: number } | null;
  }>(null);

  const handleCalc = () => {
    const type = CANOPY_TYPES.find((t) => t.id === typeId)!;
    const area = Math.max(0, length) * Math.max(0, width);
    const total = area * type.price;
    const budgetNum = Number(budget) || 0;

    let withinBudget: boolean | null = null;
    let suggestion: { type: CanopyType; total: number } | null = null;

    if (budgetNum > 0) {
      withinBudget = total <= budgetNum;
      if (!withinBudget) {
        const affordable = CANOPY_TYPES.filter((t) => t.id !== type.id)
          .map((t) => ({ type: t, total: area * t.price }))
          .filter((x) => x.total <= budgetNum)
          .sort((a, b) => b.total - a.total)[0];
        suggestion = affordable ?? {
          type: CANOPY_TYPES[0],
          total: area * CANOPY_TYPES[0].price,
        };
      }
    }

    setResult({ area, total, type, withinBudget, suggestion });
  };

  return (
    <section id="estimator" className="border-t border-border bg-surface/60 py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Sparkles className="h-3.5 w-3.5" /> AI Powered
          </span>
          <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">AI Kalkulator Kanopi</h2>
          <p className="mt-3 text-muted-foreground">
            Hitung estimasi biaya kanopi berdasarkan katalog resmi Living Space Pro — lengkap dengan
            spesifikasi hollow & material.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
          <div className="grid gap-0 md:grid-cols-5">
            {/* FORM */}
            <div className="md:col-span-3 p-6 md:p-8">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Ruler className="h-4 w-4" /> Ukuran Kanopi
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground">Panjang (meter)</span>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-medium text-muted-foreground">Lebar (meter)</span>
                  <input
                    type="number"
                    min={0}
                    step={0.5}
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <div className="mt-6">
                <label className="block">
                  <span className="text-sm font-semibold text-primary">Jenis Kanopi</span>
                  <select
                    value={typeId}
                    onChange={(e) => setTypeId(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    {CATEGORIES.map((cat) => (
                      <optgroup key={cat} label={cat}>
                        {CANOPY_TYPES.filter((t) => t.category === cat).map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.emoji} {t.name} — {rupiah(t.price)}/m²
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
                {(() => {
                  const t = CANOPY_TYPES.find((x) => x.id === typeId)!;
                  return <p className="mt-2 text-xs text-muted-foreground">{t.desc}</p>;
                })()}
              </div>

              <div className="mt-6">
                <label className="block">
                  <span className="text-sm font-semibold text-primary">
                    Budget Maksimal Anda (Rp){" "}
                    <span className="text-xs font-normal text-muted-foreground">opsional</span>
                  </span>
                  <input
                    type="number"
                    min={0}
                    step={500000}
                    placeholder="contoh: 10000000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
              </div>

              <button
                type="button"
                onClick={handleCalc}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/20 transition hover:brightness-105 active:scale-[0.99]"
              >
                <Calculator className="h-4 w-4" /> Hitung Estimasi
              </button>
              <p className="mt-3 text-[11px] text-muted-foreground">
                *Harga berdasarkan katalog resmi. Bisa berubah sewaktu-waktu & menyesuaikan hasil
                survei lokasi.
              </p>
            </div>

            {/* RESULT */}
            <div className="md:col-span-2 border-t border-border bg-primary p-6 text-primary-foreground md:border-l md:border-t-0 md:p-8">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="h-3.5 w-3.5" /> Hasil Estimasi
              </div>

              {!result ? (
                <div className="mt-6 flex h-full min-h-[280px] flex-col items-start justify-center">
                  <p className="text-primary-foreground/70">
                    Isi ukuran & pilih jenis kanopi, lalu tekan{" "}
                    <span className="font-semibold text-primary-foreground">Hitung Estimasi</span>{" "}
                    untuk melihat perkiraan biaya & spesifikasi hollow.
                  </p>
                </div>
              ) : (
                <div className="mt-6 animate-fade-in space-y-5">
                  <div>
                    <div className="text-xs text-primary-foreground/60">Luas Kanopi</div>
                    <div className="text-lg font-semibold">
                      {result.area.toLocaleString("id-ID")} m²
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-primary-foreground/60">{result.type.name}</div>
                    <div className="mt-1 text-xs text-primary-foreground/60">
                      Estimasi Total Harga
                    </div>
                    <div className="font-display text-3xl font-bold text-accent">
                      {rupiah(result.total)}
                    </div>
                    <div className="mt-1 text-[11px] text-primary-foreground/50">
                      {rupiah(result.type.price)}/m² × {result.area} m²
                    </div>
                  </div>

                  {/* Hollow specs */}
                  <div className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-3">
                    <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                      <Wrench className="h-3.5 w-3.5" /> Spesifikasi Rangka Hollow
                    </div>
                    <ul className="mt-2 space-y-1 text-xs text-primary-foreground/85">
                      {result.type.hollow.map((h) => (
                        <li key={h} className="flex gap-2">
                          <span className="text-accent">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                    {result.type.extras && (
                      <>
                        <div className="mt-3 text-[11px] font-semibold uppercase tracking-wider text-primary-foreground/60">
                          Material Tambahan
                        </div>
                        <ul className="mt-1 space-y-1 text-xs text-primary-foreground/85">
                          {result.type.extras.map((e) => (
                            <li key={e} className="flex gap-2">
                              <span className="text-accent">•</span>
                              <span>{e}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>

                  {result.withinBudget === true && (
                    <div className="flex items-start gap-3 rounded-lg border border-emerald-400/30 bg-emerald-400/10 p-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
                      <div>
                        <div className="font-semibold text-emerald-200">
                          Yeay! Sesuai budget Anda.
                        </div>
                        <p className="text-xs text-primary-foreground/70">
                          Pilihan ini masih di bawah budget maksimal Anda.
                        </p>
                      </div>
                    </div>
                  )}

                  {result.withinBudget === false && result.suggestion && (
                    <div className="flex items-start gap-3 rounded-lg border border-amber-400/30 bg-amber-400/10 p-3 text-sm">
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />
                      <div>
                        <div className="font-semibold text-amber-200">
                          Harga melebihi budget Anda.
                        </div>
                        <p className="mt-1 text-xs text-primary-foreground/75">
                          <span className="font-semibold text-primary-foreground">Saran AI:</span>{" "}
                          Gunakan{" "}
                          <span className="font-semibold text-primary-foreground">
                            {result.suggestion.type.name}
                          </span>{" "}
                          untuk estimasi{" "}
                          <span className="font-semibold text-accent">
                            {rupiah(result.suggestion.total)}
                          </span>{" "}
                          yang lebih pas di kantong.
                        </p>
                      </div>
                    </div>
                  )}

                  <a
                    href={WA_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent px-5 py-3 text-sm font-bold text-accent-foreground transition hover:brightness-105"
                  >
                    <MessageCircle className="h-4 w-4" /> Konsultasi via WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
