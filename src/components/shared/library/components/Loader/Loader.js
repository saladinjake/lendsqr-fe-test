import React from "react";
import  "./Loader.styles.scss";
import PropTypes from "prop-types";

const Loader = ({ variant }) => {
  return (
    <div classNmae="StyledLoader" >
      <div className="spinner-wrap">
        <span className="spinner"></span>
      </div>
    </div>
  );
};

Loader.propTypes = {
  variant: PropTypes.string,
  spinning: PropTypes.bool,
  speed: PropTypes.string,
};

Loader.defaultProps = {
  variant: "white",
  spinning: true,
};

export default Loader;
