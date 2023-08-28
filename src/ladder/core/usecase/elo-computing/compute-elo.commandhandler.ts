import { PlayerEloRepository } from '../../ports/player-elo.repository';
import { ComputeEloCommand } from './compute-elo.command';

export class ComputeEloCommandHandler {
  constructor(private playerEloRepository: PlayerEloRepository) {}

  async execute(command: ComputeEloCommand): Promise<void> {
    const playerElo = await this.playerEloRepository.getPlayerElo(
      command.playerId,
    );

    playerElo.computeElo(command.type);

    return this.playerEloRepository.updatePlayerElo(playerElo);
  }
}
