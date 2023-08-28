import React, { useState } from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "../../components/shared/NavBar";

const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  const [isOpen, setMenuOpen] = useState(false);

  // if (!user) {
  //   return <Navigate to="/" replace />;
  // }

  return (
    <div className="module-area">
      <div className="app-navigations">
        <NavBar setIsOpen={setMenuOpen} isMenuOpen={isOpen} />
      </div>
      <div className="module-wrapper">
        <>side bar here</>
        <div className="module-widget-area">
          <div className="work-bench">{outlet}</div>
        </div>
      </div>
    </div>
  );
};
export default ProtectedLayout;
