import { Env } from '@libs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { MODULE_OPTIONS } from './constants';
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
      providers: [
        { provide: MODULE_OPTIONS, useValue: options },
        SaveMeBotService,
      ],
    };
  }

  static forRootFromEnv(): DynamicModule {
    return SaveMeBotModule.forRoot({
      botToken: Env.string('SAVE_ME_BOT_TOKEN'),
    });
  }
}
