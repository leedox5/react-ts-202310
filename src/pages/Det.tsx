import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Collapse,
  Container,
  Dropdown,
  Row,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteConfirmation from "../components/Confirm";

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

  const [isEditMemo, setIsEditMemo] = useState(false);

  const [wordForm, setWordForm] = useState<wordFormType>({
    word: "",
    meaning: "",
    memos: [],
  });

  const [memo, setMemo] = useState({
    meaning: "",
    upper: id,
  });

  const [colArr, setColArr] = useState<boolean[]>([]);

  const fetchWord = async () => {
    const result = await axios.get("/api/word/" + id);
    console.log(result.data);
    setWordForm(result.data);
    setArr(result.data.memos);
  };

  const setArr = (data: memoType[]) => {
    let arr: boolean[] = [];
    data.map((item) => {
      arr.push(true);
    });
    setColArr(arr);
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

  const handleClickUpdate = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    console.log(curMemo);
    await axios.put("/api/word/" + id, curMemo);
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

  const handleChangeMeaningUpdate = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCurMemo((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const [open, setOpen] = useState("");

  const toggleOpen = (idx: number, memo: memoType) => {
    let arr = [...colArr];
    arr[idx] = !arr[idx];
    setColArr(arr);
    setCurMemo(memo);
  };

  const [curMemo, setCurMemo] = useState({
    id: 0,
    meaning: "",
  });

  const [curMemoID, setCurMemoID] = useState(0);

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);

  const showDeleteModal = (id: React.SetStateAction<number>) => {
    setCurMemoID(id);
    setDisplayConfirmationModal(true);
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const submitDelete = async () => {
    await axios.delete("/api/word/" + curMemoID);
    setDisplayConfirmationModal(false);
    fetchWord();
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
        {wordForm.memos.map((memo, idx) => (
          <>
            <Collapse in={colArr[idx]} key={idx}>
              <div className="card mb-2">
                <div className="card-body" style={{ whiteSpace: "pre-line" }}>
                  {memo.meaning}
                </div>
                <div className="card-footer text-end">
                  <ButtonGroup size="sm">
                    <Button
                      variant="secondary"
                      onClick={() => toggleOpen(idx, memo)}
                    >
                      수정
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => showDeleteModal(memo.id)}
                    >
                      삭제
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </Collapse>
            <Collapse in={!colArr[idx]} key={(idx + 1) * 10}>
              <Card>
                <Card.Body className="mb-2">
                  <textarea
                    className="form-control"
                    name="meaning"
                    id="meaning"
                    rows={4}
                    value={curMemo.meaning}
                    onChange={handleChangeMeaningUpdate}
                  ></textarea>
                </Card.Body>
                <Card.Footer className="text-end">
                  <ButtonGroup size="sm">
                    <Button variant="secondary" onClick={handleClickUpdate}>
                      저장
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => toggleOpen(idx, memo)}
                    >
                      취소
                    </Button>
                  </ButtonGroup>
                </Card.Footer>
              </Card>
            </Collapse>
          </>
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
      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        id={curMemoID}
      />
    </>
  );
};

export default Det;
