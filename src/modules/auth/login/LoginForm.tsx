
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import {
  getUserFromStore,
  getAcessTokenFromStore,
  getIsAuthenticatedFromStore,
  getUserRolesFromStore,
} from "../../../redux/reducers/auth.reducer";
import { AuthContext } from "../../../contexts/AuthContext";
import {FC,  useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { isAuthenticatedByRoles } from "../../../utils";
import { RootState } from "../../../redux/reducers";
interface Props {}

const Auth: FC<Props> = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [showPassword, setPassword] = useState<Boolean>(false);
  const [initialValues, setInitialValues] = useState({
    email: "",
    password: "",
  });

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

  const { id } = useParams();
  const [showError, setShowError] = useState(false)
 
  const { user } = useContext(AuthContext);


  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleSendToApi = async (data: any) => {
    if (data) {
      setLoading(true);
      // setTimeout(() => {
      //   reset();
      //   navigate("/dashboard");
      //   setLoading(false);
      // }, 2000);
      try {
        const payload = {
          ...data
        };
        localStorage.setItem(
          "avatar",
          "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg"
        );
        const apiResponseData = await authContext.loginMock(payload);
  
        console.log(apiResponseData, ">>>>>>>.")
  
        
  
        if(!apiResponseData ){
          return setShowError(true)
        }
        setLoading(false);
        return navigate("/dashboard");
      } catch (error) {}
    }
  };

  const handleChange = (event: Event) =>{
    let target = event.target as HTMLInputElement
     setInitialValues({
      ...initialValues,
       [target.name]:target.value
     })
  }

  return (
    <section className="app-login-page">
      <div className="wrapper">
        <section className="illustrations">
          <img src="/images/logo.svg" alt="logo" className="app-logo" />
          <div className="pablo">
            <img src="/images/login-illus.svg" alt="illustration" />
          </div>
        </section>

        <section className="authenticator">
          <img src="/images/logo.svg" alt="logo" className="logo" />
          <section className="form-grid">
            <div className="welcome">
              <h1>Welcome!</h1>
              <p>Enter details to login.</p>
            </div>
            <form
              onSubmit={handleSubmit(handleSendToApi)}
              className="login-box"
            >
              {errors?.email && errors?.email?.type === "required" && (
                <span role="alert" className="input-has-error">
                  Please enter your email
                </span>
              )}
              <div>
                <input
                  type="email"
                 
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                  })}
                />
              </div>

              <div>
                {errors?.password && errors?.password?.type === "required" && (
                  <span role="alert" className="input-has-error">
                    Please enter your password
                  </span>
                )}
                <div className="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                  <p
                    className="show-password"
                    onClick={() => setPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </p>
                </div>
              </div>
              <p>FORGOT PASSWORD?</p>
              <button className="cta-trigger" type="submit">
                {loading ? "Loading..." : "LOG IN"}
              </button>
            </form>
          </section>
        </section>
      </div>
    </section>
  );
};

export default Auth;
