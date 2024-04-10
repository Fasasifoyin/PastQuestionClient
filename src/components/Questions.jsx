/* eslint-disable react/prop-types */
import { Formik, Form, Field } from "formik";
import {
  Box,
  Button,
  Flex,
  FormLabel,
  Image,
  Radio,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
// import { quizData } from "../database/data";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";

import { useDispatch } from "react-redux";
import { addOrUpdateAnsweredObject, changeTimeUp } from "../app/slice/frontend";

const Questions = ({ questionNumber, setQuestionNumber, quizData }) => {
  const dispatch = useDispatch();

  const initialValues = quizData.reduce((acc, question) => {
    return { ...acc, [`Question ${question._id}`]: "" };
  }, {});

  const onChange = (e) => {
    const { value } = e.target;

    const id = quizData[questionNumber]._id;
    const option = quizData[questionNumber].options.find(
      (each) => each.option === value
    );

    const newObject = { id, option };
    dispatch(addOrUpdateAnsweredObject(newObject));
  };

  const onSubmit = () => {
    dispatch(changeTimeUp(true));
  };

  const nextQuestion = () => {
    setQuestionNumber((prev) => prev + 1);
  };

  const prevQuestion = () => {
    setQuestionNumber((prev) => prev - 1);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {() => (
        <Form>
          <Box mb={"25px"}>
            {quizData[questionNumber].question.image && (
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
                    src={quizData[questionNumber].question.image}
                  />
                </Box>
              </Flex>
            )}
            <Text as={"h1"} textAlign={"center"}>
              {quizData[questionNumber].question.question}
            </Text>
          </Box>
          <Box mb={"40px"}>
            <Field name={`Question ${quizData[questionNumber]._id}`}>
              {({ field, form }) => {
                // console.log(field);
                return (
                  <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={7}>
                    {quizData[questionNumber].options.map((each) => (
                      <Box key={each._id}>
                        <Radio
                          {...field}
                          id={each.option}
                          type="radio"
                          value={each.option}
                          isChecked={field.value === each.option}
                          display={"none"}
                          onChange={(e) => {
                            onChange(e);
                            form.setFieldValue(
                              `Question ${quizData[questionNumber]._id}`,
                              e.target.value
                            );
                          }}
                        />
                        <FormLabel
                          htmlFor={each.option}
                          style={{ width: "100%" }}
                        >
                          <Box
                            border={
                              field.value === each.option
                                ? "2px solid #ce151f"
                                : "1px solid black"
                            }
                            p={"10px"}
                            className="cursor active"
                            h={"100%"}
                          >
                            <Text>
                              {each.option}. {each.answerText}
                            </Text>
                          </Box>
                        </FormLabel>
                      </Box>
                    ))}
                  </SimpleGrid>
                );
              }}
            </Field>
          </Box>
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
            {questionNumber !== quizData.length - 1 && (
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
            {questionNumber === quizData.length - 1 && (
              <Button
                type="submit"
                bgColor={"#ce151f"}
                color={"white"}
                width={"45%"}
                size={{ base: "sm", md: "md", lg: "lg" }}
                _hover={{
                  bgColor: "rgb(206, 21, 31, 0.6)",
                }}
                className="active"
              >
                Submit
              </Button>
            )}
          </Flex>
        </Form>
      )}
    </Formik>
  );
};

export default Questions;
