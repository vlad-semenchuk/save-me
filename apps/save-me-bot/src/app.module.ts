import { SaveMeBotModule } from '@libs/save-me-bot';
import { Module } from '@nestjs/common';

@Module({
  imports: [SaveMeBotModule.forRootFromEnv()],
})
export class AppModule {}
