import StatisticsWidget from "./components/cardWidget"
import { TablePaginator } from "./components/table"
const DasboardManagement = () => {
  const handleChange = (eve: any) =>{

  }
  return (
  <>
     <div className="dashboard-module">
        <StatisticsWidget />

        <TablePaginator  
          offset={1}
          perPage={10}
          totalRecord={200}
          pageCount={1}
          handleChange={handleChange}
        />
     </div>
 </>
)
}
export default DasboardManagement