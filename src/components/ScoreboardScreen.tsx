import { GameState } from "@/types/game";
import { SiteHeader, SectionLabel } from "./ui";

interface ScoreboardScreenProps {
  gameState: GameState;
  onPlayAgain: () => void;
}

export default function ScoreboardScreen({ gameState, onPlayAgain }: ScoreboardScreenProps) {
  return (
    <div className="animate-fadeIn flex flex-col min-h-screen p-6">
      <div className="max-w-[720px] mx-auto w-full">
        <SiteHeader
          title="FINAL SCORES"
          tagline="DRINK UP — GAME OVER"
          fontSize="text-[clamp(30px,8vw,60px)]"
        />

        <SectionLabel>RESULTS</SectionLabel>

        <div className="flex flex-col gap-2 my-4">
          {gameState.players.map((p) => {
            const result = gameState.guessResults[p.id];
            const badge =
              result === "correct"
                ? "🥃 DRINK A SHOT"
                : result === "wrong"
                ? "🍺 GIVE A SHOT"
                : "NOT GUESSED";
            const badgeClass =
              result === "correct"
                ? "bg-[rgba(255,59,48,0.15)] text-cs-red border border-[rgba(255,59,48,0.3)]"
                : result === "wrong"
                ? "bg-[rgba(0,255,135,0.1)] text-cs-green border border-[rgba(0,255,135,0.2)]"
                : "bg-cs-surface text-cs-text-muted border border-cs-border";

            return (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 px-[14px] py-[10px] bg-cs-card border border-cs-border rounded-md"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-display text-[20px]">{p.name}</p>
                  <p className="text-[12px] text-cs-text-muted overflow-hidden text-ellipsis whitespace-nowrap">
                    {p.challenge?.text ?? "—"}
                  </p>
                </div>
                <span
                  className={`font-mono text-[11px] tracking-wide px-[10px] py-1 rounded-full whitespace-nowrap ${badgeClass}`}
                >
                  {badge}
                </span>
              </div>
            );
          })}
        </div>

        {/* onClick is passed from the client parent — works fine without "use client" here */}
        <div className="mt-4">
          <button
            onClick={onPlayAgain}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-[14px] border border-cs-border rounded bg-transparent text-cs-text-muted font-display text-[22px] tracking-[2px] uppercase cursor-pointer hover:border-cs-muted hover:text-cs-text transition-all active:scale-[0.97]"
          >
            ↺ Play Again
          </button>
        </div>
      </div>
    </div>
  );
}

