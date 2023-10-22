import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { WordContext } from "../context/WordContext";
import { confirmAlert } from "react-confirm-alert";
import DeleteConfirmation from "./Confirm";

interface Props {
  id: number;
  word: string;
  meaning: string;
}

const WordItem = ({ id, word, meaning }: Props) => {
  const { words, loadWords } = useContext(WordContext);

  const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
  };

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

  const showDeleteModal = () => {
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = async () => {
    await axios.delete("/api/word/" + id);
    setDisplayConfirmationModal(false);
    loadWords();
  };

  return (
    <>
      <tr>
        <td>
          <Link to={"/det/" + id}>{word}</Link>
        </td>
        <td>{meaning}</td>
        <td>
          <div className="container">
            <button className="small" onClick={showDeleteModal}>
              삭제
            </button>
          </div>
        </td>
      </tr>
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
      />
    </>
  );
};

export default WordItem;
