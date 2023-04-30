import React from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowRight } from "../../components/basic/SvgPack";


interface SubRouteHeaderProps {
  links?: SubRouteLinks[];
  headerActions: React.ReactNode;
}

export type SubRouteLinks = {
  url: string;
  name: string;
};

function SubRouteHeader({ links, headerActions }: SubRouteHeaderProps) {
  const { id } = useParams();

  return (
    <div className="main-header__sub-route">
      <div>
        {links.map((link, idx) => {
          return (
            <span key={idx} className="main-header__sub-route-item">
              <Link to={link.url}>{link.name}</Link>
              {idx !== links.length - 1 && (
                <div className="main-header__sub-route-icon">
                  {/* <Icon
                    svg={ArrowRight}
                    size="sm"
                    viewBox="0 0 24 24"
                    height="2em"
                    style={{ display: "flex" }}
                    width="2em"
                  /> */}
                </div>
              )}
            </span>
          );
        })}
      </div>
      <div className="main-header__action-area">{headerActions}</div>
    </div>
  );
}

export default SubRouteHeader;
