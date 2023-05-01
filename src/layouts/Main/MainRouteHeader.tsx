import React from "react";
import { Link } from "react-router-dom";

type MainRouteHeaderProps = {
  links?: {
    url: string;
    name: string;
  };
  headerActions: any;
};

function MainRouteHeader({ links, headerActions }: MainRouteHeaderProps) {
  return (
    <div className="main-header__main-route">
      <Link to={links.url}>{links.name}</Link>
      <div className="main-header__action-area">{headerActions}</div>
    </div>
  );
}

export default MainRouteHeader;
