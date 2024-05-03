import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  Icon,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import Nav from "../components/Nav";
import QuizLayout from "../components/QuizLayout";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import { useSelector } from "react-redux";
import { Question } from "../app/slice/Question";
import { AnsweredQuestions } from "../app/slice/frontend";
import { getIndexesOfDifference } from "../utils/Functions";

const CorrectionPage = () => {
  const data = useSelector(Question);
  const answeredQuestions = useSelector(AnsweredQuestions);
  const [questionNumber, setQuestionNumber] = useState(0);

  const currentQuestionViewed = answeredQuestions.find(
    (each) => each.id === data[questionNumber]._id
  );

  const nextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
  };

  const prevQuestion = () => {
    setQuestionNumber((prev) => prev - 1);
  };

  const findWrongs = answeredQuestions
    .map((each) => (!each.option.isCorrect ? each.index + 1 : -1))
    .filter((index) => index !== -1);

  const unanswered = getIndexesOfDifference(data, answeredQuestions);

  return (
    <Box position={"relative"}>
      <Nav />
      <QuizLayout
        length={data.length}
        currentQuestion={questionNumber}
        setCurrentQuestion={setQuestionNumber}
        array={findWrongs}
        array2={unanswered}
      >
        <Box>
          <Box mb={"25px"}>
            {data[questionNumber].question.image && (
              <Flex justifyContent={"center"} mb={"10px"}>
                <Box
                  width={"100%"}
                  height={{
                    base: "200px",
                    md: "220px",
                    lg: "300px",
                  }}
                >
                  <Image
                    w={"100%"}
                    h={"100%"}
                    objectFit={"fit"}
                    alt="Question Image"
                    src={data[questionNumber].question.image}
                  />
                </Box>
              </Flex>
            )}
            <Text as={"h1"} textAlign={"center"}>
              {data[questionNumber].question.question}
            </Text>
          </Box>
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={7} mb={"40px"}>
            {data[questionNumber].options.map((each) => (
              <Flex
                justifyContent={"space-between"}
                key={each._id}
                border={
                  each.option === currentQuestionViewed?.option?.option
                    ? "2px solid red"
                    : "1px solid black"
                }
                p={"10px"}
                h={"100%"}
              >
                <Text>
                  {each.option}. {each.answerText}
                </Text>
                {each.option === currentQuestionViewed?.option?.option &&
                  (currentQuestionViewed.option.isCorrect ? (
                    <Icon as={FaCircleCheck} color={"green"} boxSize={"20px"} />
                  ) : (
                    <Icon
                      as={IoIosCloseCircle}
                      color={"red"}
                      boxSize={"20px"}
                    />
                  ))}
                {(!currentQuestionViewed ||
                  !currentQuestionViewed?.option?.isCorrect) &&
                  each.isCorrect && (
                    <Icon as={FaCircleCheck} color={"green"} boxSize={"20px"} />
                  )}
              </Flex>
            ))}
          </SimpleGrid>
          <Flex
            justifyContent={questionNumber === 0 ? "flex-end" : "space-between"}
          >
            {questionNumber !== 0 && (
              <Button
                type="button"
                bgColor={"#b8bcbd"}
                color={"black"}
                width={"45%"}
                size={{ base: "sm", md: "md", lg: "lg" }}
                leftIcon={<GoArrowLeft />}
                onClick={prevQuestion}
                _hover={{
                  bgColor: "rgb(184, 188, 189, 0.6)",
                }}
                className="active"
              >
                Previous
              </Button>
            )}
            {questionNumber !== data.length - 1 && (
              <Button
                type="button"
                bgColor={"#ce151f"}
                color={"white"}
                width={"45%"}
                size={{ base: "sm", md: "md", lg: "lg" }}
                rightIcon={<GoArrowRight />}
                onClick={nextQuestion}
                _hover={{
                  bgColor: "rgb(206, 21, 31, 0.6)",
                }}
                className="active"
              >
                Next
              </Button>
            )}
          </Flex>
          {!currentQuestionViewed && (
            <Flex mt={"20px"} justifyContent={"flex-end"}>
              <Text color={"red"}>Question not answered</Text>
            </Flex>
          )}
        </Box>
      </QuizLayout>
    </Box>
  );
};

export default CorrectionPage;
