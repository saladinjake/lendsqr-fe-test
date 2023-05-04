import { Flex } from "components/shared/library/components/Flex-v1";
import { Box } from "components/shared/library/components/Box-v1";
import Button from "components/shared/library/components/Button-v1";
import Input from "components/shared/library/components/Input-v1/Input";
import { GridItem } from "components/shared/library/components/Grid";
import Select from "components/shared/library/components/Select/Select";
import DatePicker from "components/shared/library/components/DatePicker/DatePicker";
import { Text } from "components/shared/library/components/Text-v1";
import React, { useState } from "react";

import "./TableFilter.styles.scss";
import TableFilterProps from "./TableFilter.types";

const TableFilter: React.FC<TableFilterProps> = (props) => {
  const {
    onSort,
    onSortColumn,
    onSearch,
    children,
    filterColumns,
    setInitialGlobalFilterFunction,
    withSort = true,
    withFilter = true,
    withSearch = true,
    sortPlaceHolder = "Sort By",
    filterPlaceHolder = "Filter By",
    onResetSearch = () => {},
    values,
    handleChange,
    showModalFilter,
    setShowModalFilter,
    positionBox
  } = props;

  const [searchValue, setSearchValue] = useState("");



  return (
    <div className="TableFilter" style={{top: positionBox.top, position: "absolute", left: positionBox.left}}>
      {showModalFilter && (
        <div className="filters-dropdown-container filters">
            <PopUpBox 
          values 
          handleChange 
          filterColumns 
          onSortColumn
           onSort
           setShowModalFilter
           positionBox
           />
          

          {children && children}

        
        </div>
      )}
    </div>
  );
};

export default TableFilter;




const PopUpBox = ({values, handleChange, filterColumns, onSortColumn, onSort, setShowModalFilter,positionBox}) =>{
  return (
    <div >
    <Box mb="3"></Box>
          <Box mb="3">
            <Text>Organization</Text>
            <Box>
              <Select
                placeholder={"Select Organization"}
                width="150px"
                options={[{name:"test", id:"1"}]|| []}
                onGetSelectValue={(item) => {
                 
                }}
                hasShadow={false}
                label=""
              />
            </Box>
          </Box>

          <Box mb="3">
            <Text>User Name</Text>
            <Input
              label=""
              width="250px"
              isLoading={false}
              name="name"
              value={values?.firstName}
              onChangePure={handleChange}
              placeholder="Enter username"
            />
          </Box>

          <Box mb="3">
            <Text>Email</Text>
            <Input
              label=""
              width="250px"
              isLoading={false}
              name="name"
              value={values?.email}
              onChangePure={handleChange}
              placeholder="Enter email"
            />
          </Box>

          <Box mb="3">
            <Text>D.O.B</Text>
            <DatePicker
              label=""
              date={values?.dateOfBirth || ""}
              disabled={false}
              setDate={(value) =>
                handleChange({ target: { name: "dateOfBirth", value } })
              }
              width="250px"
            />
          </Box>

          <Box mb="3">
            <Text>Phone Number</Text>
            <Input
              width="250px"
              label=""
              isLoading={false}
              name="name"
              value={values?.phoneNumber}
              onChangePure={handleChange}
              placeholder="Enter Phone Number"
            />
          </Box>

          <Box mb="3">
            <Text>Status</Text>
            <Select
              label=""
              placeholder={"Select Status"}
              width="150px"
              options={[
                { name: "Active", id: "asc" },
                { name: "Blocked", id: "desc" },
              ]}
              onGetSelectValue={(item) => {
             
              }}
              hasShadow={false}
            />
          </Box>

          <Text></Text>
          <Text></Text>

         <div style={{marginLeft:"-10px"}}>
            <Flex height="100%" container ml="1"  >
              <div>
                <Button
                  color="secondary"
                  variant="outline"
                  width="115px"
                  onClick={() => setShowModalFilter(false)}
                >
                  Reset
                </Button>
              </div>

              <Box ml="4">
                <Button
                  color="primary"
                  variant="solid"
                  textColor="#fff"
                  type="submit"
                  width="115px"
                  loading={false}
                  onClick={() => {}}
                >
                  Filter
                </Button>
              </Box>
            </Flex>
            </div>
         
    </div>
  )
}
