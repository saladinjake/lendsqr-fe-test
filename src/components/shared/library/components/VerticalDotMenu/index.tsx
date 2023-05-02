import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./vstyle.scss"
export const VerticalDotMenu = ({
  handleDropdown,
  handleBlackListUser,
  handleViewDetail,
}) => {
  const navigate = useNavigate()

  function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  useEffect(() => {
    // Close the dropdown if the user clicks outside of it
    window.onclick = function (event) {
      if (!event.target.matches(".dropbtn")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
          }
        }
      }
    };
  }, []);
  return (
    <div className="ActionBtnStyled">
      <div className="headerx">
        <div className="dropdown">
          <ul
            className="dropbtn icons btn-right showLeft"
            onClick={showDropdown}
          >
            <li></li>
            <li></li>
            <li></li>
          </ul>
          <div id="myDropdown" className="dropdown-content">
            <a href="#home" onClick={handleBlackListUser}>
              Blacklist User
            </a>
            <a href="#about" onClick={() => navigate(`/manage-user/${handleViewDetail}`)}>
              View Detail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

