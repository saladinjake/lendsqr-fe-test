import React, {
  useReducer,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import * as authService from "../../api/auth.services";

import NotificationContext from "./NotificationContext";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  getAcessTokenFromStore,
  getIsAuthenticatedFromStore,
  getUserRolesFromStore,
} from "../redux/reducers/auth.reducer";

import {
  login as loginSuccessfulDispatcher,
  logOut as cleanUserSession,
} from "../redux/actions/auth.action";

import {
  finishAuth,
  deleteToken,
  isSessionExpired,
  getToken,
  getUserData,
  getUserProfile,
  isTokenStillValid,
} from "../helpers/tokenConfig";

import { isAuthenticatedByRoles } from "../helpers";

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

const AuthContext = createContext({
  isAuthenticated: cachedAuthorization ? true : false,
  user: cachedUser ? cachedUser : null,
  token: cachedToken ? cachedToken : null,
  user_roles: cachedRole ? cachedRole : null,
  isAuth: cachedAuthorization ? true : false, //getToken() ? true : false,

  isTokenStillValid: () => isTokenStillValid(),
  isLoading: false,
  userProfile: null,
  login: (credentials) => authService.loginUser(credentials),
  logout: () => {},
  forgetPassword: (payload) => {
    authService.loggedOutUserForgotPassword(payload);
  },
  changePassword: (payload) => {
    authService.ChangePassword(payload);
  },
  updatePassword: (payload) => {
    authService.loginUserForgotChangePassword(payload);
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
      cleanUserSession();
      return {
        ...state,
      };
    case "CHANGE_PASSWORD_FAILED":
      cleanUserSession();
      return {
        ...state,
      };
    case "CHANGE_PASSWORD_SUCCESS":
      cleanUserSession();
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
    const adminOnly =
      Array.isArray(ssoUserRole) &&
      ssoUserRole?.every((role) => role?.name === "User");

    if (!isUserStillAuthenticated) {
      logout();
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
  const isAuthenticatedFromStore = useSelector((state) =>
    getIsAuthenticatedFromStore(state)
  );
  const getPersistenceUser = useSelector((state) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceRoles = useSelector((state) =>
    getUserRolesFromStore(state)
  );
  const getPersistenceAcessTokenFromStore = useSelector((state) =>
    getAcessTokenFromStore(state)
  );
  const dispatchPersistenceLogin = (userData) =>
    reduxAwareDispatcher(loginSuccessfulDispatcher(userData));
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
      const MaxTimeForRetrials = 3;
      let count = 0;
      const apiResponseData = await authService.loginUser(payload);

      console.log(apiResponseData, ">>>");
      const decoded = apiResponseData?.data;
      const adminRoles = apiResponseData?.data?.user?.roles;
      const hasAdminRoles = isAuthenticatedByRoles("User", getPersistenceRoles);
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
          count = count + 1;
          dispatch({ type: "LOGOUT" });
          dispatchPersistenceLogout();
          await cleanUserSession();
          notificationCtx.error("Invalid credentials. Please Try again");
        }
        return apiResponseData.data;
      }
      return apiResponseData.data;
    } catch (error) {
      console.log(error);
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
      const response = await authService.loggedOutUserForgotPassword(payload);
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
      const response = await authService.ChangePassword(payload);
      console.log(response);
      if (response?.data.success) {
        dispatch({ type: "CHANGE_PASSWORD_SUCCESS", response });
        notificationCtx.success("Your  password was reset successfully.");
        return response;
      } else {
        dispatch({ type: "CHANGE_PASSWORD_FAILED" });
        reduxAwareDispatcher({ type: "RESET_ERROR" });
        notificationCtx.error("Some Error occured");
        return { data: { success: false } };
      }
    } catch (err) {
      dispatch({ type: "CHANGE_PASSWORD_FAILED" });
      reduxAwareDispatcher({ type: "RESET_ERROR" });
      notificationCtx.error(err?.message);
      return { data: { success: false } };
    }
  }

  async function updatePassword(payload) {
    try {
      const response = await authService.loginUserForgotChangePassword(payload);
      console.log(response);
      if (response?.data.success) {
        dispatch({ type: "CHANGE_PASSWORD_SUCCESS", response });
        notificationCtx.success("Your  password was reset successfully.");
        return response;
      } else {
        dispatch({ type: "CHANGE_PASSWORD_FAILED" });
        reduxAwareDispatcher({ type: "RESET_ERROR" });
        notificationCtx.error("Some Error occured");
        return { data: { success: false } };
      }
    } catch (err) {
      dispatch({ type: "CHANGE_PASSWORD_FAILED" });
      reduxAwareDispatcher({ type: "RESET_ERROR" });
      notificationCtx.error(err?.message);
      return { data: { success: false } };
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
