import React, { MouseEventHandler } from "react";

/*example

<Box container width="300px" margin="32px auto">
   
  </Box>
*/
export const Text = (props) => (
  <div
    className={props.className}
    style={{
        ...props.style,
      textAlign: props.textAlign ? props.textAlign : "left",
      fontSize: props.fontSize ? props.fontSize : "14px",
      fontWeight: props.fontWeight ? props.fontWeight : "small",
      color: props.color?  props.color : "#545F7D",
      margin:"10px"
    }}
  >
    {props.children || ""}
  </div>
);
