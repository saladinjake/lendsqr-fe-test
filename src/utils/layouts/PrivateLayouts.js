import React from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../helpers/hooks/useAuth";


const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
     
      {outlet}
    </div>
  );
};
export default ProtectedLayout