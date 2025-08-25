import { HumanMessage } from '@langchain/core/messages';
import { Annotation, END, START, StateGraph } from '@langchain/langgraph';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { intentNode } from '../nodes';

const GraphState = Annotation.Root({
  messages: Annotation<HumanMessage[]>({
    reducer: (x, y) => x.concat(y),
  }),
  intent: Annotation<string>(),
  intentClear: Annotation<boolean>(),
});

export type GraphStateType = typeof GraphState.State;

@Injectable()
export class MainGraph implements OnModuleInit {
  public graph!: ReturnType<typeof this.createGraph>;

  onModuleInit() {
    this.graph = this.createGraph();
  }

  private createGraph() {
    const processNode = (_state: GraphStateType): Partial<GraphStateType> => {
      console.log('Processing...');
      return {};
    };

    const shouldProcess = (state: GraphStateType): string => {
      return state.intentClear ? processNode.name : END;
    };

    const graph = new StateGraph(GraphState)
      .addNode(intentNode.name, intentNode)
      .addNode(processNode.name, processNode)
      .addEdge(START, intentNode.name)
      .addConditionalEdges(intentNode.name, shouldProcess)
      .addEdge(processNode.name, END);

    return graph.compile();
  }
}
