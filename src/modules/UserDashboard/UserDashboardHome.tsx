import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Table } from "components/shared/Tables";

import TableFilter from "components/shared/Tables/TableFilter";
import Main from "layouts/Main";

import { Box } from "components/shared/library/components/Box-v1";
import { Flex  } from "components/shared/library/components/Flex-v1";
import { mainHeaderLink } from "./utilities/headerLinks";


import Indicator from "components/shared/Indicator";

import { Svg } from "assets/svg";

import { useQuery } from "@tanstack/react-query";
import useForm, { hasError } from "utils/hooks/useForm";
import { getAllUsers  } from "api/services/User";

// import { VerticalDotMenu } from "components/shared/library";
import validations  from "./validations"
import Pagination from "./components/Paginator";
import "./dashboard.styles.scss"



function Home() {
  const navigate = useNavigate();

  const defaultErrorTitle = "Sample text creation failed";
  const defaultErrorMessage =
    "Sample text failed due to invalid inputs or your internet connection may be unstable.";
  const defaultSuccessTitle = "Sample text created";
  const defaultSuccessMessage = "You have successfully created an Sample text.";
  const { id, type } = useParams();
  const [editable, setEditable] = useState(false);
  const [headerLinks, setHeaderLinks] = useState([]);
  const [showInformationModal, setShowInformationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorTitle, setErrorTitle] = useState(defaultErrorTitle);
  const [errorMessage, setErrorMessage] = useState(defaultErrorMessage);
  const [successTitle, setSuccessTitle] = useState(defaultSuccessTitle);
  const [successMessage, setSuccessMessage] = useState(defaultSuccessMessage);
  const { AllUsers, ActiveUsers, UserWithLoan, UserWithSavings } = Svg;

  const [initialValues, setInitialValues] = useState({
    allRecords: [],
    currentRecord: [],
    currentPage: null,
    totalPages: null
  });


  const onPageChanged = data => {
    const { allRecords } = initialValues;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentRecord = allRecords.slice(offset, offset + pageLimit);

    setInitialValues({ 
      ...initialValues,
      currentPage, 
      currentRecord, 
      totalPages
     });
  };

 

  const filterColumns = [
    { name: "sample", id: "name" },
    { name: "sample Code", id: "code" },
    { name: "Creation Date", id: "creationDate" },
  ];

  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortColumn, setSortColumn] = useState("creationDate");
  const [sortOrder, setSortOrder] = useState("desc");
  const [globalFilteration, setInitialGlobalFilterFunction] = useState(
    (value) => (value) => value
  );
  const [searchField, setSearchField] = useState("");

  const [showModalFilter, setShowModalFilter] = useState(false)
  const [allData,setAllData] = useState([])
  const [loadFromStore,setLoadFromStore] = useState(false)
  useEffect(()=>{
    if(localStorage.getItem("dataStored")){
      const prefetchedData = JSON.parse(localStorage.getItem("dataStored"))
      setAllData(prefetchedData)
      setLoadFromStore(true)
    }else{
      setLoadFromStore(false)
    }
  },[])

  const pageSizes = [1, 5, 10, 20, 50, 100];

  const getReadableDate = (utcDate:string | undefined):string => {
    if (!utcDate) {
      return 'Invalid Date'
    }
  
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric',
    minute: 'numeric',
    second: 'numeric' }
    // @ts-ignore
    return new Date(utcDate).toLocaleDateString(undefined, options)
  }
 
  

  const handlePageSize = ({ target }) => {
    setPageNumber(1);
    setPageSize(Number(target.value));
  };


  const { data: response, isLoading } = useQuery(
    ["", pageNumber, pageSize, sortColumn, sortOrder],
    () =>
    getAllUsers({
        pageSize,
        pageNumber,
        //sortColumn,
        //sortOrder,
      }),
      {
       //enabled:allData?.length>0,
        onSuccess: (data) =>{
          const profileData = data.map(user =>{
            return {
              ...user.profile,
              id: user?.id,
              email: user?.email,
              orgName: user?.orgName,
              phoneNumber: user?.phoneNumber,
              createdAt: user?.createdAt

            }
          })
          let prefetchedStore = localStorage.setItem("dataStored", JSON.stringify(profileData))

          const offset = (1 - 1) * 10;
          const currentRecord = profileData.slice(offset, offset + 10);

          setAllData(profileData)
          setLoadFromStore(true)
          setInitialValues({ 
            ...initialValues,
            allRecords: profileData,
            currentRecord
           });

        }
  });
  console.log(response)

  const Card = (props) => {
    return (
      <div className="basic-column w-col w-col-3 CardInfo">
        <div className="tag-wrapper">
          <div className="number-card number-card-content1">
            <props.Icon></props.Icon>
            <div className="number-card-dollars">{props?.title}</div>
            <h1 className="number-card-number">{props?.value}</h1>

            <div className="number-card-divider"></div>
          </div>
        </div>
      </div>
    );
  };

  const mockFunc = (id) => {
   return  navigate(`manage/${id}`)
  };

 

  const { values, handleChange, handleSubmit, invalid, errors, touched } =
    useForm({
      initialValues,
      validations,
      onSubmit() {
        setShowInformationModal(true);
      },
    });



  const columns = [
    {
      Header: "ORGANIZATION",
      accessor: "orgName",
    },
    {
      Header: "USERNAME",
      accessor: "firstName",
    },

    {
      Header: "EMAIL",
      accessor: "email",
    },
    {
      Header: "PHONE NUMBER",
      accessor: "phoneNumber",
    },
    {
      Header: "DATE JOINED",
      accessor: "createdAt",
      Cell:(data) =>{
        return getReadableDate(data?.value)
      }
    },

    {
      Header: "STATUS",
      accessor: "",
      Cell: (data) => {
        if (data.cell.row.original.isActive == true)
          return (
            <Indicator
              title="Active"
              indicatorClass="online-indicator"
              blinkClass="blink"
            />
          );
        else
          return (
            <Indicator
              title="Inactive"
              indicatorClass="offline-indicator"
              blinkClass="blink-deactivated"
            />
          );
      },
    },
    {
      Header: "Action",
      accessor: "id",
      Cell: (data) => {
      //  return <VerticalDotMenu
      //     handleBlackListUser={mockFunc}
      //     handleDropdown={mockFunc}
      //     handleViewDetail={data?.value}
      //   />
      }
    },
  ];

  const handleSort = (value: string) => {
    setSortOrder((val) => value);
  };

  const handleSortColumn = (value: string) => {
    const accessor = value;
    setSortColumn(accessor);
  };

  const handleSearch = (value: string) => {
    setSearchField(value);
  };

  return (
    <Main
      mainRoute
      links={mainHeaderLink}
      headerActions={
        <></>
      }
    >
      <div className="CardInfo">
        <div className="row w-row">
          <Card title="USERS" value="1200" Icon={AllUsers} />
          <Card title="ACTIVE USER" value="13000" Icon={ActiveUsers} />
          <Card title="USER WITH LOANS" value="13000" Icon={UserWithLoan} />
          <Card
            title="USER WITH SAVINGS"
            value="13000"
            Icon={UserWithSavings}
          />
        </div>
      </div>

      <Box mb="5">
        <TableFilter
          filterColumns={filterColumns}
          onSort={handleSort}
          onSortColumn={handleSortColumn}
          onSearch={handleSearch}
          setInitialGlobalFilterFunction={(val) => globalFilteration(val)}
          showModalFilter={showModalFilter} 
          setShowModalFilter={setShowModalFilter}
        />
      </Box>

      <Table
        tableColumns={columns}
        tableData={[...initialValues?.currentRecord]}
        isLoading={isLoading}
        pageSize={pageSize}
        gloBalFilter={searchField}
        setInitialGlobalFilterFunction={setInitialGlobalFilterFunction}
        selectedSortColumn={sortColumn}
        selectedSortOrder={sortOrder}
        values={values}
        handleChange={handleChange}
        errors={errors}
        touched={touched}
        hasError={hasError}
        showModalFilter={showModalFilter} 
          setShowModalFilter={setShowModalFilter}
      />

     

      <Flex justifyContent="between" alignItems="center" container>
      <Flex alignItems="center">
        <div className="PaginationText">Showing</div>{" "}
        <div className="PaginationDropdown" onChange={handlePageSize}>
          {pageSizes.map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </div>
        < div className="PaginationText">results per page</div>
      </Flex>
      <Box mt="10">
      <Pagination
          totalRecords={100}
          pageLimit={10}
          pageNeighbours={1}
          onPageChanged={onPageChanged}
        />
      </Box>
     </Flex>
      <Box mt="10" mb="20"></Box>
    </Main>
  );
}

export default Home;



