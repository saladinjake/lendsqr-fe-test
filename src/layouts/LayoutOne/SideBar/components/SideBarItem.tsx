import { useNavigate } from "react-router-dom";
import { Box }  from "../../../../components/shared/library/components/Box-v1"

function SideBarItem(props) {
  const { name, link, isLoading, menuItem, Icon} = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(link);
  };

  if (isLoading) {
    return (
      <Box mb="5">
         Loading...
      </Box>
    );
  }

  return <div className="sidebar-item">
<Box onClick={handleClick} className={link=="dashboard"?"baseActive":""}>
    <span className="icon-set">{Icon}</span>
       {name}
    </Box>

  </div> ;
}

export default SideBarItem;
