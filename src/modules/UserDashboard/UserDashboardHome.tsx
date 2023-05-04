import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBoxes from "./components/LoadingBoxes";
import { Table } from "../../components/shared/Tables";

import TableFilter from "../../components/shared/Tables/TableFilter";
import Main from "../../layouts/Main";

import { Box } from "../../components/shared/library/components/Box-v1";
import { Flex } from "../../components/shared/library/components/Flex-v1";
import { mainHeaderLink } from "./utilities/headerLinks";

import Indicator from "../../components/shared/Indicator";

import { Svg } from "../../assets/svg";

import { useQuery } from "@tanstack/react-query";
import useForm, { hasError } from "utils/hooks/useForm";
import { getAllUsers } from "../../api/services/User";

import { VerticalDotMenu } from "../../components/shared/library/components/VerticalDotMenu";
import validations from "./validations";

import "./dashboard.styles.scss";

import Pagination from "./components/Paginator";
import Button from "../../components/shared/library/components/Button-v1/Button";

function Home() {
  const navigate = useNavigate();

  const { AllUsers, ActiveUsers, UserWithLoan, UserWithSavings } = Svg;

  const [initialValues, setInitialValues] = useState({
    allRecords: [],
    currentRecord: [],
    currentPage: null,
    totalPages: null,
  });

  const onPageChanged = (data) => {
    const { allRecords } = initialValues;
    const { currentPage, totalPages, pageLimit } = data;

    const offset = (currentPage - 1) * pageLimit;
    const currentRecord = allRecords.slice(offset, offset + pageLimit);

    setInitialValues({
      ...initialValues,
      currentPage,
      currentRecord,
      totalPages,
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

  const [filterPos, setFilterPos] = useState({ position:"absolute",top:0,left:0})

  const [showModalFilter, setShowModalFilter] = useState(false);
  const [allData, setAllData] = useState([]);
  const [loadFromStore, setLoadFromStore] = useState(false);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("dataStored")) {
      const prefetchedData = JSON.parse(localStorage.getItem("dataStored"));

      setAllData(prefetchedData);
      setLoadFromStore(true);
    } else {
      setLoadFromStore(false);
    }
  }, [allData]);

  const pageSizes = [1, 5, 10, 20, 50, 100];

  const getReadableDate = (utcDate: string | undefined): string => {
    if (!utcDate) {
      return "Invalid Date";
    }

    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    // @ts-ignore
    return new Date(utcDate).toLocaleDateString(undefined, options);
  };

  const handlePageSize = ({ target }) => {
    setPageNumber(1);
    console.log(target.value);
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
      onSuccess: (data) => {
        const profileData = data.map((user) => {
          return {
            ...user.profile,
            id: user?.id,
            email: user?.email,
            orgName: user?.orgName,
            phoneNumber: user?.phoneNumber,
            createdAt: user?.createdAt,
          };
        });
        setTotal(profileData?.length);
        let prefetchedStore = localStorage.setItem(
          "dataStored",
          JSON.stringify(profileData)
        );

        const offset = (1 - 1) * 10;
        const currentRecord = profileData.slice(offset, offset + 10);

        setAllData(profileData);
        setLoadFromStore(true);
        setInitialValues({
          ...initialValues,
          allRecords: profileData,
          currentRecord,
        });
      },
    }
  );

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

  const goTo = (id) => {
    return navigate(`/users/${id}`);
  };

  const { values, handleChange, handleSubmit, invalid, errors, touched } =
    useForm({
      initialValues,
      validations,
      onSubmit() {},
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
      Cell: (data) => {
        return getReadableDate(data?.value);
      },
    },

    {
      Header: "STATUS",
      accessor: "status",
      Cell: (data) => {
   
        if(data.cell.row.original.id% 2== 0 ){
          return (
            <Indicator
              title="Active"
              indicatorClass="online-indicator"
              onClicker={1}
            />
          );

        }else if(data.cell.row.original.id% 3== 0 ){

           return (
            <Indicator
              title="Inactive"
              indicatorClass="offline-indicator"
              onClicker={1}
            />
          );

        }else if(data.cell.row.original.id% 5== 0 ){
          return (
            <Indicator
              title="Pending"
              indicatorClass="dormant-indicator"
              onClicker={1}
            />
          );
        }else{
           return (
            <Indicator
              title="Blaclisted"
              indicatorClass="inactive-indicator"
              onClicker={1}
            />
          )
        }
     
          
       
      },
    },

   

    {
      Header: "Action",
      accessor: "id",
      Cell: (data) => {
        
         return <VerticalDotMenu
            handleBlackListUser={goTo}
            index={data?.value}
          />
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
    <Main mainRoute links={mainHeaderLink} headerActions={<></>}>
      <div className="dashboardSample">
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
            positionBox={filterPos}
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
          setBoxPos={setFilterPos}
        />

        <Flex
          justifyContent="space-between"
          alignItems="center"
          container
          margin="40px 0 0 0"
        >
          <Flex alignItems="center" container margin="70px 40px 0 0">
            <div className="PaginationText">Showing</div>{" "}
            <select className="PaginationDropdown" onChange={handlePageSize}>
              {pageSizes.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
            <div className="PaginationText">results per page</div>
          </Flex>
          <Box mt="10">
            <Flex alignItems="center" container margin="100px 5px 0 0">
              <Pagination
                totalRecords={100}
                pageLimit={10}
                pageNeighbours={pageNumber}
                onPageChanged={onPageChanged}
              />
            </Flex>
          </Box>
        </Flex>
      </div>

      <Box mt="10" mb="20"></Box>
    </Main>
  );
}

export default Home;
