const model =
  (key: string) =>
  (value: string | Date | Array<string> | number) =>
  (rules: string) => {
    let errors = {};

    for (const rule of rules.split("|")) {
      if (rule === "isRequired") {
        if (Array.isArray(value) && !value.length) {
          errors = { ...errors, [key]: `${key} is required!` };
          return errors;
        }

        if (!value) {
          errors = { ...errors, [key]: `${key} is required!` };
          return errors;
        }
      }

      if (rule === "isEmail") {
        const regex =
          /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        if (!regex.test(value.toString())) {
          errors = { ...errors, [key]: `${key} is not valid!` };
          return errors;
        }
      }

      if (rule.split(":").length > 1) {
        const [limit, limitValue] = rule.split(":");

        if (limit === "max") {
          if (value.toString().length > Number(limitValue)) {
            errors = {
              ...errors,
              [key]: `${key} cannot be greater than ${limitValue} characters`,
            };
            return errors;
          }
        }

        if (limit === "min") {
          if (value.toString().length < Number(limitValue)) {
            errors = {
              ...errors,
              [key]: `${key} cannot be less than ${limitValue} characters`,
            };
            return errors;
          }
        }
      }
    }

    return errors;
  };

export default model;
