import { ReactElement, createContext, useEffect, useState } from "react";

export type WordType = {
  id: number;
  word: string;
  meaning: string;
};

const initState: WordType[] = [];

export type UseWordsContextType = { words: WordType[] };
const initContextState: UseWordsContextType = { words: [] };
const WordsContext = createContext<UseWordsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement };

export const WordsProvider = ({ children }: ChildrenType): ReactElement => {
  const [words, setWords] = useState<WordType[]>(initState);

  useEffect(() => {
    const fetchWords = async () => {
      const data = await fetch("/api/words")
        .then((res) => {
          return res.json();
        })
        .catch((err) => {
          if (err instanceof Error) console.log(err.message);
        });
      return data;
    };
    fetchWords().then((words) => setWords(words));
  }, []);

  return (
    <WordsContext.Provider value={{ words }}>{children}</WordsContext.Provider>
  );
};
