import React from "react"
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../helpers/hooks/useAuth";


const TraditionalWesitesLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();

  // if (user) {
  //   return <Navigate to="/dashboard/profile" replace />;
  // }

  return (
    <div>
      {outlet}
    </div>
  );
};

export default TraditionalWesitesLayout
