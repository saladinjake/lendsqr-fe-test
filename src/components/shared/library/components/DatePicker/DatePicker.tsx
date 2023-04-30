import { Flex } from "components/shared/library/components/Flex-v1";

import "./DatePicker.styles.scss";

import IDatePickerProps from "./DatePicker.types";

import { Svg } from "assets/svg";

const { Error: ErrorIcon } = Svg;

const DatePicker = (props: IDatePickerProps) => {
  const {
    date,
    setDate,
    label,
    required,
    error,
    message,
    disabled,
    width = "314px",
  } = props;

  return (
    <Flex direction="column" style={{ opacity: disabled ? 0.7 : 1 }} container>
      {label && (
        <div className="DatePickerLabel">
          {label} {required && <span className="RequiredAsterix">*</span>}
        </div>
      )}
      <div className="InputWrapper" style={{width}}>
        <div className="StyledCalendarIcon" />
        {/* <StyledDatePicker
          selected={date}
          onChange={setDate}
          disabled={disabled}
          peekNextMonth
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          dateFormat="dd-MM-yyyy"
        /> */}
      </div>

      {error && (
        <div className="Error">
          <img className="StyledErrorIcon" src={ErrorIcon} alt="error-icon" />
          {message}
        </div>
      )}
    </Flex>
  );
};

export default DatePicker;
