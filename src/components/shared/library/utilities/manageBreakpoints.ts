import libraryConfig from "./libraryConfig";

const screensByIndex = {
  1: "sm",
  2: "md",
  3: "lg",
  4: "xl",
  5: "2xl",
};

const manageBreakpoints = (
  key: string,
  value: Array<string | number> | string | number,
  theme: any,
  manager?: any
) => {
  theme = Object.values(theme).length ? theme : libraryConfig;

  if (!value) return `${key}: ''`;

  if (Array.isArray(value)) {
    const result = value
      .map((item, index) => {
        if (index) {
          return `@media screen and (min-width: ${
            theme.breakPoints[screensByIndex[index]]
          }) {
            ${key}: ${manager && manager[item] ? manager[item] : item}
          };`;
        }

        return `${key}: ${
          manager && manager[value[0]] ? manager[value[0]] : value[0]
        };`;
      })
      .join(" ");
    return result;
  }

  return `${key}: ${manager && manager[value] ? manager[value] : value}`;
};

export default manageBreakpoints;
