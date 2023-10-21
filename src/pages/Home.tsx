import React from "react";
import { Container, Table } from "react-bootstrap";
import Thead from "../components/Thead";
import WordItem from "../components/WordItem";

interface Props {
  words: {
    id: number;
    word: string;
    meaning: string;
  }[];
}

const Home = ({ words }: Props) => {
  return (
    <Container className="my-2">
      <Table>
        <Thead></Thead>
        <tbody>
          {words.map((word) => (
            <WordItem key={word.id} {...word}></WordItem>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Home;
