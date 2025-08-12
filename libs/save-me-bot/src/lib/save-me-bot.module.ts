import { Env } from '@libs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { MODULE_OPTIONS } from './constants';
import { RootController } from './controllers/root.controller';
import { SaveMeBotService } from './save-me-bot.service';

export type SaveMeBotModuleOptions = {
  botToken: string;
};

@Module({})
export class SaveMeBotModule {
  static forRoot(options: SaveMeBotModuleOptions): DynamicModule {
    return {
      module: SaveMeBotModule,
      imports: [],
      controllers: [RootController],
      providers: [
        { provide: MODULE_OPTIONS, useValue: options },
        SaveMeBotService,
      ],
      exports: [SaveMeBotService],
    };
  }

  static forRootFromEnv(): DynamicModule {
    return SaveMeBotModule.forRoot({
      botToken: Env.string('SAVE_ME_BOT_TOKEN'),
    });
  }
}
