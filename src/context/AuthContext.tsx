import {
    useReducer,
    createContext,
    useContext,
    useState,
    useEffect,
  } from "react";
  import FingerprintJS from "@fingerprintjs/fingerprintjs";
  import jwt_decode from "jwt-decode";
  import * as authService from "api/services/Auth";
  import { postRequest } from "api/apiCalls";
  import NotificationContext from "context/NotificationContext";
  import { connect, useDispatch, useSelector } from "react-redux";
  import {
    getUserFromStore,
    getAcessTokenFromStore,
    getIsAuthenticatedFromStore,
    getUserRolesFromStore,
  } from "reducers/authReducer";
  
  import { login as loginSuccessfulDispatcher } from "actions/authActions";
  
  
  import {
    finishAuth,
    deleteToken,
    isSessionExpired,
    getToken,
    getUserData,
    getUserProfile,
    isTokenStillValid,
  } from "../utils/tokenConfig";
  import { logOut } from "actions/authActions";
  import {
    logOut as cleanUserSession
  } from "api/services/Auth"
  import { RootState } from "reducers";

  import { useNavigate } from "react-router-dom";
  
  const cachedUser = localStorage && JSON?.parse(localStorage.getItem("user"));
  const cachedRole =
    localStorage && JSON?.parse(localStorage.getItem("user_roles"));
  const cachedToken = localStorage && localStorage.getItem("token");
  const cachedAuthorization = localStorage.user && localStorage.token;
  
  const initialState = {
    isAuthenticated: cachedAuthorization ? true : false,
    user: cachedUser ? cachedUser : null,
    token: cachedToken ? cachedToken : null,
    user_roles: cachedRole ? cachedRole : null,
    isAuth: cachedAuthorization ? true : false, //getToken() ? true : false,
    isLoading: false,
    userProfile: null,
    isLoggedIn: false,
    isLoginPending: false,
    loginError: null,
    loadAuthUser: () => isTokenStillValid(),
  };
  
  interface IDecoded {
    email: string;
    family_name: string;
    given_name: string;
    name: string;
    picture: string;
    exp: string;
    designation?: string;
    employeeNumber?: string;
    firstName?: string;
    lastName?: string;
    userRoleID?: string;
    id?: string;
    userName?: string;
    password?: string;
    isSuccessful?: boolean;
  }
  
  const AuthContext = createContext({
    isAuthenticated: cachedAuthorization ? true : false,
    user: cachedUser ? cachedUser : null,
    token: cachedToken ? cachedToken : null,
    user_roles: cachedRole ? cachedRole : null,
    isAuth: cachedAuthorization ? true : false, //getToken() ? true : false,
  
    isTokenStillValid: () => isTokenStillValid(),
    isLoading: false,
    userProfile: null,
    login: (credentials) => authService.authenticateUser(credentials),
    logout: () => {},
    forgetPassword: (payload: any): any =>  {
       authService.forgetPassword(payload);
    },
    changePassword: (payload: any): any =>  {
      authService.resetPassword(payload);
    },
    updatePassword: (payload: any): any =>{
      authService.updatePassword(payload);
    },
    loadAuthUser: () => {},
    modules: [],
    permissions: [],
  });
  
  function authReducer(state, action) {
    switch (action.type) {
      case "LOGIN_START":
        return {
          ...state,
          isLoading: true,
        };
      case "LOGIN_SUCCESS":
        return {
          ...state,
          user: action.user,
          isAuth: action.isAuthenticated,
          isLoading: false,
          userProfile: action.userProfile,
          user_roles: action.user_roles,
          isAuthenticated: action.isAuthenticated,
        };
      case "LOGOUT":
        return {
          ...state,
          user: null,
          isAuth: false,
          isLoading: false,
          userProfile: null,
        };
      case "FORGOT_PASSWORD_SUCCESS":
        return {
          ...state,
        };
      case "FORGOT_PASSWORD_FAILED":
        logOut();
        return {
          ...state,
        };
      case "CHANGE_PASSWORD_FAILED":
        logOut();
        return {
          ...state,
        };
      case "CHANGE_PASSWORD_SUCCESS":
        logOut();
        return {
          ...state,
        };
  
      default:
        return state;
    }
  }
  
  function getPublicIp(url) {
    return fetch(url).then((res) => res.text());
  }
  
  async function loadAuthUser(state, dispatch, logout) {
  
    try {
      const isUserStillAuthenticated = await state.loadAuthUser(); //check token profile
      const ssoUserIdentityProfile = isUserStillAuthenticated?.data?.user;
      const ssoUserRole = isUserStillAuthenticated?.data?.user?.roles;
      const adminOnly = Array.isArray(ssoUserRole) && ssoUserRole?.every((role) => role?.name === "SuperAdmin");
  
      if (!isUserStillAuthenticated) {
        logOut();
        await cleanUserSession();
      } else if (ssoUserIdentityProfile && adminOnly) {
        if (!isSessionExpired()) {
          let token = getToken();
          let user = getUserData();
          let userProfile = getUserProfile();
          if (token && user) {
            dispatch({
              type: "LOGIN_SUCCESS",
              user,
              isAuth: true,
              userProfile,
              isAuthenticated: true,
            });
          } else {
            // logout();
            await cleanUserSession();
          }
        } else {
          // logout();
          await cleanUserSession();
        }
      }
    } catch (error) {
      console.log(error);
      // logout();
      await cleanUserSession();
    }
  }
  
  function AuthProvider(props) {
    const reduxAwareDispatcher = useDispatch();
    const [state, dispatch] = useReducer(authReducer, initialState);
    const notificationCtx = useContext(NotificationContext);
    const [userIp, setMyIp] = useState(null);
    const [message, setMessage] = useState("");
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
    const dispatchPersistenceLogin = (userData) =>
      reduxAwareDispatcher({ type: "LOGIN_SUCCESS", payload: userData});
    const dispatchPersistenceLogout = () =>
      reduxAwareDispatcher({ type: "LOGIN_FAIL" });
  
    const [internalsState, setState] = useState(initialState);
    useEffect(() => {
      loadAuthUser(state, dispatch, logout);
    }, [state]);
  
    const login = async (payload) => {
      try {
        dispatch({ type: "LOGIN_START" });
        const ipaddr = await getPublicIp(
          "https://www.cloudflare.com/cdn-cgi/trace"
        );
        let ipRegex = /[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}/;
        let ip = ipaddr.match(ipRegex)[0];
        const apiResponseData = await authService.authenticateUser(payload);
        const decoded = apiResponseData?.data;
        const adminRoles = apiResponseData?.data?.user?.roles;
        const hasAdminRoles = adminRoles.every(role => role.name =="SuperAdmin")
        if (hasAdminRoles) {
          const userToken = apiResponseData?.data?.access_token;
          const userProfile = {
            id: apiResponseData?.data?.user?.id,
            employeeNumber: apiResponseData?.data?.user?.employeeNumber,
            username: apiResponseData?.data?.user?.username,
            first_name: apiResponseData?.data?.user?.first_name,
            middle_name: apiResponseData?.data?.user?.middle_name,
            last_name: apiResponseData?.data?.user?.last_name,
            email: apiResponseData?.data?.user?.email,
            phone_number: apiResponseData?.data?.user?.phone_number,
            image_url: apiResponseData?.data?.user?.image_url,
            instructor_profile: apiResponseData?.data?.user?.instructor_profile,
            roles: apiResponseData?.data?.user?.roles,
          };
       
          const tokenExpiry = ""; //decoded?.expires_at || null;
          const fpPromise = await FingerprintJS.load();
          const fpPromiseGetResult = await fpPromise.get();
          const visitorId = fpPromiseGetResult.visitorId;
  
          const data = {
            userToken,
            auditLogData: {
              SYSTEMIDENTIFIER: "",
              SYSTEMIPADDRESS: ip,
              SYSTEMMACADDRESS: visitorId,
              SYSTEMNAME: "",
              SUBJECTIDENTIFIER: "",
            },
          };
  
          try {
            const user = apiResponseData.data?.user;
            const ApiResponseStatus =
              apiResponseData?.data?.success &&
              apiResponseData?.data?.status_code;
  
            if (ApiResponseStatus) {
              finishAuth(userToken, user, visitorId, tokenExpiry, userProfile);
              dispatchPersistenceLogin({
                user,
                isAuthenticated: true,
                access_token: userToken,
                user_roles: getPersistenceRoles,
              });
              notificationCtx.success("Login successful!");
              dispatch({
                type: "LOGIN_SUCCESS",
                user,
                isAuth: isAuthenticatedFromStore, //true,
                userProfile,
                user_roles: getPersistenceRoles,
              });
            } else {
              notificationCtx.error("Invalid credentials. Please Try again");
            }
          } catch (error) {
         
            dispatch({ type: "LOGOUT" });
            dispatchPersistenceLogout();
            await cleanUserSession();
            notificationCtx.error("Invalid credentials. Please Try again");
          }
          return apiResponseData.data;
        }
        return apiResponseData.data;
      } catch (error) {
        notificationCtx.error("Invalid credentials.");
      }
    };
  
    async function logout() {
      deleteToken();
      dispatch({ type: "LOGOUT" });
      dispatchPersistenceLogout();
      await cleanUserSession();
    }
  
    async function forgetPassword(payload) {
      try {
        const response = await authService.forgetPassword(payload);
        if (response?.data.success) {
          dispatch({ type: "FORGOT_PASSWORD_SUCCESS", response });
          notificationCtx.success(
            "An Email  was sent to your inbox to reset your password."
          );
          
        } else {
          dispatch({ type: "FORGOT_PASSWORD_SUCCESS", response });
          notificationCtx.error("Some Error occured");
        }
      } catch (err) {
        dispatch({ type: "FORGOT_PASSWORD_FAILED" });
        notificationCtx.error(err?.message);
      }
    }
  
    async function changePassword(payload) {
      try {
        const response = await authService.resetPassword(payload);
       
        if (response?.data.success) {
          dispatch({ type: "CHANGE_PASSWORD_SUCCESS", response });
          notificationCtx.success("Your  password was reset successfully.");
          return response
       
        } else {
          dispatch({ type: "CHANGE_PASSWORD_FAILED" });
          reduxAwareDispatcher({type:"RESET_ERROR"})
          notificationCtx.error("Some Error occured");
          return {data: {success: false}}
        }
      } catch (err) {
        dispatch({ type: "CHANGE_PASSWORD_FAILED" });
        reduxAwareDispatcher({type:"RESET_ERROR"})
        notificationCtx.error(err?.message);
        return {data: {success: false}}
      }
    }
  
    async function updatePassword(payload) {
      try {
        const response = await authService.updatePassword(payload);
       
        if (response?.data.success) {
          dispatch({ type: "CHANGE_PASSWORD_SUCCESS", response });
          notificationCtx.success("Your  password was reset successfully.");
          return response
       
        } else {
          dispatch({ type: "CHANGE_PASSWORD_FAILED" });
          reduxAwareDispatcher({type:"RESET_ERROR"})
          notificationCtx.error("Some Error occured");
          return {data: {success: false}}
        }
      } catch (err) {
        dispatch({ type: "CHANGE_PASSWORD_FAILED" });
        reduxAwareDispatcher({type:"RESET_ERROR"})
        notificationCtx.error(err?.message);
        return {data: {success: false}}
      }
    }
  
    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          login,
          logout,
          forgetPassword,
          changePassword,
          updatePassword,
          isAuth: state.isAuth,
          isLoading: state.isLoading,
          loadAuthUser: () => loadAuthUser(state, dispatch, logout),
          userProfile: state.userProfile,
        }}
        {...props}
      >
        {props.children}
      </AuthContext.Provider>
    );
  }
  
  const useAuth = () => useContext(AuthContext);
  export { AuthContext, AuthProvider, useAuth };
  