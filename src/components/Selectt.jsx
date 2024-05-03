/* eslint-disable react/prop-types */
import { Field } from "formik";
import { FormControl, FormErrorMessage, Select } from "@chakra-ui/react";
import { getCourses, getTopics } from "../utils/data";

const Selectt = ({ name, initial, data, setData }) => {
  const onChange = (e, form) => {
    const { value } = e.target;
    const { setFieldValue, values } = form;

    if (name === "level") {
      setFieldValue("level", value);
      setFieldValue("semester", "");
      setFieldValue("course", "");
      setFieldValue("topic", "");
    } else if (name === "semester") {
      const result = getCourses(Number(values.level), value);
      setFieldValue("semester", value);
      setFieldValue("course", "");
      setFieldValue("topic", "");
      setData(result);
    } else if (name === "course") {
      const result = getTopics(value);
      setFieldValue("course", value);
      setFieldValue("topic", "");
      setData(result);
    } else {
      setFieldValue("topic", value);
    }
  };

  return (
    <Field name={name}>
      {({ meta, field, form }) => {
        return (
          <FormControl isInvalid={Boolean(meta.error && meta.touched)}>
            <Select
              {...field}
              height={{
                base: "40px",
                md: "50px",
              }}
              focusBorderColor="#ce151f"
              borderRadius={"5px"}
              border={"1px solid rgb(0,0,0,0.3)"}
              fontSize={"14px"}
              onChange={(e) => onChange(e, form)}
            >
              <option disabled value="">
                --{initial}--
              </option>
              {data.map((each) => (
                <option
                  style={{ textTransform: "capitalize" }}
                  key={each}
                  value={each}
                >
                  {each}
                </option>
              ))}
            </Select>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default Selectt;
