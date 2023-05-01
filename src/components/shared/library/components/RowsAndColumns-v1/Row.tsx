import React from "react";


const Row = ({ children, style={} }) => {
  return <div  style={{...style}} className="row">{children}</div>;
};

export default Row;
