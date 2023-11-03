import type { NextApiRequest, NextApiResponse } from 'next';
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanMessage } from "langchain/schema";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const chat = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.9,
      topP: 1,
    })

    const returnObj = await chat.call([
      new HumanMessage("Hello, how are you?")
    ])
    const translatedText = JSON.stringify(returnObj, null, 2)
    console.log(JSON.stringify(returnObj, null, 2))
    return res.json({ message: returnObj })
  } catch (error) {
    console.log('🚀 ~ file: langchain.ts:20 ~ error:', error);
    return res.json({ message: "エラー" })
  }
}