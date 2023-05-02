import React from "react"
import GridItemProps from "./GridItems.type"
import "./grid.styles.scss"

const GridItem: React.FC<GridItemProps> = ({
    bg,
    colSpan,
    rowSpan,
    colStart,
    rowStart,
    margin,
    children,
    height="auto",
    width ="auto"
}) => {

    const GridStyle ={
        // gridRow: rowSpan && rowStart
        //       ? rowStart + " / span " + rowSpan
        //       : rowStart
        //       ? rowStart + " / " + "auto"
        //       : rowSpan
        //       ? "auto / span " + rowSpan
        //       : "auto / auto",
          // gridColumn: colSpan && colStart
          //     ? colStart + " / span " + colSpan
          //     : colStart
          //     ? colStart + " / " + "auto"
          //     : colSpan
          //     ? "auto / span " + colSpan
          //     : "auto / auto",
          height: height ? height : "auto",
          width: width ? width : "auto",
          margin: margin ? margin : "unset",
          background: bg ? bg : bg,
        
          // '@media screen and (max-width: 1024px)': {
          //   gridColumn: colStart && colSpan
          //       ? colStart + " / span 2"
          //       : colStart
          //       ? "2 / " + "auto"
          //       : colSpan
          //       ? "auto / span 2"
          //       : "auto / auto"
          // }
    }
    return (
        <div 
           style={GridStyle}
           className="grid-content"
        >
            {children}
        </div>
    )
}

export default GridItem;




