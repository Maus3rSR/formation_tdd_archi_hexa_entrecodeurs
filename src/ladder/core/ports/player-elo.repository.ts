import { PlayerElo } from '../models/player-elo';

export interface PlayerEloRepository {
  updatePlayerElo(playerElo: PlayerElo): Promise<void>;
  getPlayerElo(playerId: string): Promise<PlayerElo>;
}
