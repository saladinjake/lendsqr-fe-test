import React from "react";

export interface SearchFieldProps {
  width?: string;
  
  height?: string;

  size?: "sm" | "lg";

  withBtn?: Boolean;

  btnText?: string;

  error?: string;

  placeholder?: string;

  label?: string;

  message?: string;
  
  value?: string

  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onButtonClick?: () => void;
  onResetSearch?: () => void;
  searchColumns?: any[];
}

