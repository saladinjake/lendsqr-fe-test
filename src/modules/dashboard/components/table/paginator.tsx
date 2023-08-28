import React from "react";
import ReactPaginate from "react-paginate";
interface IPaginate {
  offset: number;
  perPage: number;
  totalRecord: number;
  pageCount: number;
  handleChange: (event: any) => void;
}
const TablePaginator = ({
  offset,
  perPage,
  totalRecord,
  pageCount,
  handleChange,
}: IPaginate) => {
  return (
    <div className="pagination-widget">
      <div className="pagination-info">
        <p>
          Showing{" "}
          <span>
            {offset + perPage}{" "}
            <img src="/images/icons/down-arrow.svg" alt="down arrow" />
          </span>{" "}
          out of {totalRecord}
        </p>
      </div>
      <ReactPaginate
        containerClassName="pagination-wrapper"
        activeClassName="active"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="arrow"
        nextClassName="arrow"
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handleChange}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
       
      />
    </div>
  );
};

export default TablePaginator;
