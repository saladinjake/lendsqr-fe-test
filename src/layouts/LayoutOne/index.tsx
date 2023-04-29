import SideBar from "./SideBar";
import NavBar from "./NavBar";
import Row from "components/shared/library/components/Grids/Row";
import Col from "components/shared/library/components/Grids/Column";

const Layout = ({ children }) => {
  return (
    <Row>
      <Row>
        <NavBar />
      </Row>

      <Col sm={3} lg={3}>
        <SideBar />
      </Col>

     

      <Col sm={9} lg={9}>
      {children}
      </Col>
      </Row>
  );
};

export default Layout;
