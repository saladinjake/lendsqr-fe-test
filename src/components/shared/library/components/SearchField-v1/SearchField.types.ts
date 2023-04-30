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

// SearchField.propTypes = {
//   width: PropTypes.string, // The width of the searchfield
//   sm: PropTypes.bool, // The small size type of the searchfield
//   lg: PropTypes.bool, // The large size type of the searchfield
//   withBtn: PropTypes.bool, //Searchfield with button
//   placeholder: PropTypes.string, // The placeholde rof the searchfield input
//   btnText: PropTypes.string, //The button text text of the searchfield with button
//   btnAction: PropTypes.func, // The action to be triggered when the button is clicked
//   onChange: PropTypes.func, // The function to be triggered when an event is carried  out on the searchfield
//   loading: PropTypes.bool, // The loading state of the button in the searchfield
// };
