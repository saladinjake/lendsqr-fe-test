export interface IGridProps {
  gridTemplateColumn?: string;
  gridTemplateRow?: string;
  gridGap?: string;
  gridRowGap?: string;
  gridColumnGap?: string;

  templateRow?: string;
  templateColumn?: string;
  gap?: string;
  columnGap?: string;
  rowGap?: string;
  height?: string;
  margin?: string;
  children?: React.ReactNode;
}

export interface IGridItemProps {
  gridColumn?: string;
  gridColumnStart?: string;
  gridColumnEnd?: string;
  gridRow?: string;
  gridRowStart?: string;
  gridRowEnd?: string;

  colStart?: number;
    rowStart?: number;
    colSpan?: number;
    rowSpan?: number;
    bg?: string;
    width?: string;
    height?: string;
    margin?: string;
    children?: React.ReactNode;
}
