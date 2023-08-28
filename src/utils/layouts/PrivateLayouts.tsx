import React, { useEffect, useState } from "react";
import { Navigate, useNavigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import NavBar from "../../components/shared/NavBar";
import SideBar from "../../components/shared/Sidebar";
import {
  getAcessTokenFromStore,
  getIsAuthenticatedFromStore,
  getUserRolesFromStore,
} from "../../redux/reducers/auth.reducer";
import { RootState } from "../../redux/reducers";
import {  useDispatch, useSelector } from "react-redux";

const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  const [isOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate()

  const isAuthenticatedFromStore = useSelector((state: RootState) =>
  getIsAuthenticatedFromStore(state)
);
const isAuth = isAuthenticatedFromStore; //authContext.isAuth; //persistence
const getPersistenceUser = useSelector((state: RootState) =>
  getUserRolesFromStore(state)
);
const getPersistenceRoles = useSelector((state: RootState) =>
  getUserRolesFromStore(state)
);
const getPersistenceAcessTokenFromStore = useSelector((state: RootState) =>
  getAcessTokenFromStore(state)
);

useEffect(() =>{
  console.log(isAuth, ".....")
  if(!isAuth) navigate("/")
},[isAuthenticatedFromStore, isAuth])
  return (
    <div className="module-area">
      <div className="app-navigations">
        <NavBar setIsOpen={setMenuOpen} isOpen={isOpen} />
      </div>
      <div className="module-wrapper">
        <SideBar isOpen={isOpen} />
        <div className="module-widget-area">
          <div className="work-bench">{outlet}</div>
        </div>
      </div>
    </div>
  );
};
export default ProtectedLayout;
