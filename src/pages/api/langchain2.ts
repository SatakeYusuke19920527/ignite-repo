import type { NextApiRequest, NextApiResponse } from 'next';
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from 'langchain/prompts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const systemTemplate = 'You are a helpful chatbot that translates {input_language} to {output_language}.';
    const systemMessagePrompts = SystemMessagePromptTemplate.fromTemplate(systemTemplate);
    const humanTemplate = '{text}';
    const humanMessagePrompts = HumanMessagePromptTemplate.fromTemplate(humanTemplate);

    const prompt = ChatPromptTemplate.fromPromptMessages([
      systemMessagePrompts,
      humanMessagePrompts
    ]);

    console.log(JSON.stringify(prompt, null, 2));

    const formattedPrompt = await prompt.formatMessages({
      input_language: 'English',
      output_language: 'Japanese',
      text: 'Hello, how are you?'
    });

    console.log(JSON.stringify(formattedPrompt, null, 2));
    return res.json({ message: "returnObj" })
  } catch (error) {
    console.log('🚀 ~ file: langchain.ts:20 ~ error:', error);
    return res.json({ message: "エラー" })
  }
}