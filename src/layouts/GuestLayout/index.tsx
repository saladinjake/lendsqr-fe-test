
import NavBar from "layouts/LayoutOne/NavBar";
import Row from "components/shared/library/components/RowsAndColumns-v1/Row";
import Col from "components/shared/library/components/RowsAndColumns-v1/Column";
import { useState, useRef, useEffect } from "react";
import "../LayoutOne/layout.styles.scss";



const Layout = ({ children }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const mainSectionRef = useRef();
  const sidebarState = JSON.parse(
    localStorage.getItem("sidebarOpen") ?? "true"
  );
  const [sidebarOpen, setSidebarOpen] = useState(sidebarState);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const persistSidebarStateToLocalStorage = (isOpen: boolean) => {
    if (!localStorage.getItem("sidebarOpen")) {
      localStorage.setItem("sidebarOpen", JSON.stringify(true));
    }

    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  };

  // Function to handle sidebarToggle and persist to localStorage
  const handleSidebarToggle = (isOpen: boolean) => {
    setSidebarOpen(isOpen);
    persistSidebarStateToLocalStorage(isOpen);
  };

  // Function to handle page resize
  const handleResize = (evt: UIEvent) => {
    if (window.innerWidth <= 1100) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  };

  // Close the sidebar if open on ESC key press
  const handleESCKeypress = (evt: KeyboardEvent) => {
    if (evt.keyCode === 27 && sidebarOpen) {
      handleSidebarToggle(false);
    }
  };

  useEffect(() => {
    // Add event listeners for resize and keydown events
    window.addEventListener("resize", handleResize, { passive: false });
    window.addEventListener("keydown", handleESCKeypress, { passive: false });

    // Check for small device and close sidebar
    if (window.innerWidth <= 1100) {
      setSidebarOpen(false);
    }

    // Remove event listeners when done
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleESCKeypress);
    };
  }, []);

  const gridStyle = {
    gridTemplateColumns: sidebarOpen ? "330px 1fr" : "60px 1fr",

    "@media screen and (max-width: 1100px)": {
      gridTemplateColumns: sidebarOpen ? "1fr" : "60px 1fr",

    
    },
  };

  return (
    <Row>
      <Row>
     
        <NavBar />
     
      </Row>
    
      
   

      <Col sm={12} lg={12}>
        {children}
      </Col>
    </Row>
  );
};

export default Layout;
