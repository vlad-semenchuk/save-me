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
      global: true,
      imports: [],
      providers: [MainGraph],
      exports: [MainGraph],
    };
  }
}
