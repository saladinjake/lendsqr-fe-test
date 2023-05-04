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
  setShowModalFilter,
  navLink="./user-detail/",
  setBoxPos,
}) => {

  function getElementTopLeft(id) {

    var ele = document.getElementById(id);
    var top = 0;
    var left = 0;
   
    while(ele.tagName != "BODY") {
        top += ele.offsetTop;
        left += ele.offsetLeft;
        ele = ele.offsetParent;
    }


    setBoxPos({ top: (top- 430)+ "px", left: (left -300)+ "px" })
   
 
   
}

 
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
                  getElementTopLeft("tabledefined-index"+ index)
                 }} id={"tabledefined-index"+ index} {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span style={{marginLeft:"10px"}} onClick={()=>{
 getElementTopLeft("tabledefined-index"+ index)
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
              {row.cells.map((cell, index) => {
              
                const length = cell.row.cells.length 
                const lastCell = cell.row.cells[length -1]
                const actionID = lastCell.row.original.id;
                
                return <td style={{cursor:"pointer"}} onClick={() => window.location.href=  navLink+ actionID} {...cell.getCellProps()}>{cell.render("Cell")}</td>;
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
