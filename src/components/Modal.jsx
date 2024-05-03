/* eslint-disable react/prop-types */
import { useState } from "react";
import { Box, Flex, Button, Text, Input, Spacer } from "@chakra-ui/react";

const Modal = ({ setFunction, status, Delete, id }) => {
  const [code, setCode] = useState("");

  return (
    <Box>
      <Box
        pos={"fixed"}
        top={0}
        left={0}
        w={"100%"}
        h={"100vh"}
        className="cursor"
        zIndex={120}
        onClick={() => setFunction("")}
      >
        <Box
          pos={"fixed"}
          top={0}
          left={0}
          width={"100%"}
          h={"100%"}
          bg={"black"}
          opacity={0.5}
        />
      </Box>
      <Box
        pos={"fixed"}
        top={"10px"}
        left={"50%"}
        transform={"translateX(-50%)"}
        width={"100%"}
        maxWidth={"550px"}
        zIndex={150}
        bg={"white"}
        p={{ base: "15px 20px", md: "20px 25px" }}
        borderRadius={"5px"}
      >
        <Text mb={"25px"} as={"p"}>
          Are you sure you want to delete this question ?
        </Text>
        <Flex>
          <Input
            size={"sm"}
            placeholder="Enter code to delete question"
            width={"250px"}
            focusBorderColor="#ce151f"
            borderRadius={"5px"}
            border={"1px solid rgb(0,0,0,0.3)"}
            _placeholder={{
              color: "rgb(0, 0, 0, 0.7)",
              fontSize: "14px",
            }}
            autoComplete="off"
            fontSize={"14px"}
            type="number"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            autoFocus={true}
          />
          <Spacer />
          <Flex gap={"10px"}>
            <Button
              size={"sm"}
              onClick={() => setFunction("")}
              bgColor={"green"}
              color={"white"}
              borderRadius={"5px"}
              width={{ base: "70px" }}
              className="active"
              _hover={{
                bgColor: "green.400",
              }}
            >
              Cancel
            </Button>
            <Button
              size={"sm"}
              bgColor={"red"}
              color={"White"}
              borderRadius={"5px"}
              width={{ base: "70px" }}
              className="active"
              _hover={{
                bgColor: "red.400",
              }}
              isLoading={status === "pending"}
              onClick={() => Delete({ code, id })}
            >
              Delete
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Modal;
