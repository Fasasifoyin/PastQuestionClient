/* eslint-disable react/prop-types */
import { Box, Flex } from "@chakra-ui/react";
import QuestionNumber from "./QuestionNumber";

const QuizLayout = ({
  children,
  length,
  currentQuestion,
  setCurrentQuestion,
}) => {
  return (
    <Flex minH={"calc(100vh - 70px)"} mt={"70px"} pb={{ base: "20px", xl: 0 }}>
      <Box margin={"auto"} w={"100%"}>
        <Flex
          gap={{ base: "40px", xl: 0 }}
          flexDir={{ base: "column", xl: "row" }}
          justifyContent={{ xl: "space-between" }}
        >
          <Box
            minH={{ xl: "calc(100vh - 70px)" }}
            width={{ base: "100%", xl: "65%" }}
            display={{ xl: "flex" }}
            border={{ base: "5px solid #ce151f", xl: "0px" }}
            borderRadius={{ base: "20px", xl: 0 }}
            pt={{ base: "25px", xl: 0 }}
            pb={{ base: "25px", xl: "20px" }}
          >
            <Box
              margin={{ xl: "auto" }}
              w={"100%"}
              border={{ xl: "5px solid #ce151f" }}
              borderRadius={{ xl: "20px" }}
              py={{ xl: "25px" }}
            >
              <Box width={"90%"} margin={"0 auto"}>
                {children}
              </Box>
            </Box>
          </Box>
          <Box
            h={{ xl: "calc(100vh - 70px)" }}
            width={{ base: "100%", xl: "28%" }}
            position={{ xl: "sticky" }}
            top={"70px"}
            // overflowY={"scroll"}
          >
            <Box
              width={"100%"}
              maxW={{ base: "820px", xl: "100%" }}
              pt={{ xl: "30px" }}
            >
              <QuestionNumber
                totalQuestions={length}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
              />
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
};

export default QuizLayout;
