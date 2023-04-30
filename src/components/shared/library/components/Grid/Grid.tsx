import React from 'react';
import { GridProps } from './Grid.types';





const Grid: React.FC<GridProps> = ({
    templateColumn,
    templateRow,
    columnGap,
    gap,
    rowGap,
    height,
    margin,
    children
}) => {

    const StyledGrid = {
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

export default Grid;