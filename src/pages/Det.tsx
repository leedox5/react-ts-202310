import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

const Det = () => {
  const { id } = useParams();
  let navigate = useNavigate();

  type memoType = {
    id: number;
    meaning: string;
  };

  type wordFormType = {
    word: string;
    meaning: string;
    memos: memoType[];
  };
  const [wordForm, setWordForm] = useState<wordFormType>({
    word: "",
    meaning: "",
    memos: [],
  });

  const [memo, setMemo] = useState({
    meaning: "",
    upper: id,
  });

  const fetchWord = async () => {
    const result = await axios.get("/api/word/" + id);
    console.log(result.data);
    setWordForm(result.data);
  };

  const { word, meaning } = wordForm;

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log("Add memo !!!");
    console.log(memo);
    await axios.post("/api/word/" + id, memo);
    fetchWord();
    setMemo({ meaning: "", upper: id });
    navigate("/det/" + id);
  };

  const handleChangeMeaning = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    fetchWord();
  }, []);

  return (
    <>
      <Container className="my-2">
        <div className="border-bottom">
          <h2>{word}</h2>
        </div>
        <h6 className="small text-muted text-end mt-1">조회수 : 1</h6>
        <div>
          <div className="card mb-2">
            <div className="card-body">
              <span style={{ whiteSpace: "pre-line" }}>{meaning}</span>
            </div>
            <div className="card-footer text-end comment">
              <Link to={"/detail/" + id}>수정</Link>
            </div>
          </div>
        </div>
        {wordForm.memos.map((memo) => (
          <div className="card mb-2" key={memo.id}>
            <div className="card-body">{memo.meaning}</div>
          </div>
        ))}
        <div className="mt-1 mb-2">
          <textarea
            name="meaning"
            id="meaning"
            className="form-control"
            rows={3}
            value={memo.meaning}
            onChange={handleChangeMeaning}
          ></textarea>
        </div>
        <div className="text-end">
          <button
            id="btn2"
            onClick={handleClick}
            className="btn btn-sm btn-outline-primary"
          >
            메모등록
          </button>
        </div>
      </Container>
    </>
  );
};

export default Det;
