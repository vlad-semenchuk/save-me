import { HumanMessage } from '@langchain/core/messages';
import { ConfigService } from '../config.service';
import { GraphStateType } from '../graphs/main.graph';

export const intentNode = async (
  state: GraphStateType,
  config: ConfigService,
): Promise<Partial<GraphStateType>> => {
  const userMessage = state.messages[state.messages.length - 1];
  const userText =
    typeof userMessage?.content === 'string'
      ? userMessage.content
      : JSON.stringify(userMessage?.content || '');

  try {
    const response = await config.llm.invoke([
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
        new HumanMessage('Sorry, I had trouble understanding your request.'),
      ],
      intent: 'error',
      intentClear: false,
    };
  }
};
