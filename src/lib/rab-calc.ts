import { CANOPY_TYPES, type CanopyType } from "@/lib/canopy-catalog";

export { CANOPY_TYPES };
export type { CanopyType };

export type RabRow = {
  item: string;
  spec?: string;
  satuan: string;
  volume: number;
  hargaSatuan: number;
  subtotal: number;
};

export type RabResult = {
  type: CanopyType;
  panjang: number;
  lebar: number;
  area: number;
  rows: RabRow[];
  total: number;
};

const rp = (n: number) => Math.round(n / 1000) * 1000;

/**
 * Deterministic RAB breakdown. Kami memakai harga /m² katalog Living Space Pro
 * sebagai basis, lalu memecah menjadi 4 komponen realistis (rangka, atap,
 * aksesoris, jasa). Total selalu = harga_katalog × luas.
 */
export function calculateRab(input: {
  panjang: number;
  lebar: number;
  typeId: string;
}): RabResult | null {
  const type = CANOPY_TYPES.find((t) => t.id === input.typeId);
  if (!type) return null;

  const panjang = Math.max(0, input.panjang);
  const lebar = Math.max(0, input.lebar);
  const area = +(panjang * lebar).toFixed(2);
  const total = area * type.price;

  // Komposisi standar (sesuai praktik lapangan)
  const rangkaShare = 0.35;
  const atapShare = 0.4;
  const aksesorisShare = 0.05;
  const jasaShare = 0.2;

  const atapName = type.extras?.[0] ?? "Material atap";
  const aksesoris = "Baut seng, dynabolt, sealant, cat anti karat";

  const rows: RabRow[] = [
    {
      item: "Rangka Hollow Galvanis (paket)",
      spec: type.hollow.join(", "),
      satuan: "paket",
      volume: 1,
      hargaSatuan: rp(total * rangkaShare),
      subtotal: rp(total * rangkaShare),
    },
    {
      item: atapName,
      spec: `Termasuk waste 7% & talang air`,
      satuan: "m²",
      volume: area,
      hargaSatuan: rp((total * atapShare) / Math.max(area, 0.01)),
      subtotal: rp(total * atapShare),
    },
    {
      item: "Aksesoris & Finishing",
      spec: aksesoris,
      satuan: "paket",
      volume: 1,
      hargaSatuan: rp(total * aksesorisShare),
      subtotal: rp(total * aksesorisShare),
    },
    {
      item: "Jasa Pemasangan & Pengelasan",
      spec: "Tim ahli bersertifikat + garansi 1 tahun",
      satuan: "m²",
      volume: area,
      hargaSatuan: rp((total * jasaShare) / Math.max(area, 0.01)),
      subtotal: rp(total * jasaShare),
    },
  ];

  const recomputedTotal = rows.reduce((s, r) => s + r.subtotal, 0);

  return {
    type,
    panjang,
    lebar,
    area,
    rows,
    total: recomputedTotal,
  };
}

export const formatRupiah = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");
