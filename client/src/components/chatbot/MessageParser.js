class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  // Parse the incoming message and handle it through the actionProvider
  parse(message) {
    // Update context with user message
    this.state.context.push({
      role: "user",
      content: message,
    });

    // Call the action provider to generate a response
    this.actionProvider.handleMessage(message);
  }
}

export default MessageParser;
