import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import logoAsset from "@/assets/brand-logo.png";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAsset}
              alt="Living Space Pro"
              className="h-10 w-10 object-contain sm:h-12 sm:w-12"
            />
            <div className="leading-tight">
              <div className="font-display text-sm font-bold sm:text-base">Living Space Pro</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                livingspro.com
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              Beranda
            </Link>
            <Link to="/rab" className="text-muted-foreground hover:text-foreground">
              RAB AI
            </Link>
            <Link to="/blog" className="font-semibold text-foreground">
              Blog
            </Link>
          </nav>
        </div>
      </header>
      <Outlet />
      <FloatingWhatsApp />
    </div>
  );
}
