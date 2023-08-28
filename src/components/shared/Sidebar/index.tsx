import React from "react";
import { Link } from "react-router-dom";
import { siteMaps } from "./links";
import { useLocation, useNavigate } from "react-router-dom";
import { currentRouteActivated } from "../../../utils";
interface Props {
  isOpen: boolean;
}

const SideBar: React.FC<Props> = ({ isOpen }) => {
  const location: any = useLocation();
  const pathname: string = location?.pathname;
  const navigate: any = useNavigate();

  return (
    <div className={`side-bar ${isOpen && "enabled"}`}>
      <div className="branding">
        <img src="/images/logo.svg" alt="logo" className="logo" />
      </div>
      <div className="sitemaps-wrapper">
        <ul className="side-bar-navigation-menu">
          {siteMaps.map((item: any, index: number) => {
            return (
              <div key={item.id}>
                {!item.header ? (
                  <Link to={`${item.link}`}>
                    <li
                      className={`menu-item ${
                        currentRouteActivated(item.link, pathname) && "active"
                      }`}
                    >
                      {!item.header && <img src={item.icon} alt={item.title} />}
                      <span>{item.title}</span>
                      {item.id === 1 && (
                        <span>
                          <img src="/images/icons/down-arrow.svg" alt="" />
                        </span>
                      )}
                    </li>
                  </Link>
                ) : (
                  <li className="link-description">
                    <span>{item.title}</span>
                  </li>
                )}
              </div>
            );
          })}
        </ul>

        <div className="cta-revoke" onClick={() => navigate("/")}>
          <div>
            <img src="/images/icons/logout-icon.svg" alt="logout icon" />
            <span>Logout</span>
          </div>

          <span className="info-app">v1.2.0</span>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
