"use client";

import { useState, useCallback } from "react";
import { Challenge, GamePhase, GameState, Player } from "@/types/game";
import { DEFAULT_CHALLENGES } from "@/lib/data";

import SetupScreen from "@/components/SetupScreen";
import SpinningScreen from "@/components/SpinningScreen";
import OverviewScreen from "@/components/OverviewScreen";
import GuessingScreen from "@/components/GuessingScreen";
import ScoreboardScreen from "@/components/ScoreboardScreen";
import RulesModal from "@/components/RulesModal";
import ChallengesModal from "@/components/ChallengesModal";
import Toast from "@/components/Toast";

const initGameState = (): GameState => ({
  players: [],
  currentIndex: 0,
  guessedPlayers: [],
  guessResults: {},
});

export default function Home() {
  const [phase, setPhase] = useState<GamePhase>("setup");
  const [challenges, setChallenges] = useState<Challenge[]>(DEFAULT_CHALLENGES);
  const [gameState, setGameState] = useState<GameState>(initGameState());
  const [rulesOpen, setRulesOpen] = useState(false);
  const [challengesOpen, setChallengesOpen] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "" } | null>(null);

  const notify = useCallback((msg: string, type: "success" | "error" | "" = "") => {
    setToast({ msg, type });
  }, []);

  const handleStart = (names: string[]) => {
    const players: Player[] = names.map((name, i) => ({
      id: "p" + i,
      name,
      challenge: null,
      spinsUsed: 0,
      done: false,
    }));
    setGameState({ ...initGameState(), players });
    setPhase("spinning");
  };

  const handleReset = () => {
    setGameState(initGameState());
    setPhase("setup");
  };

  const activeChallenges = challenges.filter((c) => c.active);

  return (
    <>
      {phase === "setup" && (
        <SetupScreen
          onStart={handleStart}
          onOpenRules={() => setRulesOpen(true)}
          onOpenChallenges={() => setChallengesOpen(true)}
          challenges={challenges}
        />
      )}

      {phase === "spinning" && (
        <SpinningScreen
          gameState={gameState}
          activeChallenges={activeChallenges}
          onGameStateChange={setGameState}
          onAllDone={() => setPhase("overview")}
        />
      )}

      {phase === "overview" && (
        <OverviewScreen
          gameState={gameState}
          onStartGuessing={() => {
            setGameState((s) => ({ ...s, guessedPlayers: [], guessResults: {} }));
            setPhase("guessing");
          }}
          onNewGame={handleReset}
        />
      )}

      {phase === "guessing" && (
        <GuessingScreen
          gameState={gameState}
          activeChallenges={activeChallenges}
          onGameStateChange={setGameState}
          onFinish={() => setPhase("scoreboard")}
          onBack={() => setPhase("overview")}
        />
      )}

      {phase === "scoreboard" && (
        <ScoreboardScreen
          gameState={gameState}
          onPlayAgain={handleReset}
        />
      )}

      <RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />
      <ChallengesModal
        open={challengesOpen}
        onClose={() => setChallengesOpen(false)}
        challenges={challenges}
        onChange={setChallenges}
      />

      {toast && (
        <Toast message={toast.msg} type={toast.type} onDone={() => setToast(null)} />
      )}
    </>
  );
}
