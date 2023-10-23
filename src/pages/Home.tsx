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
  message: string;
}

const Home = ({ words, message }: Props) => {
  return (
    <Container className="my-2">
      {message.length > 0 && (
        <div className="alert alert-danger">{message}</div>
      )}
      {message.length == 0 && (
        <Table>
          <Thead></Thead>
          <tbody>
            {words.map((word) => (
              <WordItem key={word.id} {...word}></WordItem>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Home;
