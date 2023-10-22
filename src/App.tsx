import { createContext, useEffect, useState } from "react";
import Alert from "./components/Alert";
import Button from "./components/Button";
import ListGroup from "./components/ListGroup";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import NavBar from "./layout/NavBar";
import Intro from "./pages/Intro";
import Signup from "./pages/Signup";
import { AppNavbar } from "./layout/AppNavbar";
import axios from "axios";
import Word from "./pages/Word";
import Detail from "./pages/Detail";
import Det from "./pages/Det";
import { WordContext } from "./context/WordContext";
import { confirmAlert } from "react-confirm-alert";

function App() {
  const [alertVisible, setAlertVisibility] = useState(false);
  const [message, setMessage] = useState("");
  const [words, setWords] = useState([]);

  let navigate = useNavigate();

  //navigate(0);

  /*
   const words = [
    {id:1, word: "abandon", meaning1:"버리다"},
    {id:2, word: "ablility", meaning1:"능력"}
  ]
  */

  const loadWords = async () => {
    const result = await axios.get("/api/words");
    console.log(result);
    setWords(result.data);
  };

  useEffect(() => {
    /* ---
    fetch("/api/words")
      .then((response) => {
        if (!response.ok) {
          throw Error(`Error code:${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setWords(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    --- */
    loadWords();
  }, []);

  return (
    <>
      <WordContext.Provider value={{ words, loadWords }}>
        <AppNavbar />
        <Routes>
          <Route path="/" element={<Home words={words} />}></Route>

          <Route path="/intro" element={<Intro />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/det/:id" element={<Det />}></Route>
          <Route
            path="/detail/:id"
            element={<Detail loadWords={loadWords} />}
          ></Route>
          <Route path="/word" element={<Word loadWords={loadWords} />}></Route>
        </Routes>
      </WordContext.Provider>
    </>
    /* ---
    <div>
      {alertVisible && (
        <Alert
          onClose={function (): void {
            setAlertVisibility(false);
          }}
        >
          Error
        </Alert>
      )}
      <Button color="secondary" onClick={() => setAlertVisibility(true)}>
        My Button
      </Button>
      {message}
    </div>
    ---*/
  );
}

export default App;
