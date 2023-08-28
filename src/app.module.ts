import { Module } from '@nestjs/common';

import { LadderModule } from './ladder/ladder.module';

@Module({
  imports: [LadderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
