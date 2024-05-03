/* eslint-disable react/prop-types */
import {
  Flex,
  Box,
  FormControl,
  Input,
  FormErrorMessage,
  Button,
  Text,
  FormLabel,
  Image,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import Options from "./Options";
import { level, semester } from "../utils/data";
import Selectt from "./Selectt";
import { createEditSchema } from "../utils/YupSchema";
import { ConvertImageToBase64 } from "../utils/ConvertToBase64";
import { toast } from "react-hot-toast";
import { shuffle } from "../utils/Functions";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createQuestion, editQuestion } from "../app/actions/Question";
import { Status } from "../app/slice/Question";

const CreateEditForm = ({
  initialValues,
  courses,
  setCourses,
  topics,
  setTopics,
  action,
  selectImage,
  setSelectImage,
  file,
  setFile,
  id,
}) => {
  const dispatch = useDispatch();
  const status = useSelector(Status);
  const editedTopics = topics.slice().filter((each) => each !== "ALL");
  const navigate = useNavigate();

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

  const onSubmit = (values, { resetForm }) => {
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

    if (action === "Create") {
      dispatch(createQuestion({ ...data, resetForm }));
    } else {
      dispatch(editQuestion({ ...data, id, navigate }));
    }
  };

  return (
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
            validationSchema={createEditSchema}
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
                  <Selectt
                    name={"topic"}
                    initial={"Topic"}
                    data={editedTopics}
                  />
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
                    {action} Question
                  </Button>
                </Flex>
              </Form>
            )}
          </Formik>
        </Box>
      </Flex>
    </Flex>
  );
};

export default CreateEditForm;
