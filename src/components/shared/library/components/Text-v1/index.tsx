import React, { MouseEventHandler } from "react";

/*example

<Box container width="300px" margin="32px auto">
   
  </Box>
*/
export const Text = (props) => (
  <div
    className={props.className}
    style={{
      textAlign: props.textAlign ? props.textAlign : "left",
      fontSize: props.fontSize ? props.fontSize : "14px",
      fontWeight: props.fontWeight ? props.fontWeight : "small",
    }}
  >
    {props.children || ""}
  </div>
);
