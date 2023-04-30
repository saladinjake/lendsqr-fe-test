export default interface IDatePickerProps {
  date: Date | string;
  setDate?: (value: Date) => void;
  label?: string;
  required?: boolean;
  error?: boolean;
  message?: string;
  disabled?: boolean;
  width?: string;
}
