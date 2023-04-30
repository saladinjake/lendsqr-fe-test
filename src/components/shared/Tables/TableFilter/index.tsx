import { Flex} from "components/shared/library/components/Flex-v1";
import { Box } from "components/shared/library/components/Box-v1";
import   Button  from "components/shared/library/components/Button-v1"
import Input from "components/shared/library/components/Input-v1/Input";
import { GridItem } from "components/shared/library/components/Grid";
import Select from "components/shared/library/components/Select/Select";
import DatePicker from "components/shared/library/components/DatePicker/DatePicker";

import React, { useState } from "react";

import  "./TableFilter.styles.scss";
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
    setShowModalFilter
    
  } = props;

  const [searchValue, setSearchValue] = useState("");

  return (
     <div className="StyledTableFilter">
      {showModalFilter && (
      <div className="filters-dropdown-container filters">
        <Box mb="3"></Box>
      <Box mb="3">
          <Flex direction="column" alignItems="start" container>
             <Box ml="2" mb="4">Organization</Box>
              <Select
                placeholder={"Select Organization"}
                width="250px"
                options={filterColumns || []}
                onGetSelectValue={(item) => {
                  onSortColumn(item.id);
                }}
                hasShadow={false}
              />
           
          </Flex>
          </Box>

          <Box mb="3">
          <Flex direction="column" alignItems="start" container>

            <Input
              required
              width="250px"
              label="User Name"
              isLoading={false}
              name="name"
              value={values?.firstName}
              onChangePure={handleChange}
              placeholder="Enter username"
            />
          </Flex>
        </Box>

        <Box mb="3">
          <Flex direction="column" alignItems="start" container>
            <Input
              required
              width="250px"
              label="Email"
              isLoading={false}
              name="name"
              value={values?.email}
              onChangePure={handleChange}
              placeholder="Enter email"
            />
          </Flex>
        </Box>

        <Box mb="3">
          <Flex direction="column" alignItems="start" container>
        <DatePicker
          required
          label="D.O.B"
          date={values?.dateOfBirth || ""}
          disabled={false}
          setDate={(value) =>
            handleChange({ target: { name: "dateOfBirth", value } })
          }
          width="250px"
        />
          </Flex>
        </Box>




        <Box mb="3">
          <Flex direction="column" alignItems="start" container>
            <Input
              required
              width="250px"
              label="Phone Number"
              isLoading={false}
              name="name"
              value={values?.phoneNumber}
              onChangePure={handleChange}
              placeholder="Enter Phone Number"
            />
          </Flex>
        </Box>

        <Box mb="3">
          <Flex direction="column" alignItems="start" container>
          <Box ml="2" mb="4">Status</Box>
            <Select
              placeholder={"Select Status"}
              width="250px"
              options={[
                { name: "Active", id: "asc" },
                { name: "Blocked", id: "desc" },
              ]}
              onGetSelectValue={(item) => {
                onSort(item.id);
              }}
              hasShadow={false}
            />
          </Flex>
        </Box>

        <GridItem colSpan={2}>
          <Flex height="100%" container>
            <div>
              <Button
                color="secondary"
                variant="outline"
                width="115px"
                onClick={() =>   setShowModalFilter(false)}
              >
                Reset
              </Button>
            </div>

            <Box ml="4">
              <Button
                type="submit"
                width="115px"
                loading={false}
                onClick={() => {}}
              >
                Filter
              </Button>
            </Box>
          </Flex>
        </GridItem>

        

        {children && children}
      </div>
      )}
    </div>
  );
};

export default TableFilter;
