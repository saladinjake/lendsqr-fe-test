import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const GuestWesitesLayout = () => {
 
  const outlet = useOutlet();

  return <div>{outlet}</div>;
};

export default GuestWesitesLayout;
