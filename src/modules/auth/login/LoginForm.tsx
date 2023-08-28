import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Props {}

const Auth: FC<Props> = () => {
  const [loading, setLoading] = useState<Boolean>(false);
  const navigate = useNavigate();
  const [showPassword, setPassword] = useState<Boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const handleSendToApi = (data: any) => {
    if (data) {
      setLoading(true);
      setTimeout(() => {
        reset();
        navigate("/dashboard");
        setLoading(false);
      }, 2000);
    }
  };

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
