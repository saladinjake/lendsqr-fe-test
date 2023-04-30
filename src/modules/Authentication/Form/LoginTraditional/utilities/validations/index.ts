import model from "utils/hooks/useForm/utilities/model";

const validations = (values: {email:string,password:string}) => {
  const errors = {
    ...model("password")(values.password)("isRequired|min:6|max:30"),
    ...model("email")(values.email)("isRequired|min:4|isEmail"),
   
  };

  return errors;
};


export const validationsPasswordForgot = (values: {name:string}) => {
  const errors = {
  
    ...model("name")(values.name)("isRequired|min:2"),
   
  };

  return errors;
};

export const validationsPasswordReset = (values: {passwordConfirm:string,password:string}) => {
  const errors = {
    ...model("password")(values.password)("isRequired"),
    ...model("passwordConfirm")(values.passwordConfirm)("isRequired|min:2"),
   
  };

  return errors;
};

export default validations;
