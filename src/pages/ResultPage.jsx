import { Box, Button, Flex, Text } from "@chakra-ui/react";
import Nav from "../components/Nav";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";
import { AnsweredQuestions, Score } from "../app/slice/frontend";
import { Info, NumberOfQuestions } from "../app/slice/Question";

const ResultPage = () => {
  const score = useSelector(Score);
  const numberOfQuestions = useSelector(NumberOfQuestions);
  const answeredQuestions = useSelector(AnsweredQuestions);
  const info = useSelector(Info)

  return (
    <Box>
      <Nav/>
      <Flex
        minH={"calc(100vh - 70px)"}
        mt={"70px"}
        pb={{ base: "20px", xl: 0 }}
      >
        <Flex margin={"auto"} w={"100%"} justifyContent={"center"}>
          <Box
            width={"100%"}
            maxW={"550px"}
            border={"5px solid #ce151f"}
            borderRadius={"20px"}
            py={"25px"}
          >
            <Box width={"95%"} margin={"auto"}>
              <Flex direction={"column"} gap={"15px"} mb={"30px"}>
                <Flex justifyContent={"space-between"} gap={"5px"}>
                  <Text as={"p"}>Full Name:</Text>
                  <Text as={"p"} fontWeight={"bold"}>
                    {info.fullName}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text as={"p"}>Attempted Question(s):</Text>
                  <Text as={"p"} fontWeight={"bold"}>
                    {answeredQuestions.length}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text as={"p"}>Unattempted Question(s):</Text>
                  <Text as={"p"} fontWeight={"bold"}>
                    {numberOfQuestions - answeredQuestions.length}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text as={"p"}>Total Questions:</Text>
                  <Text as={"p"} fontWeight={"bold"}>
                    {numberOfQuestions}
                  </Text>
                </Flex>
                <Flex justifyContent={"space-between"}>
                  <Text as={"p"}>Your Score:</Text>
                  <Text as={"p"} fontWeight={"bold"}>
                    {score}/{numberOfQuestions}
                  </Text>
                </Flex>
                <Flex justifyContent={"center"}>
                  <Text>
                    Percentage:{" "}
                    <Text as={"span"} fontWeight={"bold"}>
                      {Math.round((score / numberOfQuestions) * 100)}%
                    </Text>
                  </Text>
                </Flex>
              </Flex>
              <Flex className="resultPage-button-container">
                <Button
                  size={{ base: "sm", md: "md", lg: "lg" }}
                  bgColor={"#b8bcbd"}
                  color={"black"}
                  _hover={{
                    bgColor: "rgb(184, 188, 189, 0.6)",
                  }}
                  className="active resultPage-button"
                >
                  Re-take
                </Button>
                <Link to={"/correction"} className="resultPage-button">
                  <Button
                    bgColor={"green"}
                    color={"white"}
                    size={{ base: "sm", md: "md", lg: "lg" }}
                    _hover={{
                      bgColor: "green",
                      opacity: 0.6,
                    }}
                    className="active"
                    w={"100%"}
                  >
                    View Correction
                  </Button>
                </Link>

                <Link to="/" className="resultPage-button">
                  <Button
                    size={{ base: "sm", md: "md", lg: "lg" }}
                    bgColor={"#ce151f"}
                    color={"white"}
                    _hover={{
                      bgColor: "rgb(206, 21, 31, 0.6)",
                    }}
                    className="active"
                    width={"100%"}
                  >
                    Go Home
                  </Button>
                </Link>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default ResultPage;
