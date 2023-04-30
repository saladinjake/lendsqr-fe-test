import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "context/AuthContext";
import LoadingBoxes from "../components/LoadingBoxes";

import Main from "layouts/Main";
import HeaderActions from "../components/HeaderActions";
import { Svg } from "assets/svg";



import { Flex} from "components/shared/library/components/Flex-v1";
import { Box } from "components/shared/library/components/Box-v1";
import   Button  from "components/shared/library/components/Button-v1"
import Input from "components/shared/library/components/Input-v1/Input";
import { GridItem } from "components/shared/library/components/Grid";
import {
  Grid
} from "components/shared/library/components/Grid";
import Select from "components/shared/library/components/Select/Select";
import DatePicker from "components/shared/library/components/DatePicker/DatePicker";
import Avatar from "components/shared/library/components/Avatar-v1/Avatar";
import { Heading } from "components/shared/library/components/Typography";
import {
  createLinks,
  manageLinks,
} from "modules/UserDashboard/utilities/headerLinks";

import { getUserById } from "api/services/User";

const queryKeys = {
  getById: "user",
};

function UserDetail() {
  const defaultErrorTitle = "sAMPLE creation failed";
  const defaultErrorMessage =
    "Sample creation failed due to invalid inputs or your internet connection may be unstable.";
  const defaultSuccessTitle = "Sample created";
  const defaultSuccessMessage = "You have successfully created a new sample";
  const { id } = useParams();
  const [editable, setEditable] = useState(false);
  const [headerLinks, setHeaderLinks] = useState([]);
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState(defaultErrorTitle);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const [successTitle, setSuccessTitle] = useState(defaultSuccessTitle);
  const [successMessage, setSuccessMessage] = useState(defaultSuccessMessage);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const { user } = useContext(AuthContext);

  const [initialValues, setInitialValues] = useState({
    code: "",
    name: "",
    isHeadOffice: false,
    regionID: "",
    address: "",
    branchStatus: 0,
    isActive: false,
  });

  useEffect(() => {
    if (id === "create") {
      setEditable(true);
      setHeaderLinks(createLinks);
    } else {
      setHeaderLinks(manageLinks(id));
    }
  }, [id]);

  const navigate = useNavigate();

  const {
    data: results,
    isFetching,
    isLoading,
  } = useQuery([queryKeys.getById, id], () => getUserById(id), {
    enabled: id !== "create",
    onSuccess({ data: response }) {
      setInitialValues((initialValues) => ({
        ...initialValues,
      }));
    },
  });

  console.log(results);

  const tabs = [
    { id: 1, name: "General Detail", type: "1" },
    { id: 2, name: "Documents", type: "2" },

    { id: 3, name: "BanK Details", type: "3" },
    { id: 4, name: "Loans", type: "4" },
    { id: 5, name: "Savings", type: "5" },

    { id: 6, name: "App And System", type: "6" },
  ];

  const [currentTab, setCurrentTab] = useState(1);

  if (isLoading) {
    return <LoadingBoxes />;
  }

  return (
    <Main
      subRoute
      subRouteLinks={headerLinks}
      headerActions={
        <HeaderActions
          isActive={initialValues.isActive}
          setEditable={setEditable}
          handleStatusUpdate={() => setShowAlertModal(true)}
        />
      }
    >
      <div className="StyledInformationModal">
        <Grid templateColumn="repeat(4,1fr)" gap="32px 49px">
          <GridItem>
            <Flex
            container
              direction="row"
              alignItems="start"
              style={{
                borderRight: "1px solid #545F7D",
                height: "50px",
              }}
            >
              <Avatar
                shape="rounded"
                type="text"
                src={results?.profile?.avatar}
              />
              <Box ml="3">
                <div className="DetailLabel">
                  {results?.profile?.firstName +
                    " " +
                    results?.profile?.lastName}
                </div>
                <div className="DetailValue">{results?.accountNumber}</div>
              </Box>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex
              direction="column"
              alignItems="start"
              style={{
                borderRight: "1px solid #545F7D",
                height: "50px",
              }}
            >
              <div className="DetailLabel">User's tier</div>
              <div className="DetailValue">
                <Svg.TiersStar />
                <Svg.TiersStar />
                <Svg.TiersStar />
              </div>
            </Flex>
          </GridItem>

          <GridItem>
            <Flex
              direction="column"
              alignItems="start"
              style={{
                height: "50px",
              }}
            >
              <div className="DetailLabel">N{results?.accountBalance}</div>
              <div className="DetailValue">{"9912345678/Providus Bank"}</div>
            </Flex>
          </GridItem>
        </Grid>
        <div className="Wrapper" >
          <div className="TabContainer">
            {tabs.map((tab) => (
              <div className="Tab"
                // as="button"
                // active={tab.id === currentTab}
                // cursor="pointer"
                // alignItems="center"
                // position="relative"
                // justifyContent="center"
                // onClick={() => setCurrentTab(tab.id)}
              >
                <div className="TabText">{tab.name}</div>

                {tab.id === currentTab && <div  className="Line" />}
              </div>
            ))}
          </div>
        </div>
      </div>

       <div className="StyledInformationModal">
        {currentTab === 1 && (
          <Grid templateColumn="repeat(4,1fr)" gap="32px 49px">
            <GridItem colSpan={5}>
              <Flex justifyContent="start">
                <Heading text="Personal Information" />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">FULL NAME</div>
                <div className="DetailValue">
                  {results?.profile?.firstName +
                    " " +
                    results?.profile?.lastName}
                </div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">PHONE NUMBER</div>
                <div className="DetailValue">{results?.profile?.phoneNumber}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">EMAIL ADDRESS</div>
                <div className="DetailValue">{results?.email}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">BVN</div>
                <div className="DetailValue">{results?.profile?.bvn}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">GENDER</div>
                <div className="DetailValue">{results?.profile?.gender}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">MARITAL STATUS</div>
                <div className="DetailValue">{"N/A"}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">CHILDREN</div>
                <div className="DetailValue">{"N/A"}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">TYPE OF RESIDENCE</div>
                <div className="DetailValue">{"N/A"}</div>
              </Flex>
            </GridItem>

            <GridItem colSpan={5}>
              <Flex justifyContent="start">
                <Heading text="Education And Employment" />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">LEVEL OF EDUCATION</div>
                <div className="DetailValue">{results?.education?.level}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">EMPLOYMENT STATUS</div>
                <div className="DetailValue">
                  {results?.education?.employmentStatus}
                </div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">SECTOR OF EMPLOYMENT</div>
                <div className="DetailValue">{results?.education?.sector}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">DURATION OF EMPLOYMENT</div>
                <div className="DetailValue">{results?.education?.duration}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">OFFICIAL EMAIL</div>
                <div className="DetailValue">{results?.education?.officeEmail}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">MONTHLY INCOME</div>
                <div className="DetailValue">
                  {Array.isArray(results?.education?.monthlyIncome)
                    ? results?.education?.monthlyIncome[0]
                    : "N/A"}
                </div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">LOAN REPAYMENT</div>
                <div className="DetailValue">{results?.education?.loanRepayment}</div>
              </Flex>
            </GridItem>

            <GridItem colSpan={5}>
              <Flex justifyContent="start">
                <Heading text="Socials" />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">TWITTER</div>
                <div className="DetailValue">{results?.socials?.twitter}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">FACEBOOK</div>
                <div className="DetailValue">{results?.socials?.facebook}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">INSTAGRAM</div>
                <div className="DetailValue">{results?.socials?.instagram}</div>
              </Flex>
            </GridItem>

            <GridItem colSpan={5}>
              <Flex justifyContent="start">
                <Heading text="Guarantors" />
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">FULL NAME</div>
                <div className="DetailValue">
                  {results?.guarantor?.firstName +
                    " " +
                    results?.guarantor?.lastName}
                </div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">PHONE NUMBER</div>
                <div className="DetailValue">{results?.guarantor?.phoneNumber}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">EMAIL ADDRESS</div>
                <div className="DetailValue">{results?.guarantor?.email || "N/A"}</div>
              </Flex>
            </GridItem>

            <GridItem>
              <Flex direction="column" alignItems="start">
                <div className="DetailLabel">RELATIONSHIP</div>
                <div className="DetailValue">{"N/A"}</div>
              </Flex>
            </GridItem>
            <hr />
          </Grid>
        )}

        {currentTab === 2 && <>Hire me</>}
        {currentTab === 3 && <>Hire me</>}
      </div> 
    </Main>
  );
}

export default UserDetail;


