"use client";

import { useState, useCallback } from "react";
import Modal from "./Modal";
import { Challenge, GameState } from "@/types/game";
import { MAX_SPINS } from "@/lib/data";
import { SiteHeader, SectionLabel, Divider } from "./ui";
import Button from "./Button";

interface SpinningScreenProps {
  gameState: GameState;
  activeChallenges: Challenge[];
  onGameStateChange: (state: GameState) => void;
  onAllDone: () => void;
}

export default function SpinningScreen({ gameState, activeChallenges, onGameStateChange, onAllDone }: SpinningScreenProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [spinning, setSpinning] = useState(false);

  const currentPlayer = gameState.players[gameState.currentIndex];
  const total = gameState.players.length;
  const doneCount = gameState.players.filter((p) => p.done).length;
  const pct = Math.round((doneCount / total) * 100);
  const allDone = gameState.players.every((p) => p.done);

  const getRandomChallenge = useCallback((): Challenge => {
    return activeChallenges[Math.floor(Math.random() * activeChallenges.length)];
  }, [activeChallenges]);

  const handleGetChallenge = () => {
    if (currentPlayer.done) return;
    setSpinning(true);
    setModalOpen(true);

    const updatedPlayers = gameState.players.map((p, i) =>
      i === gameState.currentIndex
        ? { ...p, spinsUsed: p.spinsUsed + 1, challenge: getRandomChallenge() }
        : p
    );
    setTimeout(() => {
      onGameStateChange({ ...gameState, players: updatedPlayers });
      setSpinning(false);
    }, 600);
  };

  const handleSpinAgain = () => {
    const p = gameState.players[gameState.currentIndex];
    if (p.spinsUsed >= MAX_SPINS) return;
    setSpinning(true);
    const updatedPlayers = gameState.players.map((pl, i) =>
      i === gameState.currentIndex
        ? { ...pl, spinsUsed: pl.spinsUsed + 1, challenge: getRandomChallenge() }
        : pl
    );
    setTimeout(() => {
      onGameStateChange({ ...gameState, players: updatedPlayers });
      setSpinning(false);
    }, 500);
  };

  const handleKeep = () => {
    const updatedPlayers = gameState.players.map((p, i) =>
      i === gameState.currentIndex ? { ...p, done: true } : p
    );
    const next = updatedPlayers.findIndex((p, i) => i > gameState.currentIndex && !p.done);
    const any = next !== -1 ? next : updatedPlayers.findIndex((p) => !p.done);
    const newIndex = any !== -1 ? any : gameState.currentIndex;
    onGameStateChange({ ...gameState, players: updatedPlayers, currentIndex: newIndex });
    setModalOpen(false);
  };

  const p = gameState.players[gameState.currentIndex];
  const isLastSpin = p.spinsUsed >= MAX_SPINS;

  return (
    <div className="animate-fadeIn flex flex-col min-h-screen p-6">
      <div className="max-w-[720px] mx-auto w-full">
        <SiteHeader title="CHALLENGE SPIN" fontSize="text-[clamp(34px,8vw,60px)]" />

        {/* Progress */}
        <div className="my-3">
          <div className="flex justify-between text-[12px] text-cs-text-muted font-mono mb-[6px]">
            <span>PLAYER {gameState.currentIndex + 1} OF {total}</span>
            <span>{pct}%</span>
          </div>
          <div className="bg-cs-border rounded-full h-1 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cs-red to-[#FF6B63] rounded-full transition-all duration-500"
              style={{ width: `${pct}%`, boxShadow: "0 0 8px #FF3B30" }}
            />
          </div>
        </div>

        {/* Turn banner */}
        <div className="text-center px-4 py-4 border border-[rgba(255,59,48,0.2)] rounded-lg my-4"
          style={{ background: "linear-gradient(135deg, #181818 0%, rgba(255,59,48,0.05) 100%)" }}>
          <p className="font-mono text-cs-text-muted text-[11px] tracking-[4px] uppercase mb-1">IT IS NOW</p>
          <p className="font-display text-[52px] text-cs-red leading-none"
            style={{ textShadow: "0 0 30px rgba(255,59,48,0.4)" }}>
            {currentPlayer.name.toUpperCase()}
          </p>
          <p className="font-mono text-cs-text-muted text-[11px] tracking-[4px] uppercase mt-1">TURN TO SPIN</p>
        </div>

        {/* Spin dots + button */}
        <div className="flex flex-col items-center gap-4 py-4">
          <div>
            <p className="font-mono text-[10px] tracking-[4px] text-cs-text-muted uppercase text-center mb-[6px]">SPINS USED</p>
            <div className="flex justify-center gap-2">
              {Array.from({ length: MAX_SPINS }).map((_, i) => (
                <div key={i} className={[
                  "w-[10px] h-[10px] rounded-full border-2 transition-all duration-300",
                  i < p.spinsUsed
                    ? p.spinsUsed >= MAX_SPINS && i === MAX_SPINS - 1
                      ? "bg-cs-red border-cs-red shadow-[0_0_10px_#FF3B30]"
                      : "bg-cs-red border-cs-red"
                    : "border-cs-muted",
                ].join(" ")} />
              ))}
            </div>
          </div>

          {!currentPlayer.done ? (
            <Button variant="red" size="lg" onClick={handleGetChallenge} className="min-w-[220px]">
              🎲 GET CHALLENGE
            </Button>
          ) : (
            <div className="text-center">
              <p className="font-mono text-[11px] text-cs-text-muted tracking-[2px]">CHALLENGE LOCKED</p>
              <p className="font-display text-[20px] text-cs-green mt-1">✓ READY FOR MATCH</p>
            </div>
          )}
        </div>

        <Divider />
        <SectionLabel>ALL PLAYERS</SectionLabel>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-[10px] my-[14px]">
          {gameState.players.map((pl, i) => (
            <div key={pl.id}
              className={["bg-cs-card border rounded-lg p-[14px] text-center cursor-default transition-all",
                pl.done ? "border-cs-green" : "border-cs-border"].join(" ")}>
              <p className="font-display text-[20px] text-cs-text mb-[6px]">{pl.name}</p>
              <p className="text-[22px] my-[6px]">{pl.done ? "✅" : i === gameState.currentIndex ? "🎲" : "⏳"}</p>
              <p className={["font-mono text-[10px] tracking-[2px]",
                pl.done ? "text-cs-green" : "text-cs-red"].join(" ")}>
                {pl.done ? "READY" : i === gameState.currentIndex ? "SPINNING" : "WAITING"}
              </p>
            </div>
          ))}
        </div>

        {allDone && (
          <div className="mt-4">
            <Button variant="green" size="lg" fullWidth onClick={onAllDone}>🚀 ALL DONE — VIEW CARDS</Button>
          </div>
        )}
      </div>

      {/* Spin challenge modal */}
      <Modal open={modalOpen} onClose={() => {}} maxWidth="max-w-[480px]">
        <p className="font-mono text-[10px] tracking-[4px] text-cs-red uppercase mb-3">
          🎲 YOUR CHALLENGE — KEEP IT SECRET
        </p>
        {spinning ? (
          <div className="w-10 h-10 border-[3px] border-cs-border border-t-cs-red rounded-full animate-spinner mx-auto my-5" />
        ) : (
          <>
            <p className="font-display text-[clamp(26px,6vw,44px)] text-cs-text leading-[1.1] my-3 mb-5"
              style={{ textShadow: "0 2px 20px rgba(255,255,255,0.1)" }}>
              {p.challenge?.text}
            </p>
            {isLastSpin && (
              <div className="font-mono text-[11px] text-cs-red tracking-[2px] text-center p-2 border border-[rgba(255,59,48,0.3)] rounded mb-[14px] bg-[rgba(255,59,48,0.05)]">
                ⚠️ FINAL SPIN — YOU MUST KEEP THIS
              </div>
            )}
            <div className="flex gap-[10px]">
              <Button variant="red" fullWidth onClick={handleKeep}>🔒 KEEP IT</Button>
              {!isLastSpin && (
                <Button variant="green" fullWidth onClick={handleSpinAgain}>🔄 SPIN AGAIN</Button>
              )}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
