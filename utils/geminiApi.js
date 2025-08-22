// src/utils/geminiApi.js

import { GoogleGenerativeAI } from "@google/generative-ai"; // Ensure you have the necessary Gemini package installed
import dotenv from "dotenv";

// Load environment variables from a .env file
dotenv.config();

// Initialize the Gemini AI client using the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Function to get insights from Gemini AI
export async function getGeminiResponse(query, expenseData) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  // Constructing the prompt for Gemini AI
  const prompt = `
    As an AI financial advisor, analyze the following expense data and answer the query: "${query}"

    Expense Data:
    - Total Spent: $${expenseData.total}
    - Category Breakdown: ${JSON.stringify(expenseData.categories)}
    - Recent Expenses: ${JSON.stringify(expenseData.recentExpenses)}

    Please provide specific insights and actionable advice based on this data.
  `;

  try {
    // Generate content based on the prompt
    const result = await model.generateContent(prompt);
    return result.response.text(); // Return the generated text response from Gemini AI
  } catch (error) {
    console.error("Error getting Gemini response:", error);
    return "I apologize, but I encountered an error analyzing your expenses. Please try again.";
  }
}
