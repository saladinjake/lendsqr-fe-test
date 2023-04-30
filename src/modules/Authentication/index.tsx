import React from "react";
import { Svg } from "assets/svg";
import FormSection from "./Form/LoginTraditional/Login";
import styled from "styled-components";
import { Flex } from "../../components/shared/library/components/Flex-v1";
import { ReactComponent as LoginIllustration } from "assets/img/svg/pablo.svg";

import Logo from "assets/img/svg/logo.svg";

const LeftSection = () => {
  return (
    <div className="leftside">
      <Flex
        style={{ top: "10px" }}
        position="relative"
        justifyContent="space-between"
        alignItems="center"
        container
      >
        <img src={Logo} className="logo" />
      </Flex>
      <div style={{ marginTop: "10px" }}></div>

      <div className="StyledIllustration rigidSection">
        <div className="illustration-wrapper">
          <LoginIllustration />
        </div>
      </div>
    </div>
  );
};

const RightSection = () => {
  return (
    <div className="leftside rigidSection">
      <FormSection />
    </div>
  );
};

const Login = () => {
  return (
    <>
      <div className="flexbox">
        <LeftSection />
        <RightSection />
      </div>
    </>
  );
};

export default Login;
