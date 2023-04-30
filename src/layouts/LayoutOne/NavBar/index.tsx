import { useLocation, useNavigate } from "react-router-dom";

import{ Text } from "components/shared/library/components/Text-v1";
import  { Flex  } from "components/shared/library/components/Flex-v1";
import {Box } from "components/shared/library/components/Box-v1";
// import { useAuth } from "context/AuthContext";

import { Svg } from "assets/svg";
// import {  SearchField, Avatar } from "components/shared/library";
import { useEffect, useState } from "react";
// import { StyledAvatar } from "components/shared/library/components/Avatar/Avatar.styles";

const pageMap = {
  dashboard: "Dashboard",
  sample1: "sample1",
};

const NavBar = () => {
//   const { userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const splitLocationPathName = location.pathname.split("/");
  const [avatarProfile, setAvatarProfile] = useState("https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/725.jpg")

  useEffect(() =>{
    if(localStorage.getItem("avatar")){
      setAvatarProfile(localStorage.getItem("avatar"))
    }
  },[avatarProfile])

  return (
    <Flex container width="100%" margin="32px auto"
    justifyContent="between"
    style={{
      height:"90px",
      borderBottom: "1px solid #dbdce0",
      boxShadow:
        "box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;",
    }}>
         <Text style={{
            marginLeft:"30px"
         }}>Hello here</Text>
    <Flex height="100%" alignItems="center" container flex={12}>
       
        <div className="filter-global-search-container">
          <form
            onSubmit={(e) => {
             
            }}
          >
            {/* <SearchField
              withBtn
              placeholder="Search"
              btnText="Search"
              width="100%"
              height="48px"
              value={"sample"}
              searchColumns={[]}
              onChange={(e) => {
                
              }}
              onResetSearch={() =>{
                
              }}
            /> */}
            <input type="text" />
          </form>
        </div>
       
      </Flex>

     


     <Flex container  margin="0 0 0 16px"> 
      <Flex container justifyContent="space-between">
      <Box mr="15px" ml="15px">docs</Box>
        <Svg.NotificationBell />
      </Flex>
    
      <Flex container justifyContent="space-between">
      <Box mr="15px" ml="15px">docs</Box>
        <Svg.NotificationBell />
      </Flex>
     
   
    </Flex> 
  </Flex>
  );
};

export default NavBar;