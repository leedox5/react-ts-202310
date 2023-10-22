import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

interface Props {
  loadWords: () => void;
}

const Detail = ({ loadWords }: Props) => {
  const [wordForm, setWordForm] = useState({
    word: "",
    meaning: "",
  });

  const { id } = useParams();

  const { word, meaning } = wordForm;

  let navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWordForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleChangeMeaning = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWordForm((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(wordForm);
    await axios.put("/api/word/" + id, wordForm);
    loadWords();
    navigate("/");
  };

  const fetchWord = async () => {
    const result = await axios.get("/api/word/" + id);
    setWordForm(result.data);
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <div className="container my-3">
      <h5 className="my-3 border-bottom pb-2">단어 수정</h5>
      <form className="post-form my-3">
        <div className="mb-2">
          <label htmlFor="word">단어</label>
          <input
            type="text"
            className="form-control"
            name="word"
            id="word"
            value={word}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="meaning">의미</label>
          <textarea
            className="form-control"
            name="meaning"
            id="meaning"
            rows={5}
            value={meaning}
            onChange={handleChangeMeaning}
          ></textarea>
        </div>
        <div className="mb-2 text-end">
          <button
            type="submit"
            onClick={(e) => handleClick(e)}
            className="btn btn-sm btn-primary mx-2"
          >
            저장
          </button>
          <Link to="/" className="btn btn-sm btn-primary mx-2">
            취소
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Detail;
