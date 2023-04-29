import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Row from "components/shared/library/components/Grids/Row";
import Col from "components/shared/library/components/Grids/Column";
import { useState, useRef, useEffect } from "react";


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


  return (
    <Row>
      <Row>
        <NavBar />
      </Row>

      <Col sm={3} lg={3}>
      <div
          className="sidebar-overlay"
          onClick={() => handleSidebarToggle(false)}
        ></div>
        <SideBar   
          width={sidebarOpen ? "330px" : "60px"}
          setSidebarOpen={handleSidebarToggle}
          sidebarOpen={sidebarOpen}
        />
      </Col>

      <Col sm={9} lg={9}>
        {children}
      </Col>
    </Row>
  );
};

export default Layout;
