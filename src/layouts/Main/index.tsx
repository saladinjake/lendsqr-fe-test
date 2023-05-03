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
  backArrow?: boolean
};

function Main({
  children,
  mainRoute,
  subRoute,
  links,
  subRouteLinks,
  headerActions,
  backArrow

}: MainProps) {
  return (
    <div className="StyledMain">
      { backArrow && (<div className="backText"> <span className="go-back"></span><p> Back to User</p></div>)}
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
