

 const Indicator = ({
     title, 
     indicatorClass="online-indicator", 
     blinkClass="blink", 
     onClicker=null
}) =>{  
   
  return(
    <div className="IndicatorComponent">
        <div className={indicatorClass}>
            <span className={blinkClass}></span>
        </div>
        {onClicker ? <h2 onClick={onClicker} className="online-text">{title}</h2>: <h2  className="online-text">{title}</h2>}
    </div>

  )
}

export default Indicator

