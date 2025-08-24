import { Env } from '@libs/config';
import { DynamicModule, Module } from '@nestjs/common';
import { MODULE_OPTIONS } from './constants';
import { MainGraph } from './graphs';
import { ConfigService } from './services/config.service';

export type LangGraphModuleOptions = {
  baseUrl: string;
  apiKey: string;
  model: string;
};

@Module({})
export class LangGraphModule {
  static forRoot(options: LangGraphModuleOptions): DynamicModule {
    return {
      module: LangGraphModule,
      global: true,
      imports: [],
      providers: [
        { provide: MODULE_OPTIONS, useValue: options },
        ConfigService,
        MainGraph,
      ],
      exports: [ConfigService, MainGraph],
    };
  }

  static forRootFromEnv(): DynamicModule {
    return LangGraphModule.forRoot({
      baseUrl: Env.string('OPENROUTER_BASE_URL'),
      apiKey: Env.string('OPENROUTER_API_KEY'),
      model: Env.string('OPENROUTER_MODEL'),
    });
  }

  // static forFeature(): DynamicModule {
  //   return {
  //     module: LangGraphModule,
  //     providers: [LlmService],
  //     exports: [LlmService],
  //   };
  // }
}
