import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Intro = () => {
  type memoType = {
    id: number;
    meaning: string;
  };

  type wordFormType = {
    word: string;
    meaning: string;
    memos: memoType[];
  };

  const [isLoading, setIsLoading] = useState(true);

  const [wordForm, setWordForm] = useState<wordFormType>({
    word: "",
    meaning: "",
    memos: [],
  });

  const fetchWord = async () => {
    const result = await axios.get("/api/word/1");
    setWordForm(result.data);
    setIsLoading(false);
  };

  const { word, meaning, memos } = wordForm;

  useEffect(() => {
    fetchWord();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container my-3">
        <div className="row border-bottom">
          <div className="col-8">
            <h2>{meaning}</h2>
          </div>
          <div className="col-4 text-end">
            <Link to="/" className="btn btn-sm btn-primary">
              시작하기
            </Link>
          </div>
        </div>
        <div>
          {memos.map((memo) => (
            <div key={memo.id} className="collapse show mulcol33">
              <div className="card mt-1">
                <div className="card-body">
                  <span key={memo.id} style={{ whiteSpace: "pre-line" }}>
                    {memo.meaning}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Intro;
