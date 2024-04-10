import { useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/Nav";
import { Formik, Form, Field } from "formik";
import { level, semester } from "../utils/data";
import Selectt from "../components/Selectt";
import { Status } from "../app/slice/Question";

import { useDispatch, useSelector } from "react-redux";
import { getQuestions } from "../app/actions/Question";
import { homeSchema } from "../utils/YupSchema";

const Home = () => {
  const status = useSelector(Status);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);

  const initialValues = {
    fullName: "",
    level: "",
    semester: "",
    course: "",
    topic: "",
  };

  const onSubmit = (values) => {
    dispatch(getQuestions({ ...values, navigate, dispatch }));
  };

  return (
    <Box>
      <Nav />
      <Flex minH={"calc(100vh - 70px)"} mt={"70px"}>
        <Flex margin={"auto"} width={"100%"} justifyContent={"center"}>
          <Box w={"100%"} maxW={"400px"}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={homeSchema}
            >
              {() => (
                <Form>
                  <Flex direction={"column"} gap={"20px"}>
                    <Field name="fullName">
                      {({ meta, field }) => (
                        <FormControl
                          isInvalid={Boolean(meta.error && meta.touched)}
                        >
                          <Input
                            {...field}
                            placeholder="Enter Full Name"
                            height={{
                              base: "40px",
                              md: "50px",
                            }}
                            focusBorderColor="#ce151f"
                            borderRadius={"5px"}
                            border={"1px solid rgb(0,0,0,0.3)"}
                            _placeholder={{
                              color: "rgb(0, 0, 0, 0.7)",
                              fontSize: "14px",
                            }}
                            autoComplete="off"
                            fontSize={"14px"}
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
                    <Selectt name={"level"} initial={"Level"} data={level} />
                    <Selectt
                      name={"semester"}
                      initial={"Semester"}
                      data={semester}
                      setData={setCourses}
                    />
                    <Selectt
                      name={"course"}
                      initial={"Course"}
                      setData={setTopics}
                      data={courses}
                    />
                    <Selectt name={"topic"} initial={"Topic"} data={topics} />
                    <Button
                      type="submit"
                      bgColor={"#ce151f"}
                      color={"white"}
                      size={{ base: "sm", md: "md", lg: "lg" }}
                      _hover={{
                        bgColor: "rgb(206, 21, 31, 0.6)",
                      }}
                      className="active"
                      isLoading={status === "pending"}
                    >
                      Start Quiz
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
