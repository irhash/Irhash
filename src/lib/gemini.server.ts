import { GoogleGenAI } from "@google/genai";

export interface ContractorRabItem {
  id: string;
  category: string;
  item: string;
  volume: number;
  satuan: string;
  hargaSatuan: number;
  subtotal: number;
  notes?: string;
}

export interface ContractorRabData {
  projectName: string;
  category: string;
  location: string;
  panjang?: number;
  lebar?: number;
  areaM2?: number;
  estimatedDuration: string;
  workersCount: string;
  items: ContractorRabItem[];
  subtotalDirectCost: number;
  overheadPercent: number;
  overheadAmount: number;
  contingencyPercent: number;
  contingencyAmount: number;
  totalRab: number;
  hargaPerM2?: number;
  technicalNotes: string[];
  costSavingTips: string[];
  summaryMessage: string;
}

export interface GenerateRabResponse {
  status: "ok" | "need_clarification" | "error";
  clarification?: string;
  data?: ContractorRabData;
  rawReasoning?: string;
}

const SYSTEM_PROMPT = `
Anda adalah Chief AI Quantity Surveyor & Estimator Kontraktor Profesional Indonesia (Living Space Pro).
Tugas Anda adalah membuat Rencana Anggaran Biaya (RAB) Konstruksi & Renovasi yang presisi, realistis, dan detail untuk KONTRAKTOR dan PEMILIK PROYEK.

Cakupan Pekerjaan:
- Kanopi, Atap, Carport, Mezanin, Skylight
- Bangun Rumah / Ruko / Kos-kosan (Struktur, Pasangan Dinding, Plesteran, Acian)
- Renovasi Interior (Dapur, Kamar Mandi, Plafon PVC/Gypsum, Keramik/Granit 60x60, Pengecatan)
- Pekerjaan Eksterior (Pagar Besi/Woodplank, Fondasi Batu Kali, Dak Beton, Paving, Pertamanan)
- Pekerjaan MEP (Instalasi Listrik, Sakelar, Lampu Downlight, Plumbing, Saniter)

Standar Acuan Harga:
Gunakan standar acuan Harga Satuan Pekerjaan Konstruksi (HSPK / AHSP) Indonesia terbaru dengan estimasi wajar pasar Jabodetabek & kota besar.

Format Output Wajib (STRICT JSON ONLY):
Output harus dalam format JSON murni tanpa markdown triple backticks.

Aturan Pembuatan Item RAB:
1. Kelompokkan dalam kategori jelas (Contoh: "I. PEKERJAAN PERSIAPAN & PEMBONGKARAN", "II. PEKERJAAN STRUKTUR & MATERIAL", "III. PEKERJAAN FINISHING", "IV. UPAH & JASA TUKANG", "V. LAIN-LAIN / OVERHEAD").
2. Untuk setiap item sertakan:
   - "category": Nama Kategori
   - "item": Deskripsi pekerjaan dan spesifikasi bahan (misal: "Besi Holo Galvanis 40x80x1.6mm SNI")
   - "volume": Angka desimal (misal: 24)
   - "satuan": Satuan resmi (m², m³, m1, titik, ls, unit, bh, kg)
   - "hargaSatuan": Harga Rupiah per satuan (angka saja)
   - "notes": Spesifikasi/catatan teknis singkat
3. Hitung subtotalDirectCost = sum(volume * hargaSatuan).
4. Tentukan overheadPercent (default 10-12%) dan contingencyPercent (default 3-5%).
5. Hitung overheadAmount = subtotalDirectCost * overheadPercent / 100.
6. Hitung contingencyAmount = subtotalDirectCost * contingencyPercent / 100.
7. Hitung totalRab = subtotalDirectCost + overheadAmount + contingencyAmount.
8. Berikan estimasi durasi pengerjaan dan alokasi tenaga kerja (misal: "10 hari kerja", "1 Mandor, 2 Tukang, 2 Pekerja").
9. Berikan 2-4 catatan teknis keselamatan/spesifikasi ("technicalNotes") dan 2-3 tips efisiensi biaya ("costSavingTips").

Jika instruksi user sangat tidak jelas/kurang informasi dasar (misal cuma "halo" atau "hitung dong"), kembalikan JSON:
{
  "status": "need_clarification",
  "clarification": "Pesan pertanyaan ramah menanyakan detail proyek yang ingin dihitung..."
}
`;

