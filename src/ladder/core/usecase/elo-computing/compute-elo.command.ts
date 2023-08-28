import { MatchResult } from '../../models/player-elo';

export class ComputeEloCommand {
  playerId: string;
  type: MatchResult;
}
