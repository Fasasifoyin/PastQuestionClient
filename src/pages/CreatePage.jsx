import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import Nav from "../components/Nav";
import { Field, Form, Formik } from "formik";
import Selectt from "../components/Selectt";
import { level, semester } from "../utils/data";
import { useState } from "react";
import Options from "../components/Options";
import { shuffle } from "../utils/Shuffle";
import { toast } from "react-hot-toast";
import { ConvertImageToBase64 } from "../utils/ConvertToBase64";
import { createPageSchema } from "../utils/YupSchema";
import { createQuestion } from "../app/actions/Question";

import { useDispatch, useSelector } from "react-redux";
import { Status } from "../app/slice/Question";

const CreatePage = () => {
  const status = useSelector(Status);
  const dispatch = useDispatch();
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectImage, setSelectImage] = useState(false);
  const [file, setFile] = useState("");

  const initialValues = {
    question: {
      question: "",
      image: "",
    },
    options: [
      {
        option: "A",
        answerText: "",
      },
      {
        option: "B",
        answerText: "",
      },
      {
        option: "C",
        answerText: "",
      },
      {
        option: "D",
        answerText: "",
      },
    ],
    level: "",
    semester: "",
    course: "",
    code: "",
    topic: "",
  };

  const onUpload = async (e, form) => {
    const { setFieldValue } = form;

    if (!e.target.files) {
      return;
    }
    if (e.target.files[0].size > 1000000) {
      e.target.value = "";
      return toast.error("Image cannot be larger than 1MB");
    }

    const base64 = await ConvertImageToBase64(e.target.files[0]);
    setFieldValue("question.image", e.target.value);
    setFile(base64);
  };

  const removeImage = (form) => {
    const { setFieldValue } = form;
    setFieldValue("question.image", "");
    setFile("");
    setSelectImage(false);
  };

  const onSubmit = (values) => {
    const { options, level, question } = values;

    const shuffledOptions = shuffle(
      options.map((each) => ({
        ...each,
        isCorrect: each.option === "A",
      }))
    );

    const newOptions = shuffledOptions.map((each, index) => ({
      ...each,
      option: String.fromCharCode(65 + index),
    }));

    const numberedLevel = Number(level);

    const newQuestion = {
      question: question.question,
    };

    if (file) {
      newQuestion.image = file;
    }

    const data = {
      ...values,
      options: newOptions,
      level: numberedLevel,
      question: newQuestion,
    };
    dispatch(createQuestion(data));
  };

  return (
    <Box>
      <Nav />
      <Flex minH={"calc(100vh - 70px)"} mt={"70px"}>
        <Flex
          margin={"auto"}
          width={"100%"}
          justifyContent={"center"}
          py={"20px"}
        >
          <Box w={"100%"} maxW={"400px"}>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={createPageSchema}
            >
              {() => (
                <Form>
                  <Flex direction={"column"} gap={"20px"}>
                    <Flex direction={"column"} gap={"10px"}>
                      <Box>
                        <Field name={"question.question"}>
                          {({ meta, field }) => (
                            <FormControl
                              isInvalid={Boolean(meta.error && meta.touched)}
                            >
                              <Input
                                {...field}
                                placeholder="Write Question"
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
                        {!selectImage && (
                          <Text fontSize={"10px"}>
                            Does this question contain an Image?{" "}
                            <Text
                              as={"span"}
                              color={"green"}
                              fontWeight={"bold"}
                              _hover={{
                                color: "green.400",
                              }}
                              className="cursor"
                              onClick={() => setSelectImage(true)}
                            >
                              Click here
                            </Text>{" "}
                            to add image
                          </Text>
                        )}
                      </Box>
                      {selectImage && (
                        <Field name={"question.image"}>
                          {({ field, form }) => (
                            <FormControl>
                              <FormLabel htmlFor={field.name}>
                                <Flex justifyContent={"center"}>
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
                                      alt="image"
                                      src={
                                        file ||
                                        "https://cdn.pixabay.com/photo/2017/11/10/05/24/select-2935439_1280.png"
                                      }
                                    />
                                  </Box>
                                </Flex>
                              </FormLabel>
                              <Input
                                type="file"
                                accept="image/png, image/jpeg"
                                display={"none"}
                                name={field.name}
                                id={field.name}
                                onChange={(e) => onUpload(e, form)}
                              />
                              <Flex justifyContent={"center"}>
                                <Button
                                  type="button"
                                  bgColor={"#ce151f"}
                                  color={"white"}
                                  size={{ base: "sm", md: "md", lg: "lg" }}
                                  _hover={{
                                    bgColor: "rgb(206, 21, 31, 0.6)",
                                  }}
                                  className="active"
                                  onClick={() => removeImage(form)}
                                >
                                  Remove Image
                                </Button>
                              </Flex>
                            </FormControl>
                          )}
                        </Field>
                      )}
                    </Flex>
                    <Options name={"options"} />
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
                    <Field name="code">
                      {({ meta, field }) => (
                        <FormControl
                          isInvalid={Boolean(meta.error && meta.touched)}
                        >
                          <Input
                            {...field}
                            placeholder="Enter Code"
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
                            type="number"
                          />
                          <FormErrorMessage>{meta.error}</FormErrorMessage>
                        </FormControl>
                      )}
                    </Field>
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
                      Create Question
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

export default CreatePage;
