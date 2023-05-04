import React from "react";
import  "./Loader.styles.scss";

const Loader = ({ variant }) => {
  return (
    <div className="StyledLoader">
      <div className="spinner-wrap">
        <span className="spinner"></span>
      </div>
    </div>
  );
};



export default Loader;
