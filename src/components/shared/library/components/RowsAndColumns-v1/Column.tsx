import React from "react";

const Col = ({ sm, lg, children, style={} }) => {
  let className = "";

  if (sm) {
    className += ` col-${sm}`;
  }

  if (lg) {
    className += ` lg-col-${lg}`;
  }

  return <div style={{...style}} className={className}>{children}</div>;
};

export default Col;
