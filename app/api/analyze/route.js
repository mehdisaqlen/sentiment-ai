// File: app/api/analyze/route.js

import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "nodejs"; // Add this line to specify the runtime environment

export async function POST(request) {
  const { text } = await request.json();

  const functions = [
    {
      name: "analyze_text",
      description:
        "Analyze the given text for errors, sentiment, and other characteristics",
      parameters: {
        type: "object",
        properties: {
          errors: {
            type: "array",
            items: {
              type: "object",
              properties: {
                type: { type: "string" },
                message: { type: "string" },
              },
            },
            description: "List of grammatical or structural errors in the text",
          },
          sentiment_score: {
            type: "number",
            description:
              "Sentiment score from -1 (very negative) to 1 (very positive)",
          },
          sentiment: {
            type: "string",
            enum: ["positive", "neutral", "negative"],
            description: "Overall sentiment of the text",
          },
          spelling_errors: {
            type: "array",
            items: { type: "string" },
            description: "List of misspelled words in the text",
          },
          readability_score: {
            type: "number",
            description: "Flesch-Kincaid readability score",
          },
          word_count: {
            type: "number",
            description: "The total number of words in the text",
          },
        },
        required: [
          "errors",
          "sentiment_score",
          "sentiment",
          "spelling_errors",
          "readability_score",
          "word_count",
        ],
      },
    },
  ];

  try {
    // Create an assistant with the defined functions
    const assistant = await openai.beta.assistants.create({
      instructions: "You are a text analysis assistant.",
      name: "Text Analysis Assistant",
      model: "gpt-4o", // Use the model as in the provided example
      tools: [
        { type: "code_interpreter" },
        {
          type: "function",
          function: {
            name: "analyze_text",
            description:
              "Analyze the given text for errors, sentiment, and other characteristics",
            parameters: functions[0].parameters, // Use the same parameters as defined
          },
        },
      ],
    });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: "You are a text analysis assistant." },
        { role: "user", content: `Analyze the following text: ${text}` },
      ],
      functions: functions,
      function_call: { name: "analyze_text" },
    });

    const result = JSON.parse(response.choices[0].function_call.arguments);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "An error occurred during analysis" },
      { status: 500 }
    );
  }
}
