import React from "react";
import "./Button.styles.scss";
import Loader from "../Loader";
import { ButtonProps } from "./Button.types";

const Button: React.FC<ButtonProps> = ({
  variant = "solid",
  color = "primary",
  size = "md",
  loading,
  onClick,
  iconLeft,
  iconRight,
  disabled,
  children,
  width,
  height,
  margin,
  type,
  className = "StyledButton",
  floatable = false,
  textColor =""
}) => {
  const style = {
    width: !floatable ? width : "200px",
    height,
   
    color:
      color == "primary" && textColor=="#fff" ? "#fff":   color == "primary" && textColor!=="#fff"? "#39CDCC"  : color == "secondary" ? "black" : "#E4033B",
    margin: margin ? margin : "3px",
    marginLeft: "10px",
    marginRight: "10px",
    border:
      color == "primary" && variant == "solid"
        ? "1px solid #39CDCC"
        : color == "secondary"
        ? "1px solid black"
        : color == "danger"
        ? "1px solid #E4033B"
        : "1px solid #39CDCC",
  };
  return (
    <div
      style={style}
      className={
        color == "primary" && variant == "solid" ? className : "StyledButton2"
      }
      onClick={onClick}
    >
      {loading ? (
        <Loader
          variant={
            variant === "solid"
              ? "white"
              : variant === "outline"
              ? "purple"
              : "white"
          }
        />
      ) : (
        <>
          {iconLeft && <span className="icon-left">{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span className="icon-right">{iconRight}</span>}
        </>
      )}
    </div>
  );
};

export default Button;
