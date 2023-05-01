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
      textDecoration: props?.underline ? "underline": "none",
      color: props.color ? props.color: "#000",

      alignItems: props.alignItems ,
      margin: props.margin || props.m ,
      marginRight: props.mr ,
      marginBottom: props.mb ,
      marginTop: props.mt ,
      marginLeft: props.ml ,
      padding: props.padding ,

      paddingRight:  props.pr ,
      paddingBottom:  props.pb ,
      paddingTop: props.pt ,
      paddingLeft:  props.pl ,

      width: props.width ,
      height: props.height ,
      maxWidth: props.maxWidth ,
      borderBottomColor: props.borderBottomColor  ,
      borderWidth: props.borderWidth ,
      borderBottomStyle: props.borderBottomStyle ,
      backgroundColor: props.backgroundColor? props.backgroundColor : "#fff" ,
      zIndex: props.zIndex ,
      position: props.position ,
      top: props.top,
      bottom: props.bottom
    }}
  >
    {props.children || ""}
  </div>
);
