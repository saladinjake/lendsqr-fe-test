import React, { MouseEventHandler } from "react";

/*example

<Box container width="300px" margin="32px auto">
   
  </Box>
*/
export const Box = (props) => (
  <div
    className={props.className}
    style={{
      // display: props.container ? "flex" : props.className !=="user-action-notifier"?  "block": "none",
      textDecoration: props?.underline ? "underline": "none",
      color: props.color? props?.color: "#000",

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
      borderBottomColor: props.borderBottomColor ? props.borderBottomColor : "",
      borderWidth: props.borderWidth ? props.borderWidth :  "0",
      borderBottomStyle: props.borderBottomStyle ? props.borderBottomStyle:  "none",
      backgroundColor: props.backgroundColor ? props.backgroundColor : "",
      zIndex: props.zIndex ? props.zIndex : "1",
      position: props.position ? props.position : "relative",
      top: props.top? props.top: "0px",
      bottom: props.bottom? props.bottom : "0px"
    }}
  >
    {props.children || ""}
  </div>
);
