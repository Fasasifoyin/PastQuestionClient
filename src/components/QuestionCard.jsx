/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Text, Flex, Button } from "@chakra-ui/react";
import { toast } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { Status, searchId } from "../app/slice/Search";
import { deleteQuestion } from "../app/actions/Question";
import Modal from "./Modal";
import { Link } from "react-router-dom";

const QuestionCard = ({ id }) => {
  const search = useSelector((state) => searchId(state, id));
  const status = useSelector(Status);
  const dispatch = useDispatch();
  const [showDelete, setShowDelete] = useState("");

  const Delete = (query) => {
    if (!query.code) {
      return toast.error("Enter code to delete question");
    }
    dispatch(deleteQuestion(query));
  };

  return (
    <>
      <Box
        p={"15px"}
        _hover={{
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.4)",
        }}
        transition={"all 0.3s ease"}
        className="glass"
      >
        <Text as={"h3"}>{search.question.question}</Text>
        {search.options.map((each) => (
          <Text as={"h6"} key={each.option}>
            {each.option}. {each.answerText}
          </Text>
        ))}
        <Flex mt={"10px"} gap={"15px"} justifyContent={"flex-end"}>
          <Link to={`/edit/${search._id}`}>
            <Button
              bgColor={"green"}
              color={"white"}
              borderRadius={"5px"}
              width={{ base: "100px" }}
              className="active"
              _hover={{
                bgColor: "green.400",
              }}
              size={{ base: "sm", md: "md" }}
            >
              Edit
            </Button>
          </Link>
          <Button
            bgColor={"red"}
            color={"White"}
            borderRadius={"5px"}
            width={{ base: "100px" }}
            className="active"
            _hover={{
              bgColor: "red.400",
            }}
            size={{ base: "sm", md: "md" }}
            onClick={() => setShowDelete(id)}
          >
            Delete
          </Button>
        </Flex>
      </Box>
      {showDelete === id && (
        <Modal
          setFunction={setShowDelete}
          status={status}
          Delete={Delete}
          id={search._id}
        />
      )}
    </>
  );
};

export default QuestionCard;
