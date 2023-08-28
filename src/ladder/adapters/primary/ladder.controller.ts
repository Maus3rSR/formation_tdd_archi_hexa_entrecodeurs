import { Body, Controller, Post } from '@nestjs/common';

import { MatchResult } from 'src/ladder/core/models/player-elo';
import { ComputeEloCommandHandler } from 'src/ladder/core/usecase/elo-computing/compute-elo.commandhandler';

@Controller('ladder')
export class LadderController {
  constructor(
    private readonly computeEloCommandHandler: ComputeEloCommandHandler,
  ) {}

  @Post('elo')
  async computeElo(@Body() params: { playerId: string; type: MatchResult }) {
    console.log(params);
    await this.computeEloCommandHandler.execute(params);
  }
}
