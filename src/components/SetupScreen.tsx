"use client";

import { useState } from "react";
import { Divider, SectionLabel } from "./ui";
import Button from "./Button";
import { Challenge } from "@/types/game";

interface SetupScreenProps {
  onStart: (names: string[]) => void;
  onOpenRules: () => void;
  onOpenChallenges: () => void;
  challenges: Challenge[];
}

export default function SetupScreen({ onStart, onOpenRules, onOpenChallenges, challenges }: SetupScreenProps) {
  const [names, setNames] = useState<string[]>(["", ""]);

  const addPlayer = () => {
    if (names.length >= 10) return;
    setNames([...names, ""]);
  };

  const removePlayer = (i: number) => {
    if (names.length <= 2) return;
    setNames(names.filter((_, idx) => idx !== i));
  };

  const updateName = (i: number, val: string) => {
    const updated = [...names];
    updated[i] = val;
    setNames(updated);
  };

  const handleStart = () => {
    const filled = names.map((n) => n.trim()).filter(Boolean);
    if (filled.length < 2) return;
    const active = challenges.filter((c) => c.active);
    if (active.length < 4) return;
    onStart(filled);
  };

  return (
    <div className="animate-fadeIn flex flex-col min-h-screen p-6">
      <div className="max-w-[720px] mx-auto w-full">
        {/* Header */}
        <div className="text-center py-7">
          <h1 className="font-display text-[clamp(48px,12vw,96px)] text-cs-red leading-none animate-glitch"
            style={{ textShadow: "0 0 40px rgba(255,59,48,0.4), 0 0 80px rgba(255,59,48,0.2)" }}>
            DRINK OR DIE
          </h1>
          <p className="font-mono text-cs-text-muted text-[12px] tracking-[4px] uppercase mt-1">
            CS2 // DRINKING GAME // 2025
          </p>
        </div>

        {/* Rule + Challenge buttons */}
        <div className="grid grid-cols-2 gap-[10px] my-5">
          <Button variant="outline-red" fullWidth onClick={onOpenRules}>📋 VIEW RULES</Button>
          <Button variant="outline-green" fullWidth onClick={onOpenChallenges}>🎲 CHALLENGES</Button>
        </div>

        <Divider />
        <SectionLabel>PLAYERS</SectionLabel>

        <div className="flex flex-col gap-[10px] my-4">
          {names.map((name, i) => (
            <div key={i} className="flex gap-2 items-center" style={{ animation: "slideUp 0.3s ease" }}>
              <span className="font-mono text-cs-red text-[13px] min-w-[28px]">#{i + 1}</span>
              <input
                type="text"
                value={name}
                onChange={(e) => updateName(i, e.target.value)}
                placeholder="Enter name..."
                maxLength={20}
                className="flex-1 bg-cs-surface border border-cs-border rounded px-[14px] py-[10px] text-cs-text font-body text-[15px] outline-none focus:border-cs-red focus:shadow-[0_0_0_2px_rgba(255,59,48,0.1)] placeholder:text-cs-muted transition-all"
              />
              <button
                onClick={() => removePlayer(i)}
                className="bg-transparent border border-cs-border rounded text-cs-text-muted w-9 h-9 flex items-center justify-center text-lg hover:border-cs-red hover:text-cs-red transition-all flex-shrink-0"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addPlayer}
          disabled={names.length >= 10}
          className="flex items-center gap-2 bg-transparent border border-dashed border-cs-border rounded px-4 py-[10px] text-cs-text-muted cursor-pointer font-body text-[14px] transition-all w-full hover:border-cs-green hover:text-cs-green disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <span>+</span> Add Player
        </button>

        <div className="mt-6">
          <Button variant="red" size="lg" fullWidth onClick={handleStart}>🎮 START GAME</Button>
        </div>
      </div>
    </div>
  );
}
