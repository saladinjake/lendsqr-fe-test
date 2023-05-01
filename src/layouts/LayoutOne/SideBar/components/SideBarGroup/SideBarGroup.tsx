import { useState, useRef } from "react";

import { Svg } from "assets/svg";
import SideBarItem from "../SideBarItem";
import useContainerDimensions from "../../../../../utils/hooks/useContainerDimensions";
import  { Text  } from "../../../../../components/shared/library/components/Text-v1";
import { Box } from "../../../../../components/shared/library/components/Box-v1";
import { Flex } from "../../../../../components/shared/library/components/Flex-v1"

function constructNavUrl(navName: string): string {
  const navNameWithoutSpace = navName.toLowerCase().replaceAll(" ", "-");
  return `/${navNameWithoutSpace}`;
}


interface IBtnContentProps {
    onClick : () => void, 
    children: any
   
   
}
const Button  = ({ onClick, children}) =>{
    return <div style={{
        display: "flex",
        backgroundColor: "transparent",
        border: "none",
        cursor: "pointer"
    }} onClick={onClick}>{children}</div>
}


interface IBtnContentProps {
    flip : boolean, 
    children: any,
   // onClick : () => void, 
   
}
const ButtonContentWrapper = ({flip, children, onClick }: IBtnContentProps) =>{
    return <div style={{
        display: "inline-block",
        transition: "0.4s",
        transform: flip ? "rotateX(-180deg)" : ""
    }} onClick={() => console.log()}>{children}</div>
}

interface IContainerProps {
    showMenu : boolean, 
    listHeight: string,
    children: any
}

const Container = ({showMenu, listHeight, children}: IContainerProps) => <div style={{
    height: showMenu ? `${listHeight}px` : "0px",
    transition: "0.5s",
    overflow: "hidden"
}}>{children}</div>





function SideBarGroup(props) {
  const { menuItems, name = "Front", searchQuery, isLoading } = props;

  const menuItemsContainerRef = useRef();
  const { height } = useContainerDimensions(menuItemsContainerRef, [
    searchQuery,
    isLoading,
  ]);
  const [showMenu, setShowMenu] = useState(true);

  return (
    <Box>
      <Flex
        style={{ paddingLeft: 12 }}
        alignItems="center"
        justifyContent="between"
        container
      >
        <Text
          fontSize="10px"
          color={showMenu ? "#545F7D" : "#545F7D"}
          fontWeight="100"
          style={{
            marginLeft: "25px"
          }}

        >
          {name}
        </Text>

      </Flex>

      {isLoading &&
        Array(8)
          .fill({})
          .map((_, i) => {
            return <SideBarItem key={i} isLoading={isLoading} />;
          })}

{!isLoading && (
        <>
          
            {menuItems.map((menuItem, i) => {
              const navElementName = menuItem["name"];
              return (
                <SideBarItem
                  key={i}
                  name={navElementName}
                  index={i}
                  Icon={menuItem?.icon}
                  menuItem={menuItem}
                  link={menuItem["link"] || constructNavUrl(navElementName)}
                />
              );
            })}
    
        </>
      )}
    </Box>
  );
}

export default SideBarGroup;