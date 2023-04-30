import libraryConfig from "../../utilities/libraryConfig";

export default interface IBaseProps {
  m?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  mt?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  mb?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  ml?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  mr?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  mx?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  my?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  p?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  pt?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  pb?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  pl?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  pr?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  px?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  py?:
    | Array<keyof typeof libraryConfig.spacing>
    | keyof typeof libraryConfig.spacing;
  width?: keyof typeof libraryConfig.perimeters | string;
  height?: Array<string> | string;
  position?: "absolute" | "relative" | "static" | "fixed" | "sticky";
  rounded?:
    | Array<keyof typeof libraryConfig.rounds>
    | keyof typeof libraryConfig.rounds
    | string;
  shadow?: string;
  border?: string;
  cursor?:
    | "auto"
    | "default"
    | "pointer"
    | "wait"
    | "text"
    | "move"
    | "help"
    | "not-allowed"
    | "none";
  backgroundColor?:
    | Array<keyof typeof libraryConfig.colors>
    | keyof typeof libraryConfig.colors
    | string;
  color?:
    | Array<keyof typeof libraryConfig.colors>
    | keyof typeof libraryConfig.colors
    | string;
  opacity?: string[] | string;
  top?: string;
  borderWidth?: string;
  borderColor?: string;
  borderStyle?: string;
  borderBottomColor?: string;
  borderBottomStyle?: string;
  zIndex?: string;
  transition?: string;
  children?:any;
}
