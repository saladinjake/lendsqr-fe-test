import "./sidebar.styles.scss";

import { useState, useRef, useMemo } from "react";
import { Svg } from "../../../assets/svg";
import { Box } from "../../../components/shared/library/components/Box-v1";
import { Flex } from "../../../components/shared/library/components/Flex-v1";
import SideBarItem from "./components/SideBarItem";
import SideBarGroup from "./components/SideBarGroup/SideBarGroup";
import { useQuery } from "@tanstack/react-query";
import Logo from "../../../assets/img/svg/logo.svg";
type SideBarProps = {
  width?: string;
  toggleSideBar?: (val: boolean) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
};

const queryKeys = {
  getSiteMap: "get_site_map",
};

function Sidebar({
  width,
  toggleSideBar,
  sidebarOpen,
  setSidebarOpen,
}: SideBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const refSideBar = useRef<HTMLDivElement>();

  const {
    Briefcase,
    Dashboard,
    Decision,
    Guarantor,
    Loan,
    Savings,
    Users,
    LoanRequest,
    Whitelist,
    Karma,
    FeeNPricing,
    FeeNCharge,
    Pref,
    Reports,
    SavingsProduct,
    ServiceACC,
    Services,
    Settlement,
    Transaction,
    Logout,
  } = Svg;

  const Menus = [
    {
      name: "Account Management",
      icon: <Users />,
      link: "/account-management-settings",
    },

    {
      name: "Blogs Management",
      icon: <Loan />,
      link: "/dashboard",
    },
    {
      name: "Certificates Management",
      icon: <Decision />,
      link: "/dashboard",
    },
    {
      name: "Course Bundle Management",
      icon: <Savings />,
      link: "/dashboard",
    },

    {
      name: "Course Information Management",
      icon: <LoanRequest />,
      link: "/dashboard",
    },

    {
      name: "Course Authoring Management",
      icon: <Whitelist />,
      link: "/dashboard",
    },

    {
      name: "Document Upload Management",
      icon: <Karma />,
      link: "/dashboard",
    },

    {
      name: "Programme Management",
      icon: <Karma />,
      link: "/dashboard",
    },

    {
      name: "Events Sheduler Management",
      icon: <Savings />,
      link: "/dashboard",
    },

    {
      name: "HR Analytics Management",
      icon: <Savings />,
      link: "/dashboard",
    },

    {
      name: "Todo Manager",
      icon: <Savings />,
      link: "/dashboard",
    },

    {
      name: "Notification Management",
      icon: <ServiceACC />,
    },
  ];

  const MenuBack = [
    {
      name: "Change  Organization Profile",
      icon: <Briefcase />,
      link: "/dashboard",
    },
    {
      name: "Business Organization Management",
      icon: <Guarantor />,
      link: "/dashboard",
    },
    {
      name: "Earnings Management",
      icon: <Savings />,
      link: "/dashboard",
    },
    {
      name: "Learners Management",
      icon: <FeeNCharge />,
      link: "/dashboard",
    },
    {
      name: "Instructors Management",
      icon: <FeeNCharge />,
      link: "/dashboard",
    },
    {
      name: "Issues Tracking Management",
      icon: <Transaction />,
    },

    {
      name: "JobPostings Management",
      icon: <Services />,
    },

    {
      name: "Reports",
      icon: <Reports />,
    },
  ];

  const settingMaps = [
    {
      name: "Prefrence",
      icon: <Pref />,
    },
    {
      name: "Fees And Pricing",
      icon: <FeeNPricing />,
    },
    {
      name: "Roles And Previledges",
      icon: <Users />,
    },

    {
      name: "Tenant Service Account",
      icon: <ServiceACC />,
    },
  ];

  const office = useMemo(
    () =>
      Menus?.filter((menu) =>
        menu.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  const business = useMemo(
    () =>
      MenuBack?.filter((menu) =>
        menu.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  const settings = useMemo(
    () =>
      settingMaps?.filter((menu) =>
        menu.name.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
  );

  const handleSearch = (value) => setSearchValue(value);

  const dashboardMenuItem = {
    ID: "0",
    Name: "Dashboard",
    SubMenus: [],
  };

  const Organizations = () => {
    return (
      <div className="dropdown-form">
        <Briefcase />
        <select name="hockeyList">
          <option>Switch Organization</option>
          <option value="a">kUDA ACADEMY</option>
        </select>
      </div>
    );
  };

  return (
    <div className="sidebar-menu">
      <Box
        borderBottomColor="#DBDCE0"
        borderWidth="1px"
        borderBottomStyle="solid"
        backgroundColor={"#f3f4f9"}
        zIndex="10"
        position="sticky"
        top="0px"
      >
        <Box height={sidebarOpen ? "90px" : "110px"} width="90%" mx="auto">
          <Flex
            justifyContent={sidebarOpen ? "between" : "center"}
            gap="10px"
            alignItems="center"
            direction={sidebarOpen ? "row" : "column"}
            height="100%"
            container
          >
            {sidebarOpen ? (
              <>
               <img src={Logo} />

                
              </>
            ) : (
              <>
                  <img src={Logo} />
              </>
            )}

            <div>
              <Flex
                container
                as="button"
                justifyContent="center"
                alignItems="center"
                backgroundColor="transparent"
                borderStyle="none"
                cursor="pointer"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={
                  sidebarOpen
                    ? { transition: "0.4s" }
                    : {
                        transform: "rotate(180deg)",
                        transition: "0.4s",
                        background: "#dedfeb",
                        height: 35,
                        width: 35,
                        borderRadius: "50%",
                        marginTop: 10,
                      }
                }
              >
                <Svg.Hamburger />
              </Flex>
            </div>
          </Flex>
        </Box>
      </Box>
      <div className="wrapperSidebar">
        <Box width="90%" mx="auto">
          <Box mt="5" mb="4">
            <Organizations />
          </Box>

          <Box mt="5" mb="4">
            <SideBarItem
              name="Dashboard"
              link="/dashboard"
              Icon={<Dashboard />}
              menuItem={dashboardMenuItem}
            />
          </Box>

          <Box mb="1">
            <SideBarGroup
              name="CUSTOMERS"
              menuItems={office}
              searchQuery={searchValue}
              isLoading={false}
            />
          </Box>

          <Box mb="1">
            <SideBarGroup
              name="BUSINESS"
              menuItems={business}
              searchQuery={searchValue}
              isLoading={false}
            />
          </Box>

          <Box mb="1">
            <SideBarGroup
              name="SETTINGS"
              menuItems={settings}
              searchQuery={searchValue}
              isLoading={false}
            />
          </Box>

          <hr />
          <Box mt="5" mb="4">
            <SideBarItem
              name="Logout"
              link="/login"
              Icon={<Logout />}
              menuItem={dashboardMenuItem}
            />
          </Box>

          <Box mt="5" mb="4">
            <SideBarItem
              name="V.1.20"
              link="/login"
              menuItem={dashboardMenuItem}
            />
          </Box>
        </Box>
      </div>
    </div>
  );
}

export default Sidebar;
