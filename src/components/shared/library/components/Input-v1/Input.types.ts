import { SyntheticEvent } from "react";
export interface InputProps {
  id?: string;

  /**
   * Type of Input can be
   */
  type?: string;

  value?: string;

  size?: "sm" | "md" | "lg";

  label?: string;

  error?: boolean;

  message?: string;

  width?: string;

  placeholder?: string;

  required?: boolean;

  onChange?: (inputValue: string) => void;

  onChangePure?: (event: SyntheticEvent) => void;

  disabled?: boolean;

  name?: string;

  isLoading?: boolean;
}
