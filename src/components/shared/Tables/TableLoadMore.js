import React from "react";
import Button from "../Button";
import { LoadMoreIcon } from "../../components/SvgPack";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #121212;
  padding: 40px 0;
  border: 1px solid #dee2e6;
  border-top: transparent;

  .text {
    font-style: normal;
    font-weight: 900;
    font-size: 20px;
    line-height: 25px;
    margin: 7px 0;
  }

  .sub-text {
    font-style: normal;
    font-weight: normal;
    padding: 0 10px;
    font-size: 15px;
    line-height: 20px;
  }

  .btn-container {
    margin: 20px 0;
  }
`;

function TableLoadMore({ requestURL }) {
  const handleClick = () => {
    if (requestURL) {
      requestURL();
    }
  };
  return (
    <Wrapper>
      <div>
        <LoadMoreIcon />
      </div>
      <p className="text">No results found</p>
      <p className="sub-text">
        We couldn’t find that record here. You can try <br /> again by clicking{" "}
        <strong>Load More</strong>
      </p>
      <div className="btn-container">
        <Button variant="secondary" onClick={handleClick}>
          Load More
        </Button>
      </div>
    </Wrapper>
  );
}

export default TableLoadMore;
