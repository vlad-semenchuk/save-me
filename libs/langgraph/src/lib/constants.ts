import { ChatOpenAI } from '@langchain/openai';
import { Env } from '@libs/config';

export const llm = new ChatOpenAI({
  model: Env.string('OPENROUTER_MODEL'),
  apiKey: Env.string('OPENROUTER_API_KEY'),
  configuration: {
    baseURL: Env.string('OPENROUTER_BASE_URL'),
  },
});
