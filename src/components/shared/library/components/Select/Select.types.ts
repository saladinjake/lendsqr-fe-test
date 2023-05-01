export interface SelectProps {
  id?: string;
  options: option[];
  width?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  defaultValue?: string;
  required?: boolean;
  optionKey?: string;
  error?: boolean;
  message?: string;
  onGetSelectValue?: (item: option) => void;
  hasShadow?: boolean;
  isLoading?: boolean;
}

export type option = {
  name: string;
  id?: string;
};
