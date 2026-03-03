"use client";

import { useState } from "react";
import { GameState } from "@/types/game";
import { SiteHeader, Divider, SectionLabel, GuessingRulesCard } from "./ui";

interface OverviewScreenProps {
  gameState: GameState;
  onStartGuessing: () => void;
  onNewGame: () => void;
}

// Only the card grid needs client interactivity (reveal toggle).
// Everything else is static but must live in the same client boundary
// because it receives onStartGuessing / onNewGame callbacks from the parent.
export default function OverviewScreen({ gameState, onStartGuessing, onNewGame }: OverviewScreenProps) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setRevealed((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="animate-fadeIn flex flex-col min-h-screen p-6">
      <div className="max-w-[720px] mx-auto w-full">
        <SiteHeader
          title="MATCH OVER?"
          tagline="TAP A CARD TO REVEAL"
          fontSize="text-[clamp(30px,8vw,60px)]"
        />

        <SectionLabel>PLAYER CARDS</SectionLabel>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[10px] my-[14px]">
          {gameState.players.map((p) => {
            const isRevealed = !!revealed[p.id];
            return (
              <div
                key={p.id}
                onClick={() => toggle(p.id)}
                className={[
                  "bg-cs-card border rounded-lg p-[14px] cursor-pointer transition-all text-center hover:-translate-y-[2px]",
                  isRevealed
                    ? "border-cs-green"
                    : "border-cs-border hover:border-cs-red",
                ].join(" ")}
              >
                <p className="font-display text-[20px] text-cs-text mb-[6px]">{p.name}</p>
                <p className="text-[22px] my-[6px]">{isRevealed ? "✅" : "🔴"}</p>
                <p className={["font-mono text-[10px] tracking-[2px]",
                  isRevealed ? "text-cs-green" : "text-cs-red"].join(" ")}>
                  {isRevealed ? "REVEALED" : "TAP TO REVEAL"}
                </p>
                {isRevealed && (
                  <p className="mt-2 text-[12px] text-cs-text-muted leading-[1.4]">
                    {p.challenge?.text ?? "—"}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <Divider />
        <GuessingRulesCard />

        <div className="mt-4">
          <button
            onClick={onStartGuessing}
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-[18px] border-none rounded bg-cs-red text-white font-display text-[28px] tracking-[2px] uppercase cursor-pointer animate-pulseRed hover:bg-[#FF5248] transition-all active:scale-[0.97] relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent"
          >
            🎯 START GUESSING ROUND
          </button>
        </div>
        <div className="mt-2">
          <button
            onClick={onNewGame}
            className="w-full inline-flex items-center justify-center gap-2 px-[18px] py-[9px] border border-cs-border rounded bg-transparent text-cs-text-muted font-display text-[15px] tracking-[2px] uppercase cursor-pointer hover:border-cs-muted hover:text-cs-text transition-all active:scale-[0.97]"
          >
            ↺ New Game
          </button>
        </div>
      </div>
    </div>
  );
}

