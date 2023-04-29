import React from 'react'

export const Flex = (props) => (
  <div
    className={props.className}
    style={{
      display: props.container ? 'flex' : 'block',
      justifyContent: props.justifyContent || 'flex-start',
      flexDirection: props.flexDirection || 'row',
      flexGrow: props.flexGrow || 0,
      flexBasis: props.flexBasis || 'auto',
      flexShrink: props.flexShrink || 1,
      flexWrap: props.flexWrap || 'nowrap',
      flex: props.flex || '0 1 auto',
      alignItems: props.alignItems || 'stretch',
      margin: props.margin || props.m || '0',
      marginRight : props.marginRight || props.mr || "0",
      marginBottom : props.marginBottom || props.mb || "0",
      marginTop : props.margiTop || props.mt|| "0",
      marginLeft : props.marginLeft || props.ml || "0",
      padding: props.padding || '0',

      paddingRight : props.paddingRight || props.pr || "0",
      paddingBottom : props.paddingBottom || props.pb || "0",
      paddingTop : props.paddingTop || props.pt|| "0",
      paddingLeft : props.paddingLeft || props.pl || "0",

      width: props.width || 'auto',
      height: props.height || 'auto',
      maxWidth: props.maxWidth || 'none'
    
    }}
  >
    {props.children || ''}
  </div>
)