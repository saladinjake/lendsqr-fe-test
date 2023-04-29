import React, { MouseEventHandler } from "react";

/*example

<Box container width="300px" margin="32px auto">
   
  </Box>
*/
export const Box = (props) => (
  <div
    className={props.className}
    style={{
      display: props.display ? props.display : "block",

      alignItems: props.alignItems || "left",
      margin: props.margin || props.m || "0",
      marginRight: props.marginRight || props.mr || "0",
      marginBottom: props.marginBottom || props.mb || "0",
      marginTop: props.margiTop || props.mt || "0",
      marginLeft: props.marginLeft || props.ml || "0",
      padding: props.padding || "0",

      paddingRight: props.paddingRight || props.pr || "0",
      paddingBottom: props.paddingBottom || props.pb || "0",
      paddingTop: props.paddingTop || props.pt || "0",
      paddingLeft: props.paddingLeft || props.pl || "0",

      width: props.width || "auto",
      height: props.height || "auto",
      maxWidth: props.maxWidth || "none",
    }}
  >
    {props.children || ""}
  </div>
);
