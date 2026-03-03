import { Challenge } from "@/types/game";

export const DEFAULT_CHALLENGES: Challenge[] = [
  "Get a kill in the air",
  "Get a jump no-scope kill",
  "Get a headshot no-scope",
  "Get 4 no-scope kills",
  "Get 2 no-scopes in the same round",
  "Get 2 Deagle headshots in the same round",
  "Get 2 wallbang kills",
  "Get 2 pistol kills in one round",
  "Get 6 kills with pistol",
  "Get 12 kills with AWP",
  "Get 8 kills with Scout",
  "Get 2 kills through smoke in the same round",
  "Get 2 grenade kills",
  "Get a kill with your first bullet",
  "Get a knife kill",
  "Get a Zeus kill",
  "Get a 4K (4 kills in one round)",
  "Ninja defuse (an enemy must be alive when defusing)",
  "Have $16,000 in one round",
].map((text) => ({ text, active: true, custom: false }));

export const MAX_SPINS = 3;
