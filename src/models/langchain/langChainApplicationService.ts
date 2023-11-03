import { LangChainRepository } from './langChainRepository';

export const getLangChain = async (context: string) => {
  try {
    const repo = new LangChainRepository();
    return await repo.getLangChain(context);
  } catch (err) {
    return err;
  }
};