import { DynamicModule, Module } from '@nestjs/common';
import { MainGraph } from './graphs';

export type LangGraphModuleOptions = {
  baseUrl: string;
  apiKey: string;
  model: string;
};

@Module({})
export class LangGraphModule {
  static forRoot(): DynamicModule {
    return {
      module: LangGraphModule,
      imports: [],
      providers: [
        // { provide: MODULE_OPTIONS, useValue: options },
        // ConfigService,
        MainGraph,
      ],
      exports: [MainGraph],
    };
  }

  // static forRootFromEnv(): DynamicModule {
  //   return LangGraphModule.forRoot({
  //     baseUrl: Env.string('OPENROUTER_BASE_URL'),
  //     apiKey: Env.string('OPENROUTER_API_KEY'),
  //     model: Env.string('OPENROUTER_MODEL'),
  //   });
  // }
}
