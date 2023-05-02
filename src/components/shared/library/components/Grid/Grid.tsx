import React from 'react';
import { GridProps } from './Grid.types';
import "./grid.styles.scss"




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
        // display: "grid",
        // gridTemplateColumns: templateColumn ? templateColumn : "",
        // gridTemplateRows: templateRow ? templateRow : "",
        // gridGap: gap ? gap : "",
        // gridRowGap: rowGap ? rowGap : "",
        // gridColumnGap: columnGap ? columnGap : "",
        // height: height ? height : "auto",
        // margin: margin ? margin : 0,
      
       
        

        
      }

    return (
        <div style={StyledGrid}
           className="grid-templates" 
        >
            {children}
        </div>
    )
}

export default Grid;