
import { Svg } from "assets/svg";

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "components/shared/library/components/Box-v1";
import { Flex } from "components/shared/library/components/Flex-v1";
import { Grid } from "components/shared/library/components/Grid";
import Input from "components/shared/library/components/Input-v1/Input";
import Button from "components/shared/library/components/Button-v1/Button";
import Loader from "components/shared/library/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "context/AuthContext";


import validations, {
  validationsPasswordForgot,
} from "../utilities/validations";
import useForm, { hasError } from "utils/hooks/useForm";
import useSendToAPI from "utils/hooks/useSendToApi";
import queryKeys from "../utilities/queryKeys";

import {
  getUserFromStore,
  getAcessTokenFromStore,
  getIsAuthenticatedFromStore,
  getUserRolesFromStore,
} from "reducers/authReducer";
import { RootState } from "reducers";
import { isAuthenticatedByRoles } from "utils";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const authContext = useContext(AuthContext);
  const isLoading = authContext.isLoading;
  // const isAuth = authContext.isAuth;
  const defaultErrorTitle = "Email not found";
  const defaultErrorMessage = "Some error occured.";
  const defaultSuccessTitle = "A mail has been sent to reset your password.";
  const defaultSuccessMessage =
    "Please check your inbox for details on how to reset your password.";
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const [headerLinks, setHeaderLinks] = useState([]);
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState(defaultErrorTitle);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const [successTitle, setSuccessTitle] = useState(defaultSuccessTitle);
  const [successMessage, setSuccessMessage] = useState(defaultSuccessMessage);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { user } = useContext(AuthContext);

  // const isAuth = authContext.isAuth;

  const [hasAuthAminRole, setHasAdminRoles] = useState(false);

  const isAuthenticatedFromStore = useSelector((state: RootState) =>
    getIsAuthenticatedFromStore(state)
  );

  const getPersistenceUser = useSelector((state: RootState) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceRoles = useSelector((state: RootState) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceAcessTokenFromStore = useSelector((state: RootState) =>
    getAcessTokenFromStore(state)
  );

  const isAuth = isAuthenticatedFromStore; //authContext.isAuth; //persistence

  useEffect(() => {
    isAuthenticatedFromStore &&
      getPersistenceRoles?.every((role) => role?.name == "SuperAdmin") &&
      navigate("/dashboard");
  }, [isAuthenticatedFromStore, getPersistenceRoles]);

  const [initialValues, setInitialValues] = useState({
    name: "",
  });
  let navigate = useNavigate();

  const { values, handleChange, handleSubmit, invalid, errors, touched } =
    useForm({
      initialValues,
      validations: validationsPasswordForgot,
      onSubmit() {
        setShowInformationModal(true);
      },
    });


  const handleResetPassword = async () => {
    const payload = {
      email: values?.name,
    };
    return await authContext.forgetPassword(payload);
  };

  return (
    <Box border="none " height="100vh">
      <Flex
        style={{ top: "10vmin"}}
        position="relative"
        justifyContent="between"
        alignItems="center"
        border="none"
      >
        <div className="Login">
          <h3>
            Forgot Password
          </h3>
          <Input
            required
            width="100%"
            label="Email"
            isLoading={false}
            name="name"
            value={values.name}
            onChangePure={handleChange}
            error={hasError("name", touched, errors)}
            message={hasError("name", touched, errors)}
            placeholder="Enter Name / Email"
          />

          <p style={{ color: "#40196D" }}>
            Remember your password?<a href="./get-started">Login</a>
          </p>
          <Box ml="2">
            <Button
              width="100%"
              type="submit"
              disabled={invalid}
              onClick={() => handleResetPassword()}
              textColor="#fff"
            >
              {"Reset Password"}
            </Button>
          </Box>

          <Flex justifyContent="center">
            {isLoading && (
              <Flex alignItems="center">
                <Loader variant={"purple"} />
              </Flex>
            )}
          </Flex>
        </div>
      </Flex>
    </Box>
  );
}

export default Login;
