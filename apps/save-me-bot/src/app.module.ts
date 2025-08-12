import { SaveMeBotModule } from '@libs/save-me-bot';
import { Module } from '@nestjs/common';

@Module({
  imports: [SaveMeBotModule],
})
export class AppModule {}
