import React, { useState, useEffect } from "react";
import Button from "../Button-v1";
import "./SearchField.styles.scss";
import { SearchFieldProps } from "./SearchField.types";
import { Svg } from "./../../../../../assets/svg";


const { Search } = Svg;

const SearchField: React.FC<SearchFieldProps> = ({
  error,
  placeholder,
  width,
  withBtn,
  btnText,
  onChange,
  height,
  value,
  onButtonClick,
  onResetSearch,
  searchColumns,
}) => {
  const [clicked, setClicked] = useState(false);
  const [touched, setTouched] = useState(false);
  const [searchBy, setSearchColumns] = useState([]);
  const [searchColumnsString, setSearchString] = useState("");
  useEffect(() => {
    if (value?.length <= 0) {
      setClicked(false);
      setTouched(false);
    }
  }, [value, clicked, touched]);

  useEffect(() => {
    searchColumns.forEach((searchItem) => {
      if (!searchBy.includes(searchItem?.name)) {
        setSearchColumns([...searchBy, searchItem?.name]);
      }
    });
    setSearchString(searchBy.join(" ,"));
  }, [searchColumns]);

  const handleFocus = (ev) => {
    var tooltip = ev.target.nextElementSibling;
    if (tooltip && tooltip.className == "tooltip") {
      tooltip.style.opacity = 1;
    }
  };
  const handleBlur = (ev) => {
    var tooltip = ev.target.nextElementSibling;
    if (tooltip && tooltip.className == "tooltip") {
      tooltip.style.opacity = 0;
    }
  };

  return (
    <div className="StyledSearchField" >
     <input
      onChange={onChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className="wrapperInput"
      placeholder={placeholder}
      

     />
      <div className="tooltip">{"Search table by " + searchColumnsString}</div>
      {withBtn && (
        <>
          {!touched && clicked.toString() != "true" ? (
            <Button
              height="40px"
              width="56px"
              size="md"
              type="submit"
              onClick={onButtonClick}
            >
              <div className="icon">
                <Search />
              </div>
            </Button>
          ) : (
            <Button
              width="87px"
              size="md"
              type="submit"
              onClick={() => {
                setTouched(false);
                if (onResetSearch) onResetSearch();
              }}
            >
              Reset
            </Button>
          )}
        </>
      )}
    </div>
  );
};

export default SearchField;
