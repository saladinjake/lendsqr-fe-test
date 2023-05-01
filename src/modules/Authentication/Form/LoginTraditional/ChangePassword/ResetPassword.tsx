
import { Svg } from "assets/svg";

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "context/AuthContext";

import { Box } from "components/shared/library/components/Box-v1";
import { Flex } from "components/shared/library/components/Flex-v1";
import { Grid } from "components/shared/library/components/Grid";
import Input from "components/shared/library/components/Input-v1/Input";
import Button from "components/shared/library/components/Button-v1/Button";
import Loader from "components/shared/library/components/Loader";

import validations, {
  validationsPasswordReset,
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

function ChangePassword() {
  const authContext = useContext(AuthContext);
  const isLoading = authContext.isLoading;
  // const isAuth = authContext.isAuth;

  const [hasAuthAminRole, setHasAdminRoles] = useState(false);

  const isAuthenticatedFromStore = useSelector((state: RootState) =>
    getIsAuthenticatedFromStore(state)
  );
  const isAuth = isAuthenticatedFromStore; //authContext.isAuth; //persistence
  const getPersistenceUser = useSelector((state: RootState) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceRoles = useSelector((state: RootState) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceAcessTokenFromStore = useSelector((state: RootState) =>
    getAcessTokenFromStore(state)
  );

  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  useEffect(() => {
    isAuthenticatedFromStore &&
      getPersistenceRoles?.every((role) => role?.name == "SuperAdmin") &&
      navigate("/dashboard");
  }, [isAuthenticatedFromStore, getPersistenceRoles]);

  const defaultErrorTitle = "Login  failed";
  const defaultErrorMessage = "Some error occured.";
  const defaultSuccessTitle = "Login Successsful";
  const defaultSuccessMessage =
    "You have successfully created a new branch on Nerve.";
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

  const [initialValues, setInitialValues] = useState({
    password: "",
    passwordConfirm: "",
  });
  let navigate = useNavigate();

  const { values, handleChange, handleSubmit, invalid, errors, touched } =
    useForm({
      initialValues,
      validations: validationsPasswordReset,
      onSubmit() {
        setShowInformationModal(true);
      },
    });

    const  email =  getParameterByName("email")
    const { pathname } = window.location;
    const paths = pathname.split("/").filter(entry => entry !== "");
    const resetToken = paths[paths.length - 1];
    
    

  const changePassword = async () => {
    const payload = {
      password: values?.password,
      password_confirmation: values?.passwordConfirm,
      email,
      token: resetToken,
    };   
    const response = await authContext.changePassword(payload);
    if(response.data.success) navigate("../../get-started", {replace: true})
  
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
            Reset Your Password
          </h3>

          <Input
            required
            width="100%"
            label="password"
            isLoading={false}
            type="password"
            name="password"
            value={values.password}
            onChangePure={handleChange}
            error={hasError("password", touched, errors)}
            message={hasError("password", touched, errors)}
            placeholder="Enter Password"
          />

          <Input
            required
            width="100%"
            label="password"
            isLoading={false}
            type="password"
            name="passwordConfirm"
            value={values.passwordConfirm}
            onChangePure={handleChange}
            error={hasError("password", touched, errors)}
            message={hasError("password", touched, errors)}
            placeholder="Enter Password"
          />

          <Box ml="2">
            <Button
              width="100%"
              type="submit"
              disabled={invalid}
              onClick={() => changePassword()}
              textColor="#fff"
            >
              {"Change Password"}
            </Button>
          </Box>
          <p style={{ color: "#40196D" }}>
            Remember your password?<a href="./get-started">Login</a>
          </p>

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

export default ChangePassword;
