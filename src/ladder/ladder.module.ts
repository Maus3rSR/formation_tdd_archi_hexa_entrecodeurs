import { Module } from '@nestjs/common';

import { LadderController } from './adapters/primary/ladder.controller';
import { ComputeEloCommandHandler } from './core/usecase/elo-computing/compute-elo.commandhandler';
import { PlayerEloRepository } from './core/ports/player-elo.repository';
import { InMemoryPlayerEloRepository } from './adapters/secondary/InMemoryPlayerElo.repository';
import { PlayerElo } from './core/models/player-elo';

@Module({
  imports: [],
  controllers: [LadderController],
  providers: [
    {
      provide: 'playerEloRepository',
      useFactory: () => {
        const map = new Map<string, PlayerElo>();
        map.set('player1', new PlayerElo('player1', 1000));
        map.set('player2', new PlayerElo('player2', 1000));
        return new InMemoryPlayerEloRepository(map);
      },
    },
    {
      provide: ComputeEloCommandHandler,
      useFactory: (repository: PlayerEloRepository) => {
        return new ComputeEloCommandHandler(repository);
      },
      inject: ['playerEloRepository'],
    },
  ],
})
export class LadderModule {}
