import { useState } from "react";
import { Box } from "@chakra-ui/react";
import Nav from "../components/Nav";
import CreateEditForm from "../components/CreateEditForm";

const CreatePage = () => {
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
    topic: "",
    code: "",
  };

  return (
    <Box>
      <Nav />
      <CreateEditForm
        initialValues={initialValues}
        courses={courses}
        setCourses={setCourses}
        topics={topics}
        setTopics={setTopics}
        action={"Create"}
        selectImage={selectImage}
        setSelectImage={setSelectImage}
        file={file}
        setFile={setFile}
      />
    </Box>
  );
};

export default CreatePage;
