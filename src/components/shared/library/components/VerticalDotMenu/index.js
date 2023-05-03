
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./vstyle.scss"
export const VerticalDotMenu = ({

  handleBlackListUser,
  index
}) => {
  const navigate = useNavigate();


function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}

  function showDropdown() {
   return  navigate("/user/"+ index)
  }
  useEffect(() => {
   

//    function myFunction(nodeReference){
//     var text = nodeReference.innerText || nodeReference.textContent;
//     console.log('The text is: ' + text);
//     navigate("./user/"+ index)
// }

// var body = document.body;

// body.addEventListener('click',function(e){
//     if (e.target.tagName.toLowerCase() == 'a'){
//         myFunction(e.target);
//     }
// }, false);


  }, []);
  return (
    <div className="ActionBtnStyled">
      <div className="headerx">
        <div className="dropdown">
          <ul
            className="dropbtn icons btn-right showLeft"
            // onClick={showDropdown}
          >
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div id={"myDropdown"+ index} className="dropdown-content">
            <a href={`./user/${index}`}  onClick={handleBlackListUser}>
              Blacklist User
            </a>
            <a href={`./user/${index}`} id={"myDropdownx"+ index} onclick="showDropdown()">
              View Detail
            </a>
          </div>
        </div>
      </div>
    </div>
  )}



  