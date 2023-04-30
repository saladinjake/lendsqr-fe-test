import React from "react";

import {
  useState
} from "react"
import {
 IoMdFunnel
} from "react-icons/io"
import {
  Box 
} from "components/shared/library/components/Box-v1"


export const TableContent = ({
  getTableProps,
  headerGroups,
  getTableBodyProps,
  page,
  prepareRow,
  selectedSortColumn,
  selectedSortOrder,
  showModalFilter = false,
  setShowModalFilter
}) => {

 
  return (
    <>
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => {
              return (
                
                 <th onClick={()=>{
                  setShowModalFilter(val=>!val)
                 }} id={"tabledefined-index"+ index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span style={{marginLeft:"10px"}} onClick={()=>{
                  setShowModalFilter(val=>!val)
                 }}>{column.isSorted? (column.isSortedDesc? <IoMdFunnel/>: <IoMdFunnel/>): <IoMdFunnel/>}</span>
              </th>
              
             
             
            )})}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {page.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
     
    </table>
      {page.length<=0 &&(
            <div>
               <div className="StyledeNotification">
                 Enter a search value and hit the search button.
               </div> 
            </div>
          ) 
        }
    </>
  );
};
