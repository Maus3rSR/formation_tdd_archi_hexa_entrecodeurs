import { PlayerElo } from 'src/ladder/core/models/player-elo';
import { PlayerEloRepository } from 'src/ladder/core/ports/player-elo.repository';

export class InMemoryPlayerEloRepository implements PlayerEloRepository {
  constructor(private eloRank: Map<string, PlayerElo> = new Map()) {}

  async updatePlayerElo(playerElo: PlayerElo): Promise<void> {
    this.eloRank.set(playerElo.playerId, playerElo);
    console.log(this.eloRank);
    return Promise.resolve();
  }
  async getPlayerElo(playerId: string): Promise<PlayerElo> {
    return this.eloRank.get(playerId);
  }
}
