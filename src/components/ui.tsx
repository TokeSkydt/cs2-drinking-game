// Server components — zero JavaScript sent to the client for these.
// Used across multiple screens as pure display elements.

interface SiteHeaderProps {
  title: string;
  tagline?: string;
  fontSize?: string;
}

export function SiteHeader({ title, tagline, fontSize = "text-[clamp(48px,12vw,96px)]" }: SiteHeaderProps) {
  return (
    <div className="text-center py-7">
      <h1
        className={`font-display ${fontSize} text-cs-red leading-none animate-glitch`}
        style={{ textShadow: "0 0 40px rgba(255,59,48,0.4), 0 0 80px rgba(255,59,48,0.2)" }}
      >
        {title}
      </h1>
      {tagline && (
        <p className="font-mono text-cs-text-muted text-[12px] tracking-[4px] uppercase mt-1">
          {tagline}
        </p>
      )}
    </div>
  );
}

export function Divider() {
  return <div className="h-px bg-cs-border my-[18px]" />;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-mono text-[10px] tracking-[4px] text-cs-text-muted uppercase mb-[10px] flex items-center gap-[10px] after:flex-1 after:h-px after:bg-cs-border after:content-['']">
      {children}
    </p>
  );
}

interface StaticPlayerCardProps {
  name: string;
  icon: string;
  status: string;
  statusColor: "red" | "green";
  borderColor?: "red" | "green" | "default";
}

export function StaticPlayerCard({ name, icon, status, statusColor, borderColor = "default" }: StaticPlayerCardProps) {
  const border =
    borderColor === "green" ? "border-cs-green" :
    borderColor === "red" ? "border-cs-red" :
    "border-cs-border";
  const textColor = statusColor === "green" ? "text-cs-green" : "text-cs-red";
  return (
    <div className={`bg-cs-card border ${border} rounded-lg p-[14px] text-center`}>
      <p className="font-display text-[20px] text-cs-text mb-[6px]">{name}</p>
      <p className="text-[22px] my-[6px]">{icon}</p>
      <p className={`font-mono text-[10px] tracking-[2px] ${textColor}`}>{status}</p>
    </div>
  );
}

export function GuessingRulesCard() {
  return (
    <div className="bg-cs-card border-l-4 border-l-cs-red border border-cs-border rounded-lg p-[18px]">
      <p className="font-display text-[22px] mb-2">GUESSING ROUND</p>
      <p className="text-[14px] text-cs-text-muted leading-relaxed">
        One guess per player.{" "}
        <strong className="text-cs-text">
          Correct → they drink a shot. Wrong → they give out a shot.
        </strong>
      </p>
    </div>
  );
}
