/**
 * colors defined here
 */

const colors = {};

/**
 * @param maxWidth max width of media query
 */

const customMediaQuery = (maxWidth: number) =>
  `@media (max-width: ${maxWidth}px)`;
/**
 * List of available media queries
 * To use media query from a styled components, use
 * ```js
 * ${({theme}) => theme.media.desktop}
 * ```
 */

interface Media {
  custom: (maxNumber: number) => string;
  sm: (maxNumber: number) => string;
  md: string;
  lg: string;
  xl: string;
}

const media: Media = {
  custom: customMediaQuery,
  /**
   * small displays like phones
   */
  sm: customMediaQuery,
  /**
   * medium displays like tablets
   */
  md: customMediaQuery(768),
  /**
   * fairly large displays like small laptops
   */
  lg: customMediaQuery(992),
  /**
   * laptops and others
   */
  xl: customMediaQuery(1024),
};

/**
 *
 * @param val  size as number(unitless)
 */

const customFontSize = (val: number) => `${val}rem`;
const customRadius = (val: number) => `${val}px`;
const customSpacing = (val: number) => `${val}px`;
const doubleSpacing = (valX: number, valY: number) => `${valX}px ${valY}px`;
const customBorder = (borderSize: string, borderColor: string) =>
  `${borderSize} solid ${borderColor}`;

const fontSize = {
  custom: customFontSize,
  small: customFontSize(0.9),
  /**
   * normal font size
   */
  normal: customFontSize(1),
  /**
   * font size for headers
   */
  heading: customFontSize(1.4),

  hero: customFontSize(2.5),

  navlink: customFontSize(0.65),
};

/**
 * font family
 */
const fontFamily = {
  dmSansRegular: "DMRegular",
  dmSansBold: "DMBold",
  dmSansMedium: "DMMedium",
};
const spacing = {
  normal: customSpacing(16),
  medium: customSpacing(24),
  large: customSpacing(56),
  custom: customSpacing,
  double: doubleSpacing,
};

const borderRadius = {
  default: "8px",
  primary: "10px",
  card: "16px",
  round: "50%",
  custom: customRadius,
};

const borders = {
  default: "1px solid #00A79D",
  input: " 1px solid #7D8C8B",
  custom: customBorder,
};

export { colors, media, fontSize, fontFamily, borderRadius, spacing, borders };
