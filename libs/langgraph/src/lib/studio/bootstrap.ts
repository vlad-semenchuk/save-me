import { CompiledStateGraph } from '@langchain/langgraph';
import { Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '../config.service';
import { GraphStateType, MainGraph } from '../graphs/main.graph';
import { LangGraphModule } from '../langgraph.module';

// Bootstrap a minimal NestJS application context for LangGraph Studio
async function createStudioGraph<
  T extends {
    createGraph: (
      config: ConfigService,
    ) => CompiledStateGraph<GraphStateType, Partial<GraphStateType>, string>;
  },
>(
  provider: Type<T>,
): Promise<
  CompiledStateGraph<GraphStateType, Partial<GraphStateType>, string>
> {
  try {
    // Create standalone application (no HTTP server)
    const app = await NestFactory.createApplicationContext(
      LangGraphModule.forRootFromEnv(),
      {
        logger: ['error', 'warn'], // Minimal logging for Studio
      },
    );

    const graph = app.get(provider);
    const config = app.get(ConfigService);

    return graph.createGraph(config);
  } catch (error) {
    console.error(
      'Failed to bootstrap NestJS context for LangGraph Studio:',
      error,
    );
    throw error;
  }
}

// Export for LangGraph Studio
export const mainGraph = createStudioGraph(MainGraph);
