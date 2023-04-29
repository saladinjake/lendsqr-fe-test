import React, { MouseEventHandler } from "react";

/*example

<Flex container width="300px" margin="32px auto">
    <img 
        style={ImageStyle} 
        src="https://discountdoorhardware.ca/wp-content/uploads/2018/06/profile-placeholder-3.jpg"
        alt="Profile"
    />
    <Flex flex={1} margin="0 0 0 16px"> 
      <Flex container justifyContent="space-between">
          <h4 style={NameStyle}> John Doe </h4>
          <h5 style={DateStyle}> 5 Hours Ago </h5>
      </Flex>
      <p style={Message}>
        Sample flex.
      </p>
    </Flex>
  </Flex>
*/
export const Flex = (props) => (
  <div
    className={props.className}
    style={{
      display: props.container ? "flex" : "block",
      justifyContent: props.justifyContent || "flex-start",
      flexDirection: props.flexDirection || "row",
      flexGrow: props.flexGrow || 0,
      flexBasis: props.flexBasis || "auto",
      flexShrink: props.flexShrink || 1,
      flexWrap: props.flexWrap || "nowrap",
      flex: props.flex || "0 1 auto",
      alignItems: props.alignItems || "stretch",
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
