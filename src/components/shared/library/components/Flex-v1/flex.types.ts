/*** TYPESCRIPT TYPES ***/

export interface FlexProps {
  children?: any;
  className?: string;
  container?: boolean;
  style?: any;

  flexDirection?: "row" | "column";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "initial"
    | "inherit";
  flexWrap?: "wrap" | "nowrap" | "wrap-reverse";
  alignItems?:
    | "stretch"
    | "center"
    | "flex-start"
    | "flex-end"
    | "baseline"
    | "initial"
    | "inherit";

  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: number;
  flex?: string;

  padding?: string;
  margin?: string;
  marginBottm?: string;

  width?: string;
  height?: string;
  maxWidth?: string;
  maxHeight?: string;
}
