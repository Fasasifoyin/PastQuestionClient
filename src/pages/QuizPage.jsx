import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import Nav from "../components/Nav";
import Timer from "../components/Timer";
import Questions from "../components/Questions";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { TimeUp } from "../app/slice/frontend";
import { Question } from "../app/slice/Question";
import QuizLayout from "../components/QuizLayout";

const QuizPage = () => {
  const data = useSelector(Question);
  const timeUp = useSelector(TimeUp);
  const navigate = useNavigate();

  const [questionNumber, setQuestionNumber] = useState(0);

  useEffect(() => {
    if (timeUp) {
      navigate("/result");
    }
  }, [navigate, timeUp]);

  return (
    <Box position={"relative"}>
      <Nav>
        <Timer duration={1000 * 90} />
      </Nav>
      <QuizLayout
        length={data.length}
        currentQuestion={questionNumber}
        setCurrentQuestion={setQuestionNumber}
        array={[]}
        array2={[]}
      >
        <Questions
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          quizData={data}
        />
      </QuizLayout>
    </Box>
  );
};

export default QuizPage;
