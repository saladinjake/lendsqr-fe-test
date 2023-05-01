
import Base from "../Base";
import { IGridItemProps, IGridProps } from "./Grid.types";
import IBaseProps from "../Base/Base.types"


import manageBreakpoints from "../../utilities/manageBreakpoints";
import libraryConfig from "../../utilities/libraryConfig";

import { theme } from "../../../../../themes"
const { spacing, perimeters } = libraryConfig;




export const Item: React.FC<IBaseProps & IGridItemProps> = ({
    bg,
    colSpan,
    rowSpan,
    colStart,
    rowStart,
    margin,
    children,
    height="auto",
    width ="auto",
    //base
    mt="0",
    mb="0",
    ml="0",
    mr="0",
    mx="0",
    my="0",
    p="0",
    pt="0",
    pb="0",
    pl="0",
    pr="0",
    px="0",
    py="0",
   
    position="relative",
    rounded="none",
    shadow="",
    border="",
    cursor="pointer",
    backgroundColor="",
    color="",
    opacity="",
    top="",
    borderWidth="",
    borderColor="",
    borderStyle="",
    borderBottomColor="",
    borderBottomStyle="",
    zIndex="",
    transition="",
    style={}
   
}) => {

    const GridStyle ={
      ...style,
        gridRow: rowSpan && rowStart
              ? rowStart + " / span " + rowSpan
              : rowStart
              ? rowStart + " / " + "auto"
              : rowSpan
              ? "auto / span " + rowSpan
              : "auto / auto",
          gridColumn: colSpan && colStart
              ? colStart + " / span " + colSpan
              : colStart
              ? colStart + " / " + "auto"
              : colSpan
              ? "auto / span " + colSpan
              : "auto / auto",
          height: height ? height : "auto",
          width: width ? width : "auto",
          margin: margin ? margin : "unset",
          background: bg ? bg : bg,
        
          '@media screen and (max-width: 1024px)': {
            gridColumn: colStart && colSpan
                ? colStart + " / span 2"
                : colStart
                ? "2 / " + "auto"
                : colSpan
                ? "auto / span 2"
                : "auto / auto"
          },

          
    }
    return (
        <div 
           style={GridStyle}
        >
            {children}
        </div>
    )
}





export const GridRoot: React.FC<IBaseProps & IGridProps> = ({
  templateColumn,
  style={},
  templateRow,
  columnGap,
  gap,
  rowGap,
  height,
  margin,
  children,
  mt="0",
    mb="0",
    ml="0",
    mr="0",
    mx="0",
    my="0",
    p="0",
    pt="0",
    pb="0",
    pl="0",
    pr="0",
    px="0",
    py="0",
   
    position="relative",
    rounded="none",
    shadow="",
    border="",
    cursor="pointer",
    backgroundColor="",
    color="",
    opacity="",
    top="",
    borderWidth="",
    borderColor="",
    borderStyle="",
    borderBottomColor="",
    borderBottomStyle="",
    zIndex="",
    transition=""
}) => {

  


  const StyledGrid = {
    ...style,
      display: "grid",
      gridTemplateColumns: templateColumn ? templateColumn : "",
      gridTemplateRows: templateRow ? templateRow : "",
      gridGap: gap ? gap : "",
      gridRowGap: rowGap ? rowGap : "",
      gridColumnGap: columnGap ? columnGap : "",
      height: height ? height : "auto",
      margin: margin ? margin : 0,
    
      '@media screen and (max-width: 1024px)': {
        gridTemplateColumns: "repeat(2, 1fr)"
      }
    }

  return (
      <div style={StyledGrid}
          
      >
          {children}
      </div>
  )
}

