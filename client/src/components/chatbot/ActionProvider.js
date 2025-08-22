import { generateResponse } from "./openai"; // Updated to use OpenAI

class ActionProvider {
  createChatBotMessage;
  setState;
  createClientMessage;

  constructor(createChatBotMessage, setState, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setState;
    this.createClientMessage = createClientMessage;
  }

  // Handle the message and get the bot's response
  async handleMessage(message) {
    try {
      const response = await generateResponse(message);
      const botMessage = this.createChatBotMessage(response);
      this.updateChatbotState(botMessage);
    } catch (error) {
      console.error("Error generating response:", error);
      this.handleDefault();
    }
  }

  // Handle a simple "Hello" message
  handleHello() {
    const message = this.createChatBotMessage(
      "Hello! How can I assist you today?"
    );
    this.updateChatbotState(message);
  }

  // Provide a "Help" message with options
  handleHelp() {
    const message = this.createChatBotMessage(
      "I can help you with:\n- Features information\n- Getting started\n- Technical support"
    );
    this.updateChatbotState(message);
  }

  // Provide information about features
  handleFeatures() {
    const message = this.createChatBotMessage(
      "Pocketly offers:\n- Expense tracking\n- Budget planning\n- Financial reports\n- Bill reminders\nWhich feature would you like to know more about?"
    );
    this.updateChatbotState(message);
  }

  // Fallback handler for unknown queries
  handleDefault() {
    const message = this.createChatBotMessage(
      "I'm not sure I understand. Could you rephrase that?"
    );
    this.updateChatbotState(message);
  }

  // Update the chatbot state by adding a new message
  updateChatbotState(message) {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  }
}

export default ActionProvider;
