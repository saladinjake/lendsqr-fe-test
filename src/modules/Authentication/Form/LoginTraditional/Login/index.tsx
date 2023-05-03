
import { Svg } from "assets/svg";
import Loader from "components/shared/library/components/Loader";
import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box } from "components/shared/library/components/Box-v1";
import { Flex } from "components/shared/library/components/Flex-v1";
import { Grid } from "components/shared/library/components/Grid";
import Input from "components/shared/library/components/Input-v1/Input";
import Button from "components/shared/library/components/Button-v1/Button";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "context/AuthContext";


import validations from "../utilities/validations";
import useForm, { hasError } from "utils/hooks/useForm";
import useSendToAPI from "utils/hooks/useSendToApi";
import queryKeys from "../utilities/queryKeys";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserFromStore,
  getAcessTokenFromStore,
  getIsAuthenticatedFromStore,
  getUserRolesFromStore,
} from "reducers/authReducer";
import { RootState } from "reducers";
import { isAuthenticatedByRoles } from "utils";

import Logo from "assets/img/svg/logo.svg";

function Login() {
  const reduxDispatcher = useDispatch();
  const authContext = useContext(AuthContext);
  const isLoading = authContext.isLoading;
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

  /*redux aware auth dispatchers*/
  //const dispatchPersistenceLogin = (userData) => reduxDispatcher(loginSuccessfulDispatcher(userData))

 
  const { id } = useParams();
  const [showError, setShowError] = useState(false)
 
  const { user } = useContext(AuthContext);

  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate();

  const { values, handleChange, handleSubmit, invalid, errors, touched } =
    useForm({
      initialValues,
      validations,
      onSubmit(e) {
        e.preventDefault();
       
      },
    });

  useEffect(() => {
    isAuthenticatedFromStore &&
      getPersistenceRoles?.every((role) => role?.name == "SuperAdmin") &&
      navigate("/dashboard");
  }, [isAuthenticatedFromStore, getPersistenceRoles]);

  const loginUser = async () => {
    try {
      const payload = {
        email: values?.email,
        password: values?.password,
      };
      localStorage.setItem(
        "avatar",
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg"
      );
      const apiResponseData = await authContext.login(payload);

      console.log(apiResponseData, ">>>>>>>.")

      const adminRoles = apiResponseData?.data?.user?.roles;
      let freshLoginAdminRoles = isAuthenticatedByRoles(
        "SuperAdmin",
        adminRoles
      );

      if(!freshLoginAdminRoles || !apiResponseData ){
        setShowError(true)
      }

      freshLoginAdminRoles && navigate("/dashboard");
    } catch (error) {}
  };

  return (
    <Box border="none " height="100vh" >
           <img src={Logo} className="Logo sm-only" />

      <Flex
        style={{ top: "10vmin"}}
        position="relative"
        justifyContent="between"
        alignItems="center"
        border="none"
      >
        <div className="Login">
          <h3>
            Welcome
          </h3>
          <p className="info">Enter details to login</p>
         <span className="">{showError && "Invalid Credentials"}</span> 

          <Input
           
            width="100%"
            label=""
            isLoading={false}
            name="email"
            value={values.email}
            onChangePure={handleChange}
            error={hasError("email", touched, errors)}
            message={hasError("email", touched, errors)}
            placeholder="Email"
          />

          <Input
           
            width="100%"
            label=""
            isLoading={false}
            type="password"
            name="password"
            value={values.password}
            onChangePure={handleChange}
            error={hasError("password", touched, errors)}
            message={hasError("password", touched, errors)}
            placeholder="Password"
          />

          <p className="reset-link">
            <a href="./login/forget-password">Forgot Password? </a>
          </p>
          <Box ml="2">
            <Button
              width="98%"
              type="submit"
              disabled={invalid}
              onClick={() => loginUser()}
              textColor="#fff"
            >
              {"Login"}
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
