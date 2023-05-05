import { useLocation, useNavigate } from "react-router-dom";

import { Text } from "components/shared/library/components/Text-v1";
import { Flex } from "components/shared/library/components/Flex-v1";
import { Box } from "components/shared/library/components/Box-v1";
// import { useAuth } from "context/AuthContext";

import { Svg } from "assets/svg";

import { useEffect, useState, useContext } from "react";
import Avatar from "components/shared/library/components/Avatar-v1";
import Logo from "../../../assets/img/svg/logo.svg";
import SearchField from "components/shared/library/components/SearchField-v1";
import Col from "components/shared/library/components/RowsAndColumns-v1/Column";
import Row from "components/shared/library/components/RowsAndColumns-v1/Row";
import "./nav.styles.scss";
import { AuthContext } from "context/AuthContext";
import { getToken } from "utils/tokenConfig";

import {
  getUserFromStore,
  getAcessTokenFromStore,
  getIsAuthenticatedFromStore,
  getUserRolesFromStore,
} from "reducers/authReducer";
import { RootState } from "reducers";
import { useSelector } from "react-redux";

const pageMap = {
  dashboard: "Dashboard",
  sample1: "sample1",
};

const NavBar = () => {
  //   const { userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const context = useContext(AuthContext);

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

  const splitLocationPathName = location.pathname.split("/");
  const [avatarProfile, setAvatarProfile] = useState(
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg"
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (localStorage.getItem("avatar")) {
      setAvatarProfile(localStorage.getItem("avatar"));
    }
  }, [avatarProfile]);

  const handleChange = ({ target }) => setSearchQuery(target?.value);

  return (
    <Row>
      <div className="nav-bar">
        <Flex
          container
          width="100%"
          justifyContent="between"
          padding="20px"
          backgroundColor="#fff"
          marginTop="20px"
          marginLeft="20px"
          className="flex-classic"
          style={{
            height: "120px",
            backgroundColor: "#fff",
            boxShadow: "box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.04)",
          }}
        >
          <img src={Logo} className="imgLogo" />

          {isAuth && (
            <>
              <div className="searchBar">
                <Flex
                  height="100%"
                  alignItems="center"
                  container
                  flex={4}
                  margin="0 100px 0px 506px"
                >
                  <div className="filter-global-search-container">
                    <form onSubmit={(e) => {}}>
                      <SearchField
                        withBtn
                        placeholder="Search for anything"
                        btnText="Search"
                        width="100%"
                        height="48px"
                        value={searchQuery}
                        searchColumns={[]}
                        onChange={handleChange}
                        onResetSearch={() => {}}
                      />
                    </form>
                  </div>
                </Flex>
              </div>


              <div className="userInform">
                
                <Flex
                container
                alignItems="center"
                margin="0 30px 0px 90px"
                className="user-action-notifier"
              >
                <Flex container justifyContent="space-between">
                  <Box
                    marginRight="25px"
                    marginLeft="25px"
                    underline
                    color={"#213F7D"}
                  >
                    Docs
                  </Box>
                  <Box marginRight="25px" marginLeft="25px" color={"#213F7D"}>
                    {" "}
                    <Svg.NotificationBell />
                  </Box>
                  <Box marginRight="25px" marginLeft="25px">
                    <Avatar shape="rounded" type="text" src={avatarProfile} />
                  </Box>
                  <Box mr="5" color={"#213F7D"}>
                    <a
                      href="#anyId"
                      className="drop-toggle collapsed"
                      data-toggle="collapse"
                    >
                      Adedeji
                    </a>{" "}
                    <div id="anyId" className=" collapse">
                      Hi
                    </div>
                  </Box>
                </Flex>
              </Flex>
              </div>

              
            </>
          )}
        </Flex>
      </div>
    </Row>
  );
};

export default NavBar;
