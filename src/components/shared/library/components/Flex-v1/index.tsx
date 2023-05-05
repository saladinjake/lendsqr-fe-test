import React, { MouseEventHandler } from "react";
import { FlexProps } from "./flex.types"

export const Flex = (props) => (
  <div
    className={props.className || "flex_classic"}
    style={{
     ...props.style,
      display: props.container ? "flex" : "block",
      justifyContent: props.justifyContent || "flex-start",
      flexDirection: props.flexDirection || "row",
      flexGrow: props.flexGrow || 0,
      flexBasis: props.flexBasis || "auto",
      flexShrink: props.flexShrink || 1,
      flexWrap: props.flexWrap || "nowrap",
      flex: props.flex || "0 1 auto",
      alignItems: props.alignItems || "stretch",
      margin: props.margin ,
      marginRight: props.marginRight ,
      marginBottom: props.marginBottom ,
      marginTop: props.margiTop ,
      marginLeft: props.marginLeft ,
      padding: props.padding ,

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
      bottom: props.bottom? props.bottom : "0px",

      
    }}
    
  >
    {props.children || ""}
  </div>
);
