import type { NextApiRequest, NextApiResponse } from 'next';
import { SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate } from 'langchain/prompts';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { LLMChain, SequentialChain } from 'langchain/chains';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const llm = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.9,
      topP: 1,
    })

    const systemTemplate1 = 'You are a helpful chatbot that translates {input_language} to {output_language}.';
    const systemMessagePrompts = SystemMessagePromptTemplate.fromTemplate(systemTemplate1);
    const humanTemplate1 = '{text}';
    const humanMessagePrompts = HumanMessagePromptTemplate.fromTemplate(humanTemplate1);
    const prompt1 = ChatPromptTemplate.fromPromptMessages([
      systemMessagePrompts,
      humanMessagePrompts
    ]);

    const chain1 = new LLMChain({ llm, prompt: prompt1, outputKey: 'translated_text' });

    const humanTemplate2 = '以下の文章を大阪弁に翻訳してください。\n """{text}"""';
    const humanMessagePrompts2 = HumanMessagePromptTemplate.fromTemplate(humanTemplate2);
    const prompt2 = ChatPromptTemplate.fromPromptMessages([
      humanMessagePrompts2
    ]);

    const chain2 = new LLMChain({ llm, prompt: prompt2, outputKey: 'osaka_ben' });

    const chain = new SequentialChain({
      chains: [chain1, chain2],
      inputVariables: ['input_language', 'output_language', 'text'],
      outputVariables: ['translated_text', 'osaka_ben'],
      verbose: true
    });

    const result = await chain.call({
      input_language: 'English',
      output_language: 'Japanese',
      text: 'Hello, how are you?'
    });
    console.log(JSON.stringify(result, null, 2));
    return res.json({ message: result })
  } catch (error) {
    console.log('🚀 ~ file: langchain.ts:20 ~ error:', error);
    return res.json({ message: "エラー" })
  }
}