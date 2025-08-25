import { LangGraphModule } from '@libs/langgraph';
import { SaveMeBotModule } from '@libs/save-me-bot';
import { Module } from '@nestjs/common';

@Module({
  imports: [SaveMeBotModule.forRootFromEnv(), LangGraphModule.forRoot()],
})
export class AppModule {}
