
import React from "react"
 const Indicator = ({
     title, 
     indicatorClass="online-indicator", 
     bgColor="",
     onClicker=1
}) =>{  
    
   
  return(
    <div className={"IndicatorComponent"}>
        <div className={indicatorClass} style={{background: bgColor}}>
           <h2 className="online-text">{title}</h2>
        </div>
        
    </div>

  )
}

const MemoizedComponent = React.memo(Indicator);
export default MemoizedComponent



