"use client";

import { useState } from "react";
import { SiteHeader } from "./ui";
import { Challenge, GameState, GuessResult } from "@/types/game";
import Button from "./Button";

interface GuessingScreenProps {
  gameState: GameState;
  activeChallenges: Challenge[];
  onGameStateChange: (state: GameState) => void;
  onFinish: () => void;
  onBack: () => void;
}

type Step = "pick-player" | "pick-challenge" | "result";

export default function GuessingScreen({ gameState, activeChallenges, onGameStateChange, onFinish, onBack }: GuessingScreenProps) {
  const [step, setStep] = useState<Step>("pick-player");
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [lastResult, setLastResult] = useState<{ correct: boolean; playerName: string; challengeText: string } | null>(null);

  const { guessedPlayers, guessResults } = gameState;
  const allDone = guessedPlayers.length >= gameState.players.length;

  const updateGuessingProgress = (dots: JSX.Element[]) => dots;

  const selectPlayer = (id: string) => {
    const target = gameState.players.find((p) => p.id === id)!;
    const correct = target.challenge!.text;
    const others = gameState.players.filter((p) => p.id !== id && p.challenge).map((p) => p.challenge!.text).filter((t) => t !== correct);
    const pool = Array.from(new Set([...others, ...activeChallenges.filter((c) => c.text !== correct).map((c) => c.text)]));
    const decoys = pool.sort(() => Math.random() - 0.5).slice(0, 3);
    const shuffled = [...decoys, correct].sort(() => Math.random() - 0.5);

    setSelectedPlayerId(id);
    setSelectedChallenge(null);
    setOptions(shuffled);
    setStep("pick-challenge");
  };

  const submitGuess = () => {
    if (!selectedPlayerId || !selectedChallenge) return;
    const target = gameState.players.find((p) => p.id === selectedPlayerId)!;
    const correct = target.challenge!.text === selectedChallenge;
    const result: GuessResult = correct ? "correct" : "wrong";

    const newGuessedPlayers = [...guessedPlayers, target.id];
    const newGuessResults = { ...guessResults, [target.id]: result };
    onGameStateChange({ ...gameState, guessedPlayers: newGuessedPlayers, guessResults: newGuessResults });

    setLastResult({ correct, playerName: target.name, challengeText: target.challenge!.text });
    setStep("result");
  };

  const nextPlayer = () => {
    setStep("pick-player");
    setSelectedPlayerId(null);
    setSelectedChallenge(null);
    setLastResult(null);
  };

  const remaining = gameState.players.length - gameState.guessedPlayers.length;

  return (
    <div className="animate-fadeIn flex flex-col min-h-screen p-6">
      <div className="max-w-[720px] mx-auto w-full">
        <SiteHeader title="WHO IS HIDING?" fontSize="text-[clamp(30px,8vw,60px)]" />

        {/* Progress dots */}
        <div className="font-mono text-[10px] tracking-[3px] text-cs-text-muted text-center mb-[10px] flex items-center justify-center gap-1">
          {gameState.players.map((p) => {
            const guessed = gameState.guessedPlayers.includes(p.id);
            const correct = gameState.guessResults[p.id] === "correct";
            return (
              <span key={p.id} className={[
                "inline-block w-2 h-2 rounded-full",
                !guessed ? "border-2 border-cs-muted" : correct ? "bg-cs-green" : "bg-cs-red",
              ].join(" ")} />
            );
          })}
          <span className="ml-2">{gameState.guessedPlayers.length}/{gameState.players.length} GUESSED</span>
        </div>

        {/* STEP: Result */}
        {step === "result" && lastResult && (
          <>
            <div className={["rounded-lg px-6 py-5 my-4 animate-resultPop",
              lastResult.correct ? "bg-[rgba(0,255,135,0.08)] border-2 border-cs-green" : "bg-[rgba(255,59,48,0.08)] border-2 border-cs-red"].join(" ")}>
              <div className="text-[36px] mb-[6px]">{lastResult.correct ? "🎯" : "💀"}</div>
              <p className={["font-display text-[34px] leading-none mb-1",
                lastResult.correct ? "text-cs-green" : "text-cs-red"].join(" ")}>
                {lastResult.correct ? "CORRECT!" : "WRONG!"}
              </p>
              <p className="text-[14px] text-cs-text-muted mt-1">
                {lastResult.correct ? "You guessed" : "Failed to guess"}{" "}
                <strong className="text-cs-text">{lastResult.playerName}</strong>
                {lastResult.correct ? " correctly" : ""}
              </p>
              <p className={["font-mono text-[12px] tracking-[2px] mt-2",
                lastResult.correct ? "text-cs-red" : "text-cs-green"].join(" ")}>
                {lastResult.correct
                  ? `🥃 ${lastResult.playerName.toUpperCase()} DRINKS A SHOT`
                  : `🍺 ${lastResult.playerName.toUpperCase()} GIVES A SHOT`}
              </p>
              <p className="text-[13px] text-cs-text-muted mt-[6px] italic">
                {lastResult.correct ? "Challenge" : "Actual challenge"}: &quot;{lastResult.challengeText}&quot;
              </p>
            </div>

            <div className="mt-4">
              {gameState.guessedPlayers.length >= gameState.players.length ? (
                <Button variant="red" size="lg" fullWidth onClick={onFinish}>🏁 See Final Scoreboard</Button>
              ) : (
                <Button variant="red" size="lg" fullWidth onClick={nextPlayer}>
                  NEXT PLAYER → ({remaining} left)
                </Button>
              )}
            </div>
            <div className="mt-2">
              <Button variant="ghost" fullWidth size="sm" onClick={onFinish}>🏁 End + See Scoreboard</Button>
            </div>
          </>
        )}

        {/* STEP: Pick player */}
        {step === "pick-player" && (
          <>
            <div className="bg-cs-card border border-[rgba(255,59,48,0.3)] rounded-lg p-5 text-center">
              <p className="font-mono text-[11px] tracking-[3px] text-cs-text-muted">PICK A PLAYER</p>
              <p className="font-display text-[22px] my-1">Who do you want to guess?</p>
              <p className="text-[12px] text-cs-text-muted font-mono">Greyed out = already guessed</p>
            </div>

            <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-[10px] my-4">
              {gameState.players.map((p) => {
                const guessed = gameState.guessedPlayers.includes(p.id);
                const wasCorrect = gameState.guessResults[p.id] === "correct";
                return (
                  <button
                    key={p.id}
                    onClick={() => !guessed && selectPlayer(p.id)}
                    disabled={guessed}
                    className={[
                      "border-2 rounded-lg py-5 px-3 text-center font-display text-[19px] transition-all",
                      guessed && wasCorrect ? "opacity-50 cursor-not-allowed border-cs-green text-cs-green" :
                      guessed ? "opacity-30 cursor-not-allowed border-cs-muted" :
                      "border-cs-red text-cs-text cursor-pointer hover:bg-[rgba(255,59,48,0.1)] hover:scale-[1.03]",
                    ].join(" ")}
                  >
                    {p.name.toUpperCase()}
                    {guessed ? (wasCorrect ? " ✓" : " ✗") : ""}
                  </button>
                );
              })}
            </div>

            {allDone && (
              <div className="mt-4">
                <Button variant="green" fullWidth onClick={onFinish}>🏁 See Final Scoreboard</Button>
              </div>
            )}

            <div className="mt-2">
              <Button variant="ghost" fullWidth size="sm" onClick={onBack}>← Back to Cards</Button>
            </div>
          </>
        )}

        {/* STEP: Pick challenge */}
        {step === "pick-challenge" && (
          <>
            <div className="bg-cs-card border border-[rgba(255,59,48,0.3)] rounded-lg p-5 text-center">
              <p className="font-mono text-[11px] tracking-[3px] text-cs-text-muted">GUESSING</p>
              <p className="font-display text-[28px] my-1">
                {gameState.players.find((p) => p.id === selectedPlayerId)?.name.toUpperCase()}
              </p>
              <p className="text-[13px] text-cs-text-muted">What was their challenge?</p>
            </div>

            <div className="grid grid-cols-2 gap-[10px] mt-4">
              {options.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelectedChallenge(opt)}
                  className={[
                    "border-2 rounded-lg p-3 text-left font-body text-[13px] leading-[1.4] transition-all cursor-pointer",
                    selectedChallenge === opt
                      ? "bg-cs-red text-white border-cs-red"
                      : "bg-cs-card border-cs-red text-cs-text hover:bg-[rgba(255,59,48,0.1)]",
                  ].join(" ")}
                >
                  {opt}
                </button>
              ))}
            </div>

            {selectedChallenge && (
              <div className="mt-4">
                <Button variant="red" fullWidth onClick={submitGuess}>⚡ LOCK IN GUESS</Button>
              </div>
            )}

            <div className="mt-2">
              <Button variant="ghost" fullWidth size="sm" onClick={() => setStep("pick-player")}>← Change Player</Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
