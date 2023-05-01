import React, { forwardRef, useRef, useEffect } from "react";

const TableCheckbox = forwardRef(
  ({ indeterminate, handleClick, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <div style={{ textAlign: "center" }}>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </div>
    );
  }
);

export default TableCheckbox;
