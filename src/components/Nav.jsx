/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { RiSearchLine } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { Authorized, changeAuthorize } from "../app/slice/frontend";

const Nav = ({ children, search, setSearch, showSearch, setShowSearch }) => {
  const authorized = useSelector(Authorized);
  const dispatch = useDispatch();
  const location = useLocation();
  const [scrollData, setScrollData] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollData(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Box
      pos={"fixed"}
      top={0}
      left={0}
      zIndex={100}
      width={"100%"}
      height={"70px"}
      backdropFilter={"blur(10px)"}
      boxShadow={Number(scrollData) > 0 ? "0 4px 0px rgba(0, 0, 0, 0.1)" : ""}
      transition={"all 0.3s ease"}
    >
      <Flex
        className="cc-container page-alignment"
        justifyContent={"space-between"}
        alignItems={"center"}
        height={"100%"}
      >
        <Text as={"h1"} onClick={() => dispatch(changeAuthorize())}>
          LOGO
        </Text>
        {location.pathname !== "/quiz" && authorized > 10 && (
          <Flex gap={"15px"} alignItems={"center"}>
            {location.pathname === "/allquestions" && (
              <>
                <Icon
                  as={RiSearchLine}
                  boxSize={"20px"}
                  display={{ base: showSearch ? "none" : "block", md: "none" }}
                  className="cursor"
                  onClick={() => setShowSearch(true)}
                />
                <Flex
                  display={{
                    base: showSearch ? "flex" : "none",
                    md: "block",
                  }}
                >
                  <Input
                    border={"1px solid black"}
                    focusBorderColor="#ce151f"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="search"
                    _focus={{
                      shadow: "none",
                    }}
                    width={{ base: "140px", md: "240px" }}
                    borderRadius={"0px"}
                    placeholder="Search questions"
                  />
                  <Box
                    display={{ base: "grid", md: "none" }}
                    placeItems={"center"}
                    width={"30px"}
                    bg={"#ce151f"}
                    border={"1px solid #ce151f"}
                    onClick={() => (setShowSearch(false), setSearch(""))}
                    className="cursor"
                  >
                    <Icon as={IoMdClose} color={"white"} boxSize={"20px"} />
                  </Box>
                </Flex>
              </>
            )}
            {location.pathname !== "/create" && (
              <Link to={"/create"}>
                <Button
                  bgColor={"#ce151f"}
                  color={"white"}
                  size={{ base: "sm", md: "md" }}
                  _hover={{
                    bgColor: "rgb(206, 21, 31, 0.6)",
                  }}
                  className="active"
                >
                  Create
                </Button>
              </Link>
            )}

            {location.pathname !== "/allquestions" && (
              <Link to={"/allquestions"}>
                <Button
                  bgColor={"transparent"}
                  color={"black"}
                  size={{ base: "sm", md: "md" }}
                  _hover={{
                    bgColor: "rgb(206, 21, 31, 0.6)",
                  }}
                  border={"2px solid #ce151f"}
                  className="active"
                >
                  Questions
                </Button>
              </Link>
            )}
          </Flex>
        )}
        {children}
      </Flex>
    </Box>
  );
};

export default Nav;
