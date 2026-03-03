export interface Challenge {
  text: string;
  active: boolean;
  custom: boolean;
}

export interface Player {
  id: string;
  name: string;
  challenge: Challenge | null;
  spinsUsed: number;
  done: boolean;
}

export type GamePhase = "setup" | "spinning" | "overview" | "guessing" | "scoreboard";

export type GuessResult = "correct" | "wrong";

export interface GameState {
  players: Player[];
  currentIndex: number;
  guessedPlayers: string[];
  guessResults: Record<string, GuessResult>;
}
