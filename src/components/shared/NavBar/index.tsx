import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const TopNav: FC<Props> = ({ setIsOpen, isOpen }) => {
  return (
    <div>
      <div className="nav-bar-left" data-testid="nav-responsive">
        <img src="/images/logo.svg" alt="logo" className="logo" data-testid="logo-responsive" />
        <div className="search-input-widget-area ">
          <input type="search" placeholder="Search for anything" data-testid="search-responsive" />
          <button>
            <img
              src="/images/icons/search-icon.svg"
              alt="search-icon-missing"
            />
          </button>
        </div>
        <div className="nav-bar-right">
          <Link to="#">Docs</Link>
          <img src="/images/icons/bell-icon.svg" alt="notification-bell" />
          <div className="nav-bar-profile">
            <img src="/images/avatar.svg" alt="avatar" className="avatar" />
            <p>Adedeji</p>
            <img
              src="/images/icons/dropdown-icon.svg"
              alt="Avatar"
              className="avatar-dropdown"
            />
          </div>
        </div>
        <div onClick={() => setIsOpen(!isOpen)} className="menu-icon">
          <img
            src={`/images/icons/${isOpen ? "close-icon" : "menu"}.svg`}
            alt="menu icon"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
