import React, { useState, useRef, useEffect, useCallback } from "react";
import  "./Select.styles.scss";
import { SelectProps } from "./Select.types";
import { Svg } from "assets/svg";
import Skeleton from "components/shared/Skeleton";
import { Box} from "components/shared/library/components/Box-v1";
import { Flex } from "../Flex-v1";

const { Error } = Svg;

const useOnClickOutside = (ref, handler) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
    };
  }, [ref, handler]);
};

const Select: React.FC<SelectProps> = ({
  label,
  width,
  options,
  placeholder,
  required,
  optionKey,
  defaultValue,
  onGetSelectValue,
  error,
  message,
  disabled,
  hasShadow = true,
  isLoading =false,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(placeholder);
  const [placeholderIsSelected, setPlaceholderIsSelected] = useState(placeholder && !defaultValue);
  const node = useRef();
  useOnClickOutside(node, () => handleOpen());

  const getSelectDefaultValue = useCallback(
    (value) => {
      const defaultValue =
        Array.isArray(options) &&
        options.find(
          (item) =>
            item[optionKey] && item[optionKey].toString() === value.toString()
        );
      return defaultValue ? defaultValue.name : placeholder;
    },
    [defaultValue, options]
  );

  useEffect(() => {
    if (defaultValue) {
      let field = getSelectDefaultValue(defaultValue);
      setSelectedValue(field);
    }

    return () => {
      if (defaultValue) {
        setSelectedValue(placeholder);
      }
    };
  }, [getSelectDefaultValue]);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleSelectValue = (item) => {
    setSelectedValue(item.name);

    if (item[optionKey]) {
      onGetSelectValue({ name: item[optionKey].toString(), id: item.id });
    } else {
      onGetSelectValue({ name: item.name, id: item.id });
    }
    setPlaceholderIsSelected(false)
    handleOpen();
  };
  
  return (

    
    <div className="StyledSelect">
       {isLoading ? (
        <Box>
         
        </Box>
      
      ) : (
        <Flex>

{label && (
        <label className="label">
          {label} {required && <span className="label-star">*</span>}
        </label>
      )}
        </Flex>
      )}



      {
        isLoading? (
        <Box>
          <br/>
            <Skeleton width="100%" />
          <Skeleton width="100%" />
        </Box>
       
        
        ): (
        <>

<div className="selected" onClick={!disabled ? handleOpen : undefined}>
          {selectedValue}
        </div>
        {open && (
          <div className="select-items" ref={node}>
            {options.map((option, i) => (
              <div
                key={i}
                onClick={() =>
                  handleSelectValue({
                    name: option.name,
                    id: option.id,
                  })
                }
                data-id={option.id || undefined}
              >
                {option.name}
              </div>
            ))}
          </div>
        )}
        {error && (
          <span className="error">
            <img src={Error} alt="error-icon" />
            {message}
          </span>
        )}

        
        </>
         
        )
      }
      
      
     
    </div>
  );
};

export default Select;
