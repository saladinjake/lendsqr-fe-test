import { useState, useEffect } from "react";

function useForm(props) {
  const { initialValues = {}, validations, onSubmit } = props;
  const [values, setValues] = useState(initialValues);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  useEffect(() => {
    setErrors(validations(values));
  }, [values, validations]);

  const isInvalid = (errors) => {
    if (Object.values(errors).length) {
      return true;
    }

    return false;
  };

  const handleChange = ({ target }) => {
    setTouched((touched) => {
      return { ...touched, [target.name]: true };
    });

    setValues((values) => {
      return {
        ...values,
        [target.name]: target.value,
      };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  const resetForm = () => {
    setTouched({});
    setErrors({});
  };

  return {
    values,
    handleChange,
    handleSubmit,
    errors,
    touched,
    invalid: isInvalid(errors),
    resetForm,
  };
}

export const hasError = (name, touched, errors) => {
  if (touched[name] && errors[name]) return errors[name];
};

export default useForm;
