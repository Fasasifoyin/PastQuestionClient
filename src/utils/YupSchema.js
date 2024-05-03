import * as yup from "yup";

export const homeSchema = yup.object().shape({
  fullName: yup
    .string()
    .min(5, "Name must be at least 5 characters")
    .max(30, "Name cannot exceed 30 characters")
    .required("Enter Full Name"),
  level: yup.string().required("Select level"),
  semester: yup.string().required("Select semester"),
  course: yup.string().required("Select course"),
  topic: yup.string().required("Select topic"),
});

export const createEditSchema = yup.object().shape({
  question: yup.object().shape({
    question: yup.string().required("Enter question"),
  }),
  options: yup.array().of(
    yup.object().shape({
      answerText: yup.string().required("Option cannot be empty"),
    })
  ),
  level: yup.string().required("Select level"),
  semester: yup.string().required("Select semester"),
  course: yup.string().required("Select course"),
  topic: yup.string().required("Select topic"),
  code: yup.number().required("Enter code"),
});
