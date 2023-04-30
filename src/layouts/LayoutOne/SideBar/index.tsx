import "./sidebar.styles.scss";

import { useState, useRef, useMemo } from "react";
import { Svg } from "../../../assets/svg";
import { Box } from "../../../components/shared/library/components/Box-v1";
import { Flex } from "../../../components/shared/library/components/Flex-v1";
import SideBarItem from "./components/SideBarItem";
import SideBarGroup from "./components/SideBarGroup/SideBarGroup";
import { useQuery } from "@tanstack/react-query";

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
                <Svg.SampleLogo />

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.0"
                  width="150.000000pt"
                  height="20.000000pt"
                  viewBox="0 0 300.000000 44.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,44.000000) scale(0.100000,-0.100000)"
                    fill="#40196D"
                    stroke="none"
                  >
                    <path d="M58 402 c-32 -1 -58 -7 -58 -12 0 -6 5 -10 10 -10 6 0 10 -23 10 -51 0 -31 -4 -48 -10 -44 -6 4 -10 -17 -10 -54 0 -34 4 -61 10 -61 6 0 10 -20 10 -45 0 -25 -4 -45 -10 -45 -5 0 -10 -4 -10 -9 0 -12 132 -20 147 -9 8 6 25 5 47 -3 27 -10 41 -10 61 -1 49 23 45 52 -20 127 -19 22 -35 42 -35 45 0 3 16 23 35 45 52 60 62 91 39 116 -18 20 -32 21 -109 8 -5 -1 -19 0 -30 2 -11 3 -46 3 -77 1z m12 -29 c-1 -5 -7 -35 -15 -68 -14 -57 -13 -88 1 -49 31 85 54 124 73 124 12 0 21 -2 21 -5 0 -3 -14 -33 -31 -66 -17 -34 -28 -63 -26 -65 2 -3 28 27 58 66 47 62 57 70 86 70 18 0 33 -3 33 -6 0 -4 -27 -37 -61 -75 l-61 -69 30 -37 c17 -21 44 -51 61 -67 39 -38 39 -46 -2 -46 -29 0 -40 9 -87 65 -29 36 -54 64 -56 62 -2 -2 9 -28 26 -58 35 -64 36 -69 9 -69 -15 0 -28 16 -51 65 -17 37 -32 64 -34 63 -2 -2 3 -28 11 -58 18 -68 18 -70 1 -70 -9 0 -17 16 -21 42 -3 24 -11 56 -17 72 -8 20 -8 37 -1 60 6 17 14 52 18 79 4 31 11 47 21 47 8 0 14 -3 14 -7z" />
                    <path d="M350 390 c-11 -11 -20 -30 -21 -42 0 -13 -1 -74 -1 -136 -1 -105 0 -114 22 -137 26 -28 56 -31 84 -10 16 12 23 12 49 -1 19 -10 41 -14 61 -9 17 3 42 6 56 5 14 -1 61 -1 105 0 96 1 121 1 205 -3 36 -1 79 3 96 9 23 9 35 9 43 1 5 -5 47 -11 93 -12 74 -1 85 1 106 22 28 28 35 29 72 2 24 -18 41 -22 102 -20 41 1 82 8 93 15 18 12 25 12 46 0 29 -16 103 -18 131 -3 14 8 27 8 47 -1 15 -6 36 -11 47 -11 91 0 130 4 142 13 10 9 22 9 45 0 46 -16 167 -14 195 4 20 13 25 13 44 -1 24 -16 114 -21 137 -6 7 5 25 4 42 -2 24 -9 36 -8 64 7 33 18 36 18 53 3 25 -23 58 -21 79 2 16 20 17 20 41 0 14 -10 36 -19 49 -19 18 0 24 -4 19 -15 -8 -21 3 -45 20 -45 12 0 12 4 4 20 -9 17 -6 21 25 34 22 9 35 22 35 33 0 18 -62 168 -74 180 -14 14 -4 23 27 23 31 0 34 -3 57 -65 13 -35 26 -62 29 -59 3 3 15 31 27 62 19 51 24 57 52 60 18 2 32 2 32 0 0 -2 -23 -55 -51 -118 -52 -119 -70 -147 -104 -161 -16 -6 -14 -8 12 -8 28 -1 37 6 60 42 37 56 43 59 65 31 14 -17 29 -24 54 -24 l34 0 0 65 c0 69 -2 72 -62 66 -22 -3 -22 2 -4 54 13 35 12 42 -1 57 -26 29 -68 23 -94 -13 -21 -30 -23 -31 -35 -13 -7 11 -18 25 -24 31 -9 11 -63 15 -155 12 -16 -1 -43 -1 -60 -1 -101 3 -170 0 -186 -9 -14 -7 -27 -5 -49 6 -32 17 -92 12 -118 -8 -17 -14 -32 7 -32 45 0 32 -24 58 -53 58 -32 0 -47 -13 -56 -46 -6 -23 -15 -30 -46 -36 -21 -5 -44 -13 -52 -19 -9 -8 -21 -8 -40 -1 -47 18 -135 21 -179 6 -36 -12 -45 -12 -73 2 -35 18 -90 13 -125 -12 -17 -12 -22 -12 -36 1 -10 9 -43 15 -96 17 -66 2 -85 -1 -107 -18 -14 -10 -27 -23 -27 -28 0 -6 -15 5 -33 22 -33 32 -36 33 -125 34 -89 1 -92 2 -92 25 0 27 -33 63 -58 63 -26 0 -60 -27 -77 -61 -10 -18 -23 -29 -36 -29 -11 0 -29 -5 -41 -11 -14 -8 -28 -7 -50 2 -26 11 -35 10 -64 -6 -32 -17 -35 -17 -52 -2 -15 14 -35 16 -110 13 l-92 -4 0 29 c0 36 -31 69 -65 69 -14 0 -34 -9 -45 -20z m78 -102 l-6 -93 42 48 c33 38 47 47 74 47 17 0 32 -3 32 -7 0 -4 -19 -26 -42 -50 l-41 -42 47 -56 48 -55 -39 0 c-33 0 -43 6 -73 45 -19 24 -39 44 -43 45 -5 0 -5 -20 -1 -45 l6 -45 -33 0 -34 0 0 150 0 150 34 0 34 0 -5 -92z m582 -53 l0 -145 -30 0 c-16 0 -30 4 -30 9 0 5 -13 3 -29 -5 -55 -27 -107 4 -118 69 -7 46 2 82 27 107 24 24 77 26 102 3 17 -15 18 -14 18 45 l0 62 30 0 30 0 0 -145z m1150 -5 l0 -150 -30 0 c-20 0 -30 5 -30 16 0 14 -2 14 -22 0 -50 -35 -110 -10 -129 53 -29 96 56 177 129 125 l23 -16 -7 61 -7 61 37 0 36 0 0 -150z m-1510 -15 c0 -61 3 -77 16 -82 35 -13 49 11 52 86 l3 71 29 0 30 0 0 -100 0 -100 -31 0 c-17 0 -28 4 -24 10 9 14 -2 12 -29 -5 -29 -20 -71 -11 -91 18 -10 15 -15 47 -15 99 l0 78 30 0 30 0 0 -75z m512 58 c17 -15 18 -15 18 0 0 12 9 17 28 17 l27 0 0 -100 0 -100 -33 0 c-20 0 -31 4 -27 10 9 14 -2 12 -29 -5 -55 -36 -116 15 -116 97 0 39 5 54 25 73 29 29 79 33 107 8z m266 1 c20 -14 22 -14 22 0 0 11 9 16 28 16 l27 0 0 -105 0 -106 -30 3 c-19 2 -29 8 -27 16 2 10 -3 10 -20 -2 -32 -23 -73 -20 -105 8 -25 21 -28 31 -28 81 0 50 3 60 28 81 32 28 73 31 105 8z m257 6 c22 -8 24 -13 15 -29 -8 -16 -17 -19 -45 -14 -44 7 -65 -10 -65 -52 0 -42 21 -59 65 -52 28 5 37 2 45 -14 9 -16 7 -21 -15 -29 -84 -32 -155 12 -155 95 0 83 71 127 155 95z m163 -6 c20 -14 22 -14 22 0 0 11 9 16 28 16 l27 0 -2 -102 -2 -103 -31 -3 c-17 -2 -30 1 -30 8 0 7 -6 8 -19 0 -35 -18 -71 -11 -102 19 -24 24 -29 38 -29 76 0 38 5 52 29 76 33 33 74 38 109 13z m487 -6 c16 -14 28 -38 32 -61 l6 -38 -69 2 c-54 1 -68 -1 -66 -12 6 -24 25 -30 73 -25 41 4 48 2 52 -15 7 -27 -33 -42 -93 -36 -60 7 -90 41 -90 103 0 88 92 136 155 82z m105 6 c0 -14 2 -14 22 0 29 21 67 20 90 -1 17 -15 19 -15 36 0 10 10 33 17 50 17 48 0 62 -29 62 -127 l0 -83 -30 0 -29 0 -3 78 c-3 75 -4 77 -28 77 -24 0 -25 -2 -28 -77 l-3 -78 -34 0 -35 0 0 80 c0 78 -1 80 -24 80 -30 0 -36 -16 -36 -96 l0 -64 -30 0 -30 0 0 89 c0 49 -3 96 -6 105 -5 13 1 16 25 16 21 0 31 -5 31 -16z m-765 -89 c0 -22 -31 -33 -47 -17 -17 17 -1 44 24 40 15 -2 23 -10 23 -23z m1315 -71 c0 -34 -1 -35 -32 -32 -29 3 -33 7 -34 36 -2 30 0 32 32 32 32 0 34 -2 34 -36z" />
                    <path d="M876 234 c-19 -18 -21 -75 -4 -92 7 -7 22 -12 35 -12 44 0 59 77 21 104 -28 20 -33 20 -52 0z" />
                    <path d="M2009 213 c-6 -15 -6 -36 -1 -52 7 -21 15 -26 42 -26 28 0 35 5 43 28 14 43 -5 77 -43 77 -24 0 -33 -6 -41 -27z" />
                    <path d="M1109 240 c-25 -15 -32 -58 -14 -86 30 -47 75 -24 75 38 0 27 -5 40 -19 48 -23 12 -22 12 -42 0z" />
                    <path d="M1360 214 c-7 -16 -7 -37 -2 -53 7 -21 15 -26 42 -26 27 0 35 5 40 25 12 46 -2 75 -38 78 -27 3 -34 -1 -42 -24z" />
                    <path d="M1778 215 c-24 -53 26 -109 68 -75 17 15 19 71 2 88 -21 21 -57 14 -70 -13z" />
                    <path d="M2252 238 c-28 -28 4 -41 66 -29 1 1 -2 10 -8 21 -12 22 -40 26 -58 8z" />
                  </g>
                </svg>
              </>
            ) : (
              <>
                <Svg.SampleLogo />{" "}
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