export async function generateContractorRabWithGemini(
  prompt: string,
  customContext?: string,
): Promise<GenerateRabResponse> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const fullPrompt = `${SYSTEM_PROMPT}\n\nPermintaan Proyek Kontraktor:\n"${prompt}"\n${customContext ? `Catatan Tambahan: ${customContext}` : ""}\n\nFormat balasan JSON murni:`;

      const response = await ai.models.generateContent({
        model: "gemini-3.6-flash",
        contents: fullPrompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.2,
        },
      });

      const responseText = response.text?.trim() || "";
      if (responseText) {
        // Clean JSON formatting if enclosed in code blocks
        const cleanedJson = responseText
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/\s*```$/i, "");
        const parsed = JSON.parse(cleanedJson) as GenerateRabResponse;

        if (parsed.status === "ok" && parsed.data) {
          // Calculate and ensure math correctness
          recalculateRabData(parsed.data);
          return parsed;
        } else if (parsed.status === "need_clarification") {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed or fallback used:", err);
    }
  }

  // Fallback intelligent rules-based contractor RAB estimator if key is missing or API fails
  return fallbackContractorRabGenerator(prompt);
}

function recalculateRabData(data: ContractorRabData) {
  let directCost = 0;
  data.items = data.items.map((item, idx) => {
    const subtotal = Math.round(item.volume * item.hargaSatuan);
    directCost += subtotal;
    return {
      ...item,
      id: item.id || `item-${idx + 1}`,
      subtotal,
    };
  });

  data.subtotalDirectCost = directCost;
  data.overheadPercent = data.overheadPercent ?? 10;
  data.contingencyPercent = data.contingencyPercent ?? 3;
  data.overheadAmount = Math.round((directCost * data.overheadPercent) / 100);
  data.contingencyAmount = Math.round((directCost * data.contingencyPercent) / 100);
  data.totalRab = directCost + data.overheadAmount + data.contingencyAmount;

  if (data.areaM2 && data.areaM2 > 0) {
    data.hargaPerM2 = Math.round(data.totalRab / data.areaM2);
  }
}

function fallbackContractorRabGenerator(prompt: string): GenerateRabResponse {
  const text = prompt.toLowerCase();

  // Extract numbers (length x width or area)
  const numbers = text.match(/\d+(?:\.\d+)?/g)?.map(Number) || [];
  let panjang = 0;
  let lebar = 0;
  let area = 0;

  if (numbers.length >= 2) {
    panjang = Math.max(numbers[0], numbers[1]);
    lebar = Math.min(numbers[0], numbers[1]);
    area = panjang * lebar;
  } else if (numbers.length === 1) {
    area = numbers[0];
    panjang = Math.round(Math.sqrt(area) * 10) / 10;
    lebar = Math.round((area / panjang) * 10) / 10;
  } else {
    // Default fallback estimation area if not specified
    area = 20;
    panjang = 5;
    lebar = 4;
  }

  // Detect project type
  if (text.includes("dapur") || text.includes("kitchen")) {
    return buildKitchenRenovationRab(prompt, area);
  } else if (text.includes("kamar mandi") || text.includes("toilet")) {
    return buildBathroomRenovationRab(prompt, area);
  } else if (text.includes("pagar") || text.includes("gate")) {
    return buildFenceRab(prompt, area);
  } else if (text.includes("rumah") || text.includes("bangun") || text.includes("ruko")) {
    return buildHouseBuildingRab(prompt, area);
  } else if (text.includes("dak") || text.includes("cor")) {
    return buildConcreteSlabRab(prompt, area);
  } else if (text.includes("cat") || text.includes("ngecat")) {
    return buildPaintingRab(prompt, area);
  }

  // Default canopy & general shade structure
  return buildCanopyRab(prompt, panjang, lebar, area);
}

function buildCanopyRab(
  prompt: string,
  panjang: number,
  lebar: number,
  area: number,
): GenerateRabResponse {
  const text = prompt.toLowerCase();
  let materialName = "Atap Alderon Double Layer (UPVC)";
  let materialRate = 450000;
  let frameName = "Rangka Besi Holo Galvanis 40x80 (Anti Karat)";
  let frameRate = 380000;

  if (text.includes("spandek")) {
    materialName = "Atap Spandek Pasir 0.35mm";
    materialRate = 220000;
  } else if (text.includes("kaca") || text.includes("tempered")) {
    materialName = "Kaca Tempered 8mm Clear + Film Proteksi";
    materialRate = 1150000;
    frameName = "Rangka Besi WF 150 / Holo 50x100 Tebal";
    frameRate = 650000;
  } else if (
    text.includes("polycarbonate") ||
    text.includes("solarflat") ||
    text.includes("twinlite")
  ) {
    materialName = "Atap Solarflat / Polycarbonate Premium 3mm";
    materialRate = 550000;
  } else if (text.includes("mezanin") || text.includes("mezzanine")) {
    materialName = "Plat Bordes / Plat Besi Floor + Plafon Kalsiboard";
    materialRate = 850000;
    frameName = "Rangka Besi WF 150 / H-Beam Utama + Holo 50x100";
    frameRate = 950000;
  }

  const items: ContractorRabItem[] = [
    {
      id: "1",
      category: "I. PEKERJAAN PERSIAPAN & PENGUKURAN",
      item: "Pembersihan Area, Pengukuran Presisi & Pasang Steger/Scaffolding",
      volume: 1,
      satuan: "ls",
      hargaSatuan: 450000,
      subtotal: 450000,
      notes: "Pengamanan lokasi & alat kerja",
    },
    {
      id: "2",
      category: "II. PEKERJAAN RANGKA & STRUKTUR UTAMA",
      item: frameName,
      volume: area,
      satuan: "m²",
      hargaSatuan: frameRate,
      subtotal: area * frameRate,
      notes: "Pengelasan penuh (full welding) & fiting dudukan",
    },
    {
      id: "3",
      category: "III. PEKERJAAN PENUTUP ATAP",
      item: materialName,
      volume: area,
      satuan: "m²",
      hargaSatuan: materialRate,
      subtotal: area * materialRate,
      notes: "Pemasangan beserta baut roofing & seal kedap air",
    },
    {
      id: "4",
      category: "IV. PEKERJAAN DRAINASE & ACCESSORIES",
      item: "Talang Air PVC/Seng Zincalume + Dynabolt & Sikaflex Sealant",
      volume: Math.ceil(panjang + lebar),
      satuan: "m1",
      hargaSatuan: 125000,
      subtotal: Math.ceil(panjang + lebar) * 125000,
      notes: "Mencegah kebocoran ke dinding tetangga",
    },
    {
      id: "5",
      category: "V. FINISHING & CAT ANTI KARAT",
      item: "Pengecatan Meni Epoksi Anti Karat + Top Coat Duco Black/Grey",
      volume: area,
      satuan: "m²",
      hargaSatuan: 85000,
      subtotal: area * 85000,
      notes: "2 lapis cat dasar + 2 lapis cat finishing",
    },
    {
      id: "6",
      category: "VI. JASA & UPAH TUKANG AHLI",
      item: "Jasa Aplikator Las & Pemasangan Atap Profesional",
      volume: area,
      satuan: "m²",
      hargaSatuan: 150000,
      subtotal: area * 150000,
      notes: "Tukang las bersertifikat & garansi pengerjaan",
    },
  ];

  const data: ContractorRabData = {
    projectName: `RAB Kanopi ${materialName.split(" ")[1] || "Modern"} ${panjang}x${lebar}m`,
    category: "Kanopi & Atap",
    location: "Jabodetabek / Kota Besar (HSPK Benchmark)",
    panjang,
    lebar,
    areaM2: area,
    estimatedDuration: area > 30 ? "5 - 7 Hari Kerja" : "3 - 4 Hari Kerja",
    workersCount: "1 Mandor / Kep. Tukang, 2 Tukang Las, 1 Pekerja",
    items,
    subtotalDirectCost: 0,
    overheadPercent: 10,
    overheadAmount: 0,
    contingencyPercent: 3,
    contingencyAmount: 0,
    totalRab: 0,
    technicalNotes: [
      "Kemiringan atap minimal 5° - 10° agar aliran air hujan lancar.",
      "Gunakan dynabolt M10/M12 kualitas tinggi dipatok pada balok beton struktur.",
      "Sambungan antar atap dilapisi sealant netral tahan sinar UV.",
    ],
    costSavingTips: [
      "Pilih ketebalan besi holo sesuai bentang kanopi untuk efisiensi tanpa mengurangi ketahanan.",
      "Integrasikan talang air langsung saat fabrikasi untuk menghemat biaya instalasi terpisah.",
    ],
    summaryMessage: `Berikut draf RAB Kontraktor presisi untuk pembuatan kanopi luas ${area} m² (${panjang}m x ${lebar}m).`,
  };

  recalculateRabData(data);
  return { status: "ok", data };
}

function buildKitchenRenovationRab(prompt: string, area: number): GenerateRabResponse {
  const items: ContractorRabItem[] = [
    {
      id: "1",
      category: "I. PEKERJAAN PERSIAPAN & BONGKARAN",
      item: "Pembongkaran Meja Dapur Lama & Keramik Dinding",
      volume: 1,
      satuan: "ls",
      hargaSatuan: 850000,
      subtotal: 850000,
      notes: "Pembersihan puing & buang sampah keluar",
    },
    {
      id: "2",
      category: "II. PEKERJAAN STRUKTUR MEJA DAPUR & COR",
      item: "Pembuatan Meja Dapur Betonal Bertulang + Wastafel Cutout",
      volume: Math.max(3, Math.round(area * 0.4)),
      satuan: "m1",
      hargaSatuan: 1200000,
      subtotal: Math.max(3, Math.round(area * 0.4)) * 1200000,
      notes: "Beton K-225 + Besi 8mm & Pasir Pasang",
    },
    {
      id: "3",
      category: "III. PEKERJAAN FINISHING GRANIT & BACKSPLASH",
      item: "Pemasangan Granit Tile 60x60 Top Table + Backsplash Dinding",
      volume: area,
      satuan: "m²",
      hargaSatuan: 480000,
      subtotal: area * 480000,
      notes: "Granit Homogeneous Tile & Nat Tile Grout Epoksi",
    },
    {
      id: "4",
      category: "IV. PEKERJAAN PLUMBING & SANITER",
      item: "Instalasi Pipa Air Bersih/Kotor + Kitchen Sink Stainless Steel 304",
      volume: 1,
      satuan: "unit",
      hargaSatuan: 1850000,
      subtotal: 1850000,
      notes: "Termasuk kran angsa flexibel & grease trap",
    },
    {
      id: "5",
      category: "V. PEKERJAAN MEKANIKAL & ELEKTRIKAL",
      item: "Instalasi Titik Stopkontak Kompor/Cooker Hood & Lampu Strip LED",
      volume: 4,
      satuan: "titik",
      hargaSatuan: 225000,
      subtotal: 900000,
      notes: "Kabel Eterna 3x2.5mm + Sakelar Panasonic",
    },
  ];

  const data: ContractorRabData = {
    projectName: `RAB Renovasi Dapur Bersih / Basah ${area}m²`,
    category: "Renovasi Interior",
    location: "Jabodetabek / Kota Besar",
    areaM2: area,
    estimatedDuration: "7 - 10 Hari Kerja",
    workersCount: "1 Kep. Tukang Batu/Keramik, 1 Tukang Plumber/Listrik, 1 Pekerja",
    items,
    subtotalDirectCost: 0,
    overheadPercent: 10,
    overheadAmount: 0,
    contingencyPercent: 4,
    contingencyAmount: 0,
    totalRab: 0,
    technicalNotes: [
      "Gunakan perekat keramik/granit khusus (Sika/AM) untuk top table agar tidak retak.",
      "Kemiringan pipa pembuangan air kotor minimal 2% menuju kontrol terdekat.",
    ],
    costSavingTips: [
      "Gunakan granit tile 60x60 / 60x120 sebagai pengganti granit marmer utuh untuk menghemat biaya hingga 50%.",
    ],
    summaryMessage: `Estimasi RAB Kontraktor untuk pekerjaan renovasi dapur area ${area} m².`,
  };

  recalculateRabData(data);
  return { status: "ok", data };
}

function buildBathroomRenovationRab(prompt: string, area: number): GenerateRabResponse {
  const items: ContractorRabItem[] = [
    {
      id: "1",
      category: "I. PEKERJAAN BONGKARAN & WATERPROOFING",
      item: "Bongkar Keramik Lama + Coating Waterproofing 2 Lapis (Sika/Fosroc)",
      volume: area,
      satuan: "m²",
      hargaSatuan: 280000,
      subtotal: area * 280000,
      notes: "Uji rendam air 24 jam sebelum pasang keramik",
    },
    {
      id: "2",
      category: "II. PEKERJAAN KERAMIK LANTAI & DINDING",
      item: "Pasang Keramik Dinding 30x60 & Keramik Lantai Anti-Slip 30x30",
      volume: area * 3.5, // Dinding + Lantai
      satuan: "m²",
      hargaSatuan: 320000,
      subtotal: Math.round(area * 3.5 * 320000),
      notes: "Motif granit/marmer + nat kedap air",
    },
    {
      id: "3",
      category: "III. SANITER & AKSESORIS",
      item: "Pemasangan Kloset Duduk Monoblok Toto/American Standard + Shower Set",
      volume: 1,
      satuan: "set",
      hargaSatuan: 2950000,
      subtotal: 2950000,
      notes: "Termasuk jet shower, floor drain stainless & tempat sabun",
    },
    {
      id: "4",
      category: "IV. PLAFON & PENCAHAYAAN",
      item: "Plafon PVC Tahan Air / Gypsum Wet Area + Downlight LED 9W",
      volume: area,
      satuan: "m²",
      hargaSatuan: 220000,
      subtotal: area * 220000,
      notes: "Rangka hollow galvanis tahan lembap",
    },
  ];

  const data: ContractorRabData = {
    projectName: `RAB Renovasi Kamar Mandi Modern ${area}m²`,
    category: "Renovasi Interior",
    location: "Jabodetabek",
    areaM2: area,
    estimatedDuration: "5 - 7 Hari Kerja",
    workersCount: "1 Tukang Keramik/Plumber, 1 Pekerja",
    items,
    subtotalDirectCost: 0,
    overheadPercent: 10,
    overheadAmount: 0,
    contingencyPercent: 4,
    contingencyAmount: 0,
    totalRab: 0,
    technicalNotes: [
      "Uji rendam waterproofing sangat krusial untuk mencegah kebocoran ke lantai bawah.",
      "Kemiringan lantai kamar mandi ke arah floor drain minimal 1.5 cm per meter.",
    ],
    costSavingTips: [
      "Pertahankan posisi titik pipa saluran utama lama agar tidak perlu membobok lantai beton struktur terlalu dalam.",
    ],
    summaryMessage: `Estimasi RAB Kontraktor untuk renovasi total kamar mandi ${area} m².`,
  };

  recalculateRabData(data);
  return { status: "ok", data };
}

function buildFenceRab(prompt: string, area: number): GenerateRabResponse {
  const items: ContractorRabItem[] = [
    {
      id: "1",
      category: "I. PEKERJAAN FONDASI & DINDING BATA",
      item: "Fondasi Batu Kali + Sloof Beton Bertulang & Dinding Bata Ringan/Merah",
      volume: Math.max(5, area),
      satuan: "m1",
      hargaSatuan: 750000,
      subtotal: Math.max(5, area) * 750000,
      notes: "Plester halus & acian semen mortar",
    },
    {
      id: "2",
      category: "II. PEKERJAAN PAGAR BESII / WOODPLANK",
      item: "Pagar Rangka Holo Galvanis 40x60 + Motif Woodplank / Plat Laser Cut",
      volume: Math.max(5, area) * 1.8, // Tinggi 1.8m
      satuan: "m²",
      hargaSatuan: 650000,
      subtotal: Math.round(Math.max(5, area) * 1.8 * 650000),
      notes: "Roda bearing & rel siku / hisap magnet",
    },
    {
      id: "3",
      category: "III. FINISHING & CAT PAGAR",
      item: "Pengecatan Meni Epoksi Anti Karat & Cat Dinding Jotun Tough Shield",
      volume: Math.max(5, area) * 2,
      satuan: "m²",
      hargaSatuan: 95000,
      subtotal: Math.round(Math.max(5, area) * 2 * 95000),
      notes: "Tahan cuaca luar ruangan",
    },
  ];

  const data: ContractorRabData = {
    projectName: `RAB Pembuatan Pagar Minimalis Modern ${area}m1`,
    category: "Pagar & Eksterior",
    location: "Jabodetabek",
    areaM2: area,
    estimatedDuration: "6 - 8 Hari Kerja",
    workersCount: "1 Kep. Tukang Las/Batu, 2 Pekerja",
    items,
    subtotalDirectCost: 0,
    overheadPercent: 10,
    overheadAmount: 0,
    contingencyPercent: 3,
    contingencyAmount: 0,
    totalRab: 0,
    technicalNotes: [
      "Kedalaman fondasi batu kali minimal 50cm agar pagar tidak miring/ambles.",
      "Gunakan cat primer epoxy tahan karat untuk besi outdoor.",
    ],
    costSavingTips: [
      "Kombinasikan dinding batu bata aci dengan selingan jeruji besi holo agar tampilan mewah dengan biaya terkontrol.",
    ],
    summaryMessage: `Estimasi RAB Kontraktor pembuatan pagar minimalis bentang ${area} meter.`,
  };

  recalculateRabData(data);
  return { status: "ok", data };
}

function buildHouseBuildingRab(prompt: string, area: number): GenerateRabResponse {
  const items: ContractorRabItem[] = [
    {
      id: "1",
      category: "I. PEKERJAAN PERSIAPAN & PENGUKURAN",
      item: "Pembersihan Lahan, Pembuatan Bouwplank & Steger Kayu/Besi",
      volume: area,
      satuan: "m²",
      hargaSatuan: 95000,
      subtotal: area * 95000,
      notes: "Penentuan titik as & siku bangunan",
    },
    {
      id: "2",
      category: "II. PEKERJAAN STRUKTUR BETON BERTULANG",
      item: "Struktur Beton K-250 (Pondasi Cakar Ayam, Sloof, Kolom Utama, Balok & Cor Dak)",
      volume: area,
      satuan: "m²",
      hargaSatuan: 1850000,
      subtotal: area * 1850000,
      notes: "Besi ulir D10/D12 SNI & papan bekisting",
    },
    {
      id: "3",
      category: "III. DINDING, PLESTER & ACIAN",
      item: "Pasangan Bata Ringan Hebel 10cm + Mortar Perekat, Plesteran & Acian Smooth",
      volume: area * 3.2,
      satuan: "m²",
      hargaSatuan: 195000,
      subtotal: Math.round(area * 3.2 * 195000),
      notes: "Kualitas acian siap cat tanpa retak rambut",
    },
    {
      id: "4",
      category: "IV. ATAP BAJA RINGAN & GENTENG",
      item: "Rangka Baja Ringan C75.75 + Genteng Beton / Metal Pasir / Alderon",
      volume: area * 1.15,
      satuan: "m²",
      hargaSatuan: 285000,
      subtotal: Math.round(area * 1.15 * 285000),
      notes: "Termasuk lisplank & perpusan genteng",
    },
    {
      id: "5",
      category: "V. FINISHING KERAMIK, PLAFON & CAT",
      item: "Granit Tile 60x60, Plafon Gypsum 9mm & Pengecatan Interior/Eksterior Dulux",
      volume: area,
      satuan: "m²",
      hargaSatuan: 850000,
      subtotal: area * 850000,
      notes: "Lengkap sakelar, stopkontak & sanitasi",
    },
  ];

  const data: ContractorRabData = {
    projectName: `RAB Bangun / Renovasi Bangunan Luas ${area}m²`,
    category: "Bangun Baru / Renovasi Total",
    location: "Jabodetabek",
    areaM2: area,
    estimatedDuration: area > 100 ? "3 - 4 Bulan" : "1.5 - 2 Bulan",
    workersCount: "1 Mandor Proyek, 4 Tukang Spesialis, 4 Pekerja",
    items,
    subtotalDirectCost: 0,
    overheadPercent: 12,
    overheadAmount: 0,
    contingencyPercent: 5,
    contingencyAmount: 0,
    totalRab: 0,
    technicalNotes: [
      "Uji tekan beton & spesifikasi besi Sni ulir wajib dicek sebelum pengecoran.",
      "Instalasi pipa air bersih & kabel listrik ditanam rapi sebelum diplester.",
    ],
    costSavingTips: [
      "Menggunakan bata ringan Hebel & mortar perekat mempercepat pengerjaan dinding hingga 40% dibanding bata merah konvensional.",
    ],
    summaryMessage: `Estimasi RAB Kontraktor lengkap untuk pekerjaan pembangunan/renovasi total bangunan luas ${area} m².`,
  };

  recalculateRabData(data);
  return { status: "ok", data };
}

function buildConcreteSlabRab(prompt: string, area: number): GenerateRabResponse {
  const items: ContractorRabItem[] = [
    {
      id: "1",
      category: "I. STRUKTUR PENYANGGA & BEKISTING",
      item: "Pemasangan Bekisting Triplek 12mm + Scaffolding / Gelam Penyangga",
      volume: area,
      satuan: "m²",
      hargaSatuan: 280000,
      subtotal: area * 280000,
      notes: "Kuat menahan beban cor beton basah",
    },
    {
      id: "2",
      category: "II. PEMBESIAN DAK BETON",
      item: "Pembesian Wiremesh M8 Double Layer / Besi Ulir 10mm Jarak 15cm",
      volume: area,
      satuan: "m²",
      hargaSatuan: 320000,
      subtotal: area * 320000,
      notes: "Dilengkapi betondek / ganjal beton 2.5cm",
    },
    {
      id: "3",
      category: "III. PENGECORAN BETON READYMIX / JAYAMIX",
      item: "Pengecoran Beton K-250 / K-300 Tebal 12cm + Bondek 0.75mm (Jika Pakai)",
      volume: Math.round(area * 0.12 * 10) / 10,
      satuan: "m³",
      hargaSatuan: 1450000,
      subtotal: Math.round(area * 0.12 * 1450000),
      notes: "Pengecoran menggunakan pompa beton / standar manual",
    },
    {
      id: "4",
      category: "IV. FINISHING & WATERPROOFING DAK",
      item: "Acian Screed Pelindung + Membrane Waterproofing Tahan Terik & Hujan",
      volume: area,
      satuan: "m²",
      hargaSatuan: 195000,
      subtotal: area * 195000,
      notes: "Mencegah rembesan air ke ruangan di bawahnya",
    },
  ];

  const data: ContractorRabData = {
    projectName: `RAB Pekerjaan Dak Cor Beton Bertulang ${area}m²`,
    category: "Pekerjaan Struktur",
    location: "Jabodetabek",
    areaM2: area,
    estimatedDuration: "7 - 10 Hari (Curing Beton 21 Hari)",
    workersCount: "1 Kep. Tukang Cor, 4 Tukang & Pekerja",
    items,
    subtotalDirectCost: 0,
    overheadPercent: 10,
    overheadAmount: 0,
    contingencyPercent: 4,
    contingencyAmount: 0,
    totalRab: 0,
    technicalNotes: [
      "Beton cor wajib dibasahi (curing) secara berkala selama 7-14 hari pertama agar tidak retak susut.",
      "Buat kemiringan air (slope 1%) ke arah pipa drainase dak.",
    ],
    costSavingTips: [
      "Menggunakan plat bondek sebagai bekisting permanen dapat menghemat penggunaan triplek & mempercepat pembesian.",
    ],
    summaryMessage: `Estimasi RAB Kontraktor untuk pekerjaan dak cor beton bertulang area ${area} m².`,
  };

  recalculateRabData(data);
  return { status: "ok", data };
}

function buildPaintingRab(prompt: string, area: number): GenerateRabResponse {
  const items: ContractorRabItem[] = [
    {
      id: "1",
      category: "I. PERSIAPAN DINDING",
      item: "Pengerokan Cat Lama (jika ada), Plamir / Wall Sealer & Penganpalan Smooth",
      volume: area,
      satuan: "m²",
      hargaSatuan: 35000,
      subtotal: area * 35000,
      notes: "Perbaikan retak rambut dengan wall putty",
    },
    {
      id: "2",
      category: "II. PENGECHATAN DINDING INTERIOR / EKSTERIOR",
      item: "Cat Dasar Alkali Sealer + 2 Lapis Cat Dulux / Jotun / Paragon",
      volume: area,
      satuan: "m²",
      hargaSatuan: 65000,
      subtotal: area * 65000,
      notes: "Warna disesuaikan pilihan owner",
    },
  ];

  const data: ContractorRabData = {
    projectName: `RAB Pengecatan Bangunan Luas ${area}m²`,
    category: "Pekerjaan Finishing",
    location: "Jabodetabek",
    areaM2: area,
    estimatedDuration: "3 - 5 Hari Kerja",
    workersCount: "2 Tukang Cat, 1 Pekerja",
    items,
    subtotalDirectCost: 0,
    overheadPercent: 10,
    overheadAmount: 0,
    contingencyPercent: 2,
    contingencyAmount: 0,
    totalRab: 0,
    technicalNotes: ["Dinding baru harus sudah kering sempurna (kadar air < 18%) sebelum dicat."],
    costSavingTips: [
      "Penggunaan cat dasar alkali sealer menghindarkan cat finishing pudar / mengelupas dalam jangka panjang.",
    ],
    summaryMessage: `Estimasi RAB Pengecatan untuk area seluas ${area} m².`,
  };

  recalculateRabData(data);
  return { status: "ok", data };
}
