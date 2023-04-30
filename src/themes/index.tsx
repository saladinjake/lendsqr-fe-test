import { ThemeProvider } from "../context/ThemeContext";

export const colors = {
  lendSqrWhite: "#FFFFFF",
  lendSqrBlue: "#1DCBEF",
  lendSqrYellow: "#FFC83E",
  lendSqrGreen: "#48D38A",
  lendSqrPurple: "#40196D",
  lendSqrDarkPurple: "#EFF1FF",
  lendSqrBlack: "#000000",
  lendSqrRed: "#F7685B",
  lendSqrDarkRed: "#FFDBDB",
  lendSqrGrey: "#CACACA",
  lendSqrDarkGrey: "#979797",
  lendSqrLightGrey: "#F9F9F9",
  lendSqrLighterGrey: "#F4F4F4",
  lendSqrLightPurple: "#8369A0",
  lendSqrInactivePurple: "#EFF1FF",
  lendSqrLightBlue: "#DBF8FF",
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

export const theme = {
  colors,
  fontSizes,
  radiuses,
  breakPoints,
};

const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
