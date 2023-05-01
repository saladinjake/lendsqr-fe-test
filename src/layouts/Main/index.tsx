import React from "react";
import  "./Main.styles.scss";
import MainRouteHeader from "./MainRouteHeader";
import SubRouteHeader, { SubRouteLinks } from "./SubRouteHeader";

type MainProps = {
  children: React.ReactNode;
  mainRoute?: boolean;
  subRoute?: boolean;
  links?: {
    url: string;
    name: string;
  };
  subRouteLinks?: SubRouteLinks[];
  headerActions?: any;
};

function Main({
  children,
  mainRoute,
  subRoute,
  links,
  subRouteLinks,
  headerActions,
}: MainProps) {
  return (
    <div className="StyledMain">
      <div className="main-header">
        {mainRoute && (
          <MainRouteHeader links={links} headerActions={headerActions} />
        )}
        {subRoute && ( 
          <SubRouteHeader links={subRouteLinks} headerActions={headerActions} />
        )}
      </div>
      
      <div className="main-body">{children}</div>
    </div>
  );
}

export default Main;
