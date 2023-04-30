import React from "react";

const Col = ({ sm, lg, children }) => {
  let className = "";

  if (sm) {
    className += ` col-${sm}`;
  }

  if (lg) {
    className += ` lg-col-${lg}`;
  }

  return <div className={className}>{children}</div>;
};

export default Col;
