import React from "react";
import "./Typography.styles.scss";


const Heading: React.FC<any> = ({ text }) => {
  return( 
      <div className="StyledText">
        <h1 className="heading">{text}</h1>
      </div>
  );
}

export default Heading;