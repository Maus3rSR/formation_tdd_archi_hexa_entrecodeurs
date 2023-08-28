export interface PlayerEloRepository {
  updatePlayerElo(playerElo: PlayerElo): Promise<void>;
  getPlayerElo(playerId: string): Promise<PlayerElo>;
}
