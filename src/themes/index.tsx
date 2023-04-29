import { ThemeProvider, DefaultTheme } from "styled-components";

export const colors = {
  kudaWhite: "#FFFFFF",
  kudaBlue: "#1DCBEF",
  kudaYellow: "#FFC83E",
  kudaGreen: "#48D38A",
  kudaPurple: "#40196D",
  kudaDarkPurple: "#EFF1FF",
  kudaBlack: "#000000",
  kudaRed: "#F7685B",
  kudaDarkRed: "#FFDBDB",
  kudaGrey: "#CACACA",
  kudaDarkGrey: "#979797",
  kudaLightGrey: "#F9F9F9",
  kudaLighterGrey: "#F4F4F4",
  kudaLightPurple: "#8369A0",
  kudaInactivePurple: "#EFF1FF",
  kudaLightBlue: "#DBF8FF",
};

const fontSizes = {
  small: "1em",
  medium: "2em",
  large: "3em",
};

const radiuses = {
  sm: "5px",
};

const breakPoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
};

const theme: DefaultTheme = {
  colors,
  fontSizes,
  radiuses,
  breakPoints,
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
