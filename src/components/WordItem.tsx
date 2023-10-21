import React from "react";

interface Props {
  id: number;
  word: string;
  meaning: string;
}

const WordItem = ({ id, word, meaning }: Props) => {
  return (
    <tr>
      <td>{word}</td>
      <td>{meaning}</td>
    </tr>
  );
};

export default WordItem;
