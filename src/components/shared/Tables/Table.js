import React ,{ useMemo, useEffect } from "react";
import { useTable, useExpanded, useGlobalFilter , useFilters, useSortBy} from "react-table";
import "./Table.styles.scss";
import Skeleton from "components/shared/Skeleton";
import { TableContent } from "./TableContent";
import { Box } from "components/shared/library/components/Box-v1";



export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  // Use preFilteredRows to calculate the options
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  return (
    <select
      value={filterValue}
      onChange={(e) => {
        setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {options.map((option, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}






function Table(props) {
  const {
    tableData,
    tableColumns,
    isLoading,
    pageSize = 10,
    setInitialGlobalFilterFunction,
    selectedSortColumn,
    selectedSortOrder,
    
    showModalFilter,
    setShowModalFilter,
    setBoxPos
  } = props;

  const data = useMemo(
    () => (isLoading ? Array(pageSize).fill({}) : tableData),
    [isLoading, tableData]
  );

  const columns = useMemo(
    () =>
      isLoading
        ? tableColumns.map((column) => ({
            ...column,
            Cell: <Skeleton height="20px" />,
          }))
        : tableColumns,
    [isLoading, tableColumns]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    state,
    visibleColumns,
    prepareRow,
    setGlobalFilter,  
  } = useTable(
    {
      columns,
      data,
      
    },
    useFilters,
    useGlobalFilter,
    useSortBy
  );

  const { globalFilter } = state
  useEffect(() => {
    if(setInitialGlobalFilterFunction){
      setInitialGlobalFilterFunction((globalFilter)=> (globalFilter)=>setGlobalFilter(globalFilter))
    }
  }, [globalFilter]);

  return (
    <>
    <Box mb="5">
    
    </Box>
     <div className="TableStyle">
      <div className="table-content">
        <TableContent
          getTableProps={getTableProps}
          headerGroups={headerGroups}
          getTableBodyProps={getTableBodyProps}
          page={rows}
          prepareRow={prepareRow}
          selectedSortColumn={selectedSortColumn}
          selectedSortOrder={selectedSortOrder}
          showModalFilter={showModalFilter} 
          setShowModalFilter={setShowModalFilter}
          navLink={"./user-detail/"}
          setBoxPos={setBoxPos}
        />
      </div>
    </div>
  </>
    
  );
}

export default Table;
