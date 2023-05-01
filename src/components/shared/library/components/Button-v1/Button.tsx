import React from "react";
import  "./Button.styles.scss";
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
  className="StyledButton"
}) => {

  const style ={
    width,
    height
  }
  return (
    <div style={style} className={className}
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
