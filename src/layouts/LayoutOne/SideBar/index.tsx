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
      name: "Users",
      icon: <Users />,
      link:"/dashboard"
    },
    {
      name: "Guarantors",
      icon: <Guarantor />,
      link:"/dashboard"
    },
    {
      name: "Loans",
      icon: <Loan />,
      link:"/dashboard"
    },
    {
      name: "Decision Model",
      icon: <Decision />,
      link:"/dashboard"
    },
    {
      name: "Savings",
      icon: <Savings />,
      link:"/dashboard"
    },

    {
      name: "Loans Request",
      icon: <LoanRequest />,
      link:"/dashboard"
    },

    {
      name: "WhiteList",
      icon: <Whitelist />,
      link:"/dashboard"
    },

    {
      name: "Karma",
      icon: <Karma />,
      link:"/dashboard"
    },
  ];

  const MenuBack = [
    {
      name: "Organization",
      icon: <Briefcase/>,
      link:"/dashboard"
    },
    {
      name: "Loan Products",
      icon: <Loan />,
      link:"/dashboard"
    },
    {
      name: "Savings Product",
      icon: <Savings/>,
      link:"/dashboard"
    },
    {
      name: "Fees And Charges",
      icon: <FeeNCharge/>,
      link:"/dashboard"
    },
    {
      name: "Transactions",
      icon: <Transaction />,
    },

    {
      name: "Services",
      icon: <Services />,
    },

    {
      name: "Service Account",
      icon: <ServiceACC/>,
    },

    {
      name: "Settlements",
      icon: <Settlement />,
    },

    {
      name: "Reports",
      icon: <Reports />,
    },
  ];

  const settingMaps = [
    {
      name: "Prefrences",
      icon: <Pref/>,
    },
    {
      name: "Fees And Pricing",
      icon: <FeeNPricing />,
    },
    {
      name: "Audit Logs",
      icon: <Users />,
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
          <option value="a"></option>
        </select>
      </div>
    );
  };

  return (
    <div className="sidebar-menu">
   
      <div className="wrapperSidebar">
        <Box width="100%" mx="auto">
          <Box marginTop="5px" marginBottom="4px">
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
