import axios from "axios";

// Chat history to maintain context
const INITIAL_CHAT_CONTEXT = [
  {
    role: "system",
    content:
      "You are a helpful assistant for Pocketly, a personal finance management app. Please respond in a friendly, professional manner and keep responses concise.",
  },
];

export const generateResponse = async (message, userData) => {
  try {
    // OpenAI API Key (ensure you store this securely, for example in environment variables)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      throw new Error("OpenAI API key not configured");
    }

    // Set up the chat history (add user message and AI response context)
    const conversation = [
      ...INITIAL_CHAT_CONTEXT,
      { role: "user", content: message },
    ];

    // Make a request to OpenAI's API to generate a response
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Or "gpt-4" if you're using GPT-4
        messages: conversation,
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    // Extract the chatbot's reply from the response
    const botMessage = response.data.choices[0].message.content;
    return botMessage;
  } catch (error) {
    console.error("Error generating response:", error);
    throw error;
  }
};
