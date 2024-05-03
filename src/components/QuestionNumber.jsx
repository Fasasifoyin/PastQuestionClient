/* eslint-disable react/prop-types */
import { Flex, SimpleGrid, Text, Icon } from "@chakra-ui/react";
import { TbLetterXSmall } from "react-icons/tb";
import { BsDashLg } from "react-icons/bs";

const QuestionNumber = ({
  totalQuestions,
  currentQuestion,
  setCurrentQuestion,
  array,
  array2,
}) => {
  const questions = [];
  for (let i = 1; i <= totalQuestions; i++) {
    questions.push(i);
  }

  return (
    <SimpleGrid columns={{ base: 6, md: 12, xl: 6 }} spacing={6}>
      {questions.map((each) => (
        <Flex
          border={{ base: "5px solid v", xl: "0px" }}
          bg={currentQuestion + 1 === each ? "#ce151f" : "#b8bcbd"}
          color={currentQuestion + 1 === each ? "white" : "black"}
          key={each}
          justifyContent={"center"}
          align={"center"}
          height={"30px"}
          onClick={() => setCurrentQuestion(each - 1)}
          className="cursor active"
          _hover={{
            bgColor: "rgb(206, 21, 31)",
            color: "white",
          }}
        >
          <Text as={"p"}>
            {array.includes(each) ? (
              <Icon as={TbLetterXSmall} boxSize={"30px"} color={"red"} />
            ) : array2.includes(each) ? (
              <Icon as={BsDashLg} boxSize={"25px"} color={"red"} />
            ) : (
              each
            )}
          </Text>
        </Flex>
      ))}
    </SimpleGrid>
  );
};

export default QuestionNumber;
