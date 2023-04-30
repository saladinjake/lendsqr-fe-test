import { useLocation, useNavigate } from "react-router-dom";

import { Text } from "components/shared/library/components/Text-v1";
import { Flex } from "components/shared/library/components/Flex-v1";
import { Box } from "components/shared/library/components/Box-v1";
// import { useAuth } from "context/AuthContext";

import { Svg } from "assets/svg";

import { useEffect, useState } from "react";
import  Avatar from "components/shared/library/components/Avatar-v1"
import Logo from "../../../assets/img/svg/logo.svg";
import SearchField from "components/shared/library/components/SearchField-v1";
import "./nav.styles.scss";
const pageMap = {
  dashboard: "Dashboard",
  sample1: "sample1",
};

const NavBar = () => {
  //   const { userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const splitLocationPathName = location.pathname.split("/");
  const [avatarProfile, setAvatarProfile] = useState(
    "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg"
  );

  useEffect(() => {
    if (localStorage.getItem("avatar")) {
      setAvatarProfile(localStorage.getItem("avatar"));
    }
  }, [avatarProfile]);

  return (
    <Flex
      container
      width="100%"
      justifyContent="between"
      style={{
        height: "90px",
        borderBottom: "1px solid #dbdce0",
        boxShadow:
          "box-shadow: 3px 0px 20px rgba(0, 0, 0, 0.04)",
      }}
    >
      <img src={Logo} className="imgLogo" />

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
              placeholder="Search"
              btnText="Search"
              width="100%"
              height="48px"
              value={"sample"}
              searchColumns={[]}
              onChange={(e) => {}}
              onResetSearch={() => {}}
            />
          </form>
        </div>
      </Flex>

      <Flex container margin="0 10px 0 36px" >
        <Flex container justifyContent="space-between">
          <Box marginRight="15px" marginLeft="15px">
            docs
          </Box>
          <Svg.NotificationBell />
          <Avatar shape="rounded" type="text" src={avatarProfile} />
          <Box mr="5">Adedeji</Box>
        </Flex>

      
      </Flex>
    </Flex>
  );
};

export default NavBar;
