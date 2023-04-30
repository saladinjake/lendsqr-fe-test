export default interface GridItemProps {
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