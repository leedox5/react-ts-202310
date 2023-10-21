import React from "react";
import { Link } from "react-router-dom";

const WORD = {
  word: "202310",
  meaning: `안녕하세요!
  나만의 단어를 저장하고 공부해 보세요
  `,
};

const Intro = () => {
  return (
    <>
      <div className="container my-3">
        <div className="row border-bottom">
          <div className="col-8">
            <h2>소개</h2>
          </div>
          <div className="col-4 text-end">
            <Link to="/" className="btn btn-sm btn-primary">
              시작하기
            </Link>
          </div>
        </div>
        <div>
          <div id="collap33" className="collapse show mulcol33">
            <div className="card mt-1">
              <div className="card-body">
                <span style={{ whiteSpace: "pre-line" }}>{WORD.meaning}</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div id="collap40" className="collapse show mulcol40">
            <div className="card mt-1">
              <div className="card-body">
                <span>
                  [2022.09.21] 단어장 오픈 [2023.08.21] 페이징 처리 [2023.09.13]
                  오픈단어장 추가 [2023.09.19] 단어장 생성 기능
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Intro;
