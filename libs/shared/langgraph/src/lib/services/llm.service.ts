import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from './config.service';

const SYSTEM_PROMPT =
  'You are an agent that accept any input and generate nice prediction wishes for a day';

@Injectable()
export class LlmService {
  @Inject() private readonly config: ConfigService;

  async invoke(input: string): Promise<string> {
    const model = this.config.model;

    const response = await model.invoke([
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: input },
    ]);

    return response.content as string;
  }
}
