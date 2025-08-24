import { ChatOpenAI } from '@langchain/openai';
import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS } from './constants';
import { LangGraphModuleOptions } from './langgraph.module';

@Injectable()
export class ConfigService {
  constructor(
    @Inject(MODULE_OPTIONS) private readonly options: LangGraphModuleOptions,
  ) {
    console.log('ConfigService', options);
  }

  get llm() {
    return new ChatOpenAI({
      model: this.options.model,
      apiKey: this.options.apiKey,
      configuration: {
        baseURL: this.options.baseUrl,
      },
    });
  }
}
