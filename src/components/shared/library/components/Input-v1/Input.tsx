import React from "react";
import Skeleton from "../Skeleton-v1";
import {  Flex } from "../Flex-v1";
import {  Box } from "../Box-v1";
import "./Input.styles.scss";
import { InputProps } from "./Input.types";
import { Svg } from "../../../../../assets/svg"

const { Error: ErrorIcon } = Svg;

const Input: React.FC<InputProps> = ({
  label = "Label",
  type = "text",
  error,
  message,
  width,
  placeholder = "Placeholder",
  required = false,
  value,
  onChange,
  onChangePure,
  disabled,
  name,
  isLoading,
}) => {
  return (
    <Flex direction="column" style={{ opacity: disabled ? "0.7" : 1 }}>
      {isLoading ? (
        <Skeleton width="30%" />
      ) : (
        <Flex>
          <div className="label">{label}</div>
          {required && (
            <span className="asterisk">
              *
            </span>
          )}
        </Flex>
      )}

      {isLoading ? (
        <Box mt="4">
          <Skeleton height="40px" width="100%" />
        </Box>
      ) : (
        <input 
          className="wrapperInput"
          width={width}
          type={type}
          placeholder={disabled ? "" : placeholder}
          required={required}
          name={name}
          value={value}
          onChange={(e) => {
            onChangePure && onChangePure(e);
            onChange && onChange(e.currentTarget.value);
          }}
          disabled={disabled}
        />
      )}

      {error && (
        <div className="error">
          <img className="errorIcon" src={ErrorIcon} alt="error-icon" />
          {message}
        </div>
      )}
    </Flex>
  );
};

export default Input;
