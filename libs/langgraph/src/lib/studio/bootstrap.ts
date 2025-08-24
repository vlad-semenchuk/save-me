import 'dotenv/config';

import { CompiledStateGraph } from '@langchain/langgraph';
import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { GraphStateType, MainGraph } from '../graphs/main.graph';
import { LangGraphModule } from '../langgraph.module';

// Bootstrap a minimal NestJS application context for LangGraph Studio
async function createStudioGraph<
  T extends {
    createGraph: () => CompiledStateGraph<
      GraphStateType,
      Partial<GraphStateType>,
      string
    >;
  },
>(
  provider: Type<T>,
): Promise<
  CompiledStateGraph<GraphStateType, Partial<GraphStateType>, string>
> {
  try {
    // Create standalone application (no HTTP server)
    const app = await NestFactory.createApplicationContext(
      LangGraphModule.forRoot(),
      {
        logger: ['error', 'warn'], // Minimal logging for Studio
      },
    );

    const graph = await app.resolve(provider);

    return graph.createGraph();
  } catch (error) {
    console.error(
      'Failed to bootstrap NestJS context for LangGraph Studio:',
      error,
    );
    throw error;
  }
}

// Export for LangGraph Studio
// export const mainGraph = createStudioGraph(MainGraph);

export const mainGraph = async () => {
  return createStudioGraph(MainGraph);
};
