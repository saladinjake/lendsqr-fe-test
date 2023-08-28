import StatisticsWidget from "./components/cardWidget";
import { TablePaginator, Table } from "./components/table";
import { useState, useEffect } from "react";
import Loader from "../../components/basic/Loader";

import axios from "axios";
const DasboardManagement = () => {
  const perPage = 9;
  const [loading, setLoading] = useState<Boolean>(true);
  const [totalRecords, setAllRecords] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [offset, setItemOffset] = useState(0);
  const loadUsers = async () => {
    setLoading(true);
    await axios
      .get(`https://run.mocky.io/v3/663b6779-31a8-4e8c-aa84-2074c908c393`)
      .then((response) => {
        console.log(response, ">>>>");
        setAllRecords(response?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        const err = error.response.data;
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    loadUsers();
  }, []);

  useEffect(() => {
    const endOffset = offset + perPage;
    setCurrentItems(totalRecords?.slice(offset, endOffset));
    setPageCount(Math.ceil(totalRecords?.length / perPage));
  }, [totalRecords, offset, perPage]);

  const handleChange = (event: any) => {
    const pageOffset = (event?.selected * perPage) % totalRecords?.length;
    setItemOffset(pageOffset);
  };

  return (
    <>
      <div className="dashboard-module">
        <StatisticsWidget />

        {loading ? <Loader width={30} /> :
         <Table allRecords={currentItems} loading={loading} />
        }

       

        <TablePaginator
          offset={offset}
          perPage={perPage}
          totalRecord={totalRecords?.length}
          pageCount={pageCount}
          handleChange={handleChange}
        />
      </div>
    </>
  );
};
export default DasboardManagement;
