import React from "react";
import "./Typography.styles.scss";


const Heading: React.FC<any> = ({ text, className }) => {
  return( 
      <div className="StyledText">
        <h1 className={className? className: "heading"}>{text}</h1>
      </div>
  );
}

export default Heading;