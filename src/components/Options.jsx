/* eslint-disable react/prop-types */
import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import { Field, FieldArray } from "formik";

const Options = ({ name }) => {
  // const validateOptions = (value) => {
  //   let error;
  //   if (!value) {
  //     error = `Option cannot be empty`;
  //   }
  //   return error;
  // };

  return (
    <FieldArray name={name}>
      {({
        form: {
          values: { options },
        },
      }) => {
        return (
          <Box>
            <FormLabel>
              <Text color={"green"} as={"p"}>
                Please put the correct answer in option A
              </Text>
            </FormLabel>
            <Flex direction={"column"} gap={"10px"}>
              {options.map((each, index) => (
                <Field
                  key={each.option}
                  name={`options[${index}].answerText`}
                  // validate={validateOptions}
                >
                  {({ field, meta }) => {
                    return (
                      <FormControl
                        isInvalid={Boolean(meta.error && meta.touched)}
                      >
                        <Input
                          {...field}
                          placeholder={`Option ${each.option}`}
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
                    );
                  }}
                </Field>
              ))}
            </Flex>
          </Box>
        );
      }}
    </FieldArray>
  );
};

export default Options;
