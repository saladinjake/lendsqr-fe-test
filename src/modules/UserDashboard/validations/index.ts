import model from "utils/hooks/useForm/utilities/model";

const FormValidation = (values) => {
  const errors = {
    ...model("code")(values.code)("isRequired"),
   
  };

  return errors;
};

export default FormValidation;
