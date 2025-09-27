// 1. Load environment variables from .env file
require('dotenv').config();

// 2. Import the GoogleGenAI class
const { GoogleGenAI } = require('@google/genai');

// 3. The SDK client automatically looks for the GEMINI_API_KEY 
//    environment variable, which is loaded by dotenv.
const ai = new GoogleGenAI({});

async function run() {
  // 4. Call the API
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: 'Write a short, fun fact about the moon.'
  });

  console.log("Gemini's response:");
  console.log(response.text);
}

run();