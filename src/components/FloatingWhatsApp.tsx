import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

const WA_URL =
  "https://wa.me/6285284485290?text=Halo%20Living%20Space%20Pro%2C%20saya%20ingin%20konsultasi%20gratis%20kanopi.";

export function FloatingWhatsApp() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const t = setTimeout(() => setExpanded(true), 3500);
    const t2 = setTimeout(() => setExpanded(false), 10000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-4 z-[60] flex items-end gap-2 sm:bottom-6 sm:right-6">
      {expanded && !dismissed && (
        <div className="relative mb-1 hidden max-w-[240px] rounded-xl border border-border bg-card p-3 pr-7 text-xs shadow-xl sm:block">
          <button
            aria-label="Tutup"
            onClick={() => setDismissed(true)}
            className="absolute right-1.5 top-1.5 rounded p-0.5 text-muted-foreground hover:bg-muted"
          >
            <X className="h-3.5 w-3.5" />
          </button>
          <div className="font-semibold text-foreground">Butuh konsultasi?</div>
          <div className="mt-0.5 text-muted-foreground">
            Chat gratis dengan tim Living Space Pro sekarang.
          </div>
          <div className="absolute -bottom-1.5 right-6 h-3 w-3 rotate-45 border-b border-r border-border bg-card" />
        </div>
      )}
      <a
        href={WA_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat WhatsApp"
        onClick={() => {
          setExpanded(false);
          setDismissed(true);
        }}
        className="group relative flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 font-semibold text-white shadow-2xl shadow-emerald-600/30 ring-4 ring-[#25D366]/20 transition hover:brightness-110 active:scale-95"
      >
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="h-5 w-5 fill-white" />
        <span className="hidden text-sm sm:inline">Chat WhatsApp</span>
      </a>
    </div>
  );
}
