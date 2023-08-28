import React , { useState }from "react";
import { Navigate, useOutlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";



const ProtectedLayout = () => {
  const { user } = useAuth();
  const outlet = useOutlet();
  const [isOpen, setMenuOpen] = useState(false);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="module-area">
       <>Nav bar here</>
			<div className='module-wrapper'>
				<>side bar here</>
				<div className="module-widget-area">
					<div className='work-bench'>
          {outlet}
					</div>
				</div>
			</div>
		</div>
  )


};
export default ProtectedLayout;





