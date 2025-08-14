import { SaveMeBotModule } from '@libs/save-me-bot';
import { LangGraphModule } from '@libs/shared/langgraph';
import { Module } from '@nestjs/common';

@Module({
  imports: [SaveMeBotModule.forRootFromEnv(), LangGraphModule.forRootFromEnv()],
})
export class AppModule {}
