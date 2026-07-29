import { CANOPY_TYPES } from "./canopy-catalog";
import type { ExtractedRabParams } from "./rab.functions";

export function parseRabPrompt(prompt: string): ExtractedRabParams {
  const text = prompt.toLowerCase().replace(/,/g, ".");
  const size = extractSize(text);

  if (!size) {
    return {
      status: "need_clarification",
      clarification:
        "Bisa sebutkan ukuran kanopinya? Contoh: 5x4 meter, 3 m x 2 m, atau panjang 6 lebar 3.",
    };
  }

  const typeId = detectTypeId(text);
  if (!CANOPY_TYPES.some((t) => t.id === typeId)) {
    return {
      status: "need_clarification",
      clarification:
        "Jenis kanopi belum cocok dengan katalog. Bisa pilih: spandek, alderon, cordoba, kaca tempered, skylight, lengkung, atau mezanin?",
    };
  }

  return {
    status: "ok",
    panjang: size.panjang,
    lebar: size.lebar,
    typeId,
    reasoning:
      "Material dipilih dari kata kunci yang Anda tulis dan dicocokkan dengan katalog Living Space Pro.",
  };
}

function extractSize(text: string): { panjang: number; lebar: number } | null {
  const number = "(\\d+(?:\\.\\d+)?)";
  const pairPatterns = [
    new RegExp(`${number}\\s*(?:m|meter)?\\s*(?:x|×|kali|by)\\s*${number}`, "i"),
    new RegExp(`panjang\\s*${number}\\s*(?:m|meter)?[^\\d]+lebar\\s*${number}`, "i"),
    new RegExp(`lebar\\s*${number}\\s*(?:m|meter)?[^\\d]+panjang\\s*${number}`, "i"),
  ];

  for (const pattern of pairPatterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const first = Number(match[1]);
    const second = Number(match[2]);
    if (first > 0 && second > 0) {
      if (pattern.source.startsWith("lebar")) {
        return { panjang: second, lebar: first };
      }
      return { panjang: first, lebar: second };
    }
  }

  const luasMatch = text.match(new RegExp(`luas\\s*${number}\\s*(?:m2|m²|meter persegi)`, "i"));
  if (luasMatch) {
    const area = Number(luasMatch[1]);
    if (area > 0) return { panjang: area, lebar: 1 };
  }

  return null;
}

function detectTypeId(text: string): string {
  if (hasAny(text, ["mezanin", "mezzanine", "lantai tambahan"])) return "mezanin";
  if (hasAny(text, ["kaca", "tempered"])) {
    return hasAny(text, ["skylight", "sliding", "sleding"]) ? "skylight-kaca" : "kaca-tempered";
  }
  if (hasAny(text, ["solarflat"])) {
    return hasAny(text, ["lengkung"]) ? "lengkung-solarflat" : "skylight-solarflat";
  }
  if (hasAny(text, ["twinlite", "polycarbonate", "polikarbonat", "grecca"]))
    return "twinlite-grecca";
  if (hasAny(text, ["skylight", "sliding", "sleding", "buka tutup"])) return "skylight-alderon";
  if (hasAny(text, ["cordoba", "kordoba"])) {
    return hasAny(text, ["acp", "plafon"]) ? "cordoba-acp" : "cordoba-alderon";
  }
  if (hasAny(text, ["cremona"])) return "cremona-alderon";
  if (hasAny(text, ["lengkung", "melengkung"])) {
    return hasAny(text, ["single"]) ? "lengkung-alderon-single" : "lengkung-alderon-double";
  }
  if (hasAny(text, ["spandek", "pasir"])) return "spandek";
  if (hasAny(text, ["transparan", "bening"])) return "alderon-transparan";
  if (hasAny(text, ["single"])) return "alderon-single";
  return "alderon-double";
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}
