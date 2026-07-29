import { createServerFn } from "@tanstack/react-start";
import { generateContractorRabWithGemini, type GenerateRabResponse } from "./gemini.server";

export const generateContractorRabFn = createServerFn({ method: "POST" })
  .validator((input: unknown) => {
    const obj = (input ?? {}) as { prompt?: unknown; context?: unknown };
    const prompt = typeof obj.prompt === "string" ? obj.prompt.trim() : "";
    const context = typeof obj.context === "string" ? obj.context.trim() : "";
    if (!prompt) throw new Error("Prompt permintaan RAB kosong");
    if (prompt.length > 3000) throw new Error("Prompt terlalu panjang");
    return { prompt, context };
  })
  .handler(async ({ data }): Promise<GenerateRabResponse> => {
    return generateContractorRabWithGemini(data.prompt, data.context);
  });
