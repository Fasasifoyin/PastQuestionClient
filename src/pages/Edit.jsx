import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Text } from "@chakra-ui/react";
import Nav from "../components/Nav";
import { getCourses, getTopics } from "../utils/data";
import CreateEditForm from "../components/CreateEditForm";

import { useSelector } from "react-redux";
import { searchId } from "../app/slice/Search";

const Edit = () => {
  const { id } = useParams();
  const question = useSelector((state) => searchId(state, id));
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectImage, setSelectImage] = useState(false);
  const [file, setFile] = useState("");

  const initialValues = {
    question: {
      question: question?.question?.question || "",
      image: question?.question?.image || "",
    },
    options: question?.options
      .slice() // Create a shallow copy of the options array
      .sort((a, b) => (a.isCorrect === b.isCorrect ? 0 : a.isCorrect ? -1 : 1))
      .map((opt, index) => ({
        option: String.fromCharCode(65 + index), // Converts index to A, B, C, D
        answerText: opt.answerText || "",
      })),
    level: String(question?.level) || "",
    semester: question?.semester || "",
    course: question?.course || "",
    topic: question?.topic || "",
    code: "",
  };

  useEffect(() => {
    if (question?.semester && question?.level) {
      const result = getCourses(Number(question?.level), question?.semester);
      setCourses(result);
    }
    if (question?.course) {
      const result = getTopics(question?.course);
      setTopics(result);
    }
    if (question?.question?.image) {
      setFile(question?.question?.image);
      setSelectImage(true);
    }
  }, [question]);

  return (
    <Box>
      <Nav />
      {!question && (
        <Box mt={"80px"}>
          <Text as={"p"}>This question is not available</Text>
        </Box>
      )}
      {question && (
        <CreateEditForm
          initialValues={initialValues}
          courses={courses}
          setCourses={setCourses}
          topics={topics}
          setTopics={setTopics}
          action={"Edit"}
          selectImage={selectImage}
          setSelectImage={setSelectImage}
          file={file}
          setFile={setFile}
          id={id}
        />
      )}
    </Box>
  );
};

export default Edit;
