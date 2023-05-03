import React from "react";
import { Svg } from "assets/svg";
import FormSection from "./Form/LoginTraditional/Login";
import styled from "styled-components";
import { Flex } from "../../components/shared/library/components/Flex-v1";
import LoginIllustration  from "assets/img/svg/pablo.svg";
import  Col from "../../components/shared/library/components/RowsAndColumns-v1/Column"
import  Row from "../../components/shared/library/components/RowsAndColumns-v1/Row"
import Logo  from "../../assets/img/svg/logo.svg";


const LeftSection = () => {
  return (
    <div className="leftside">
      <Flex
        style={{ marginTop: "0px" }}
        position="relative"
        justifyContent="space-between"
        alignItems="center"
        container
      >
        <img src={Logo as unknown as string} className="Logo" />
      </Flex>

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
    <div className="rightside rigidSection">
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
