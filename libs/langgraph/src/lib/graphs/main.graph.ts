import { HumanMessage } from '@langchain/core/messages';
import { Annotation, END, START, StateGraph } from '@langchain/langgraph';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '../services/config.service';

const GraphState = Annotation.Root({
  messages: Annotation<HumanMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  intent: Annotation<string>(),
  intentClear: Annotation<boolean>(),
});

type GraphStateType = typeof GraphState.State;

@Injectable()
export class MainGraph implements OnModuleInit {
  public compiledGraph: any;

  constructor(private readonly config: ConfigService) {}

  onModuleInit() {
    this.compiledGraph = this.createGraph();
  }

  createGraph() {
    const intentNode = async (
      state: GraphStateType,
    ): Promise<Partial<GraphStateType>> => {
      console.log('Analyzing user intent...');

      const userMessage = state.messages[state.messages.length - 1];
      const userText =
        typeof userMessage?.content === 'string'
          ? userMessage.content
          : JSON.stringify(userMessage?.content || '');

      try {
        const response = await this.config.llm.invoke([
          new HumanMessage(
            `Analyze the user's message and determine if their intent is clear. 
            User message: "${userText}"
            
            Respond with:
            - If intent is clear: "CLEAR: [brief description of intent]"
            - If intent is unclear: "UNCLEAR: [what clarification is needed]"`,
          ),
        ]);

        const content =
          typeof response.content === 'string'
            ? response.content
            : JSON.stringify(response.content);

        const isClear = content.startsWith('CLEAR:');
        const intent = isClear
          ? content.replace('CLEAR: ', '')
          : content.replace('UNCLEAR: ', '');

        if (!isClear) {
          return {
            messages: [new HumanMessage(`I need clarification: ${intent}`)],
            intent,
            intentClear: false,
          };
        }

        return {
          intent,
          intentClear: true,
        };
      } catch (error) {
        console.error('Error in intent node:', error);
        return {
          messages: [
            new HumanMessage(
              'Sorry, I had trouble understanding your request.',
            ),
          ],
          intent: 'error',
          intentClear: false,
        };
      }
    };

    const processNode = (_state: GraphStateType): Partial<GraphStateType> => {
      console.log('Processing...');
      return {};
    };

    const shouldProcess = (state: GraphStateType): string => {
      return state.intentClear ? 'process' : END;
    };

    const graph = new StateGraph(GraphState)
      .addNode('analyze', intentNode)
      .addNode('process', processNode)
      .addEdge(START, 'analyze')
      .addConditionalEdges('analyze', shouldProcess)
      .addEdge('process', END);

    return graph.compile();
  }
}

// // Export compiled graph instance for LangGraph Studio
// const mainGraphInstance = new MainGraph();
// export const mainGraph = mainGraphInstance.createGraph();
