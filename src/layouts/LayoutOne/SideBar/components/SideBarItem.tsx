import { useNavigate, useParams } from "react-router-dom";
import { Box }  from "../../../../components/shared/library/components/Box-v1"

function SideBarItem(props) {
  const { name, link, isLoading, menuItem, Icon} = props;
  const navigate = useNavigate();
  const { id } = useParams()

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


function getCurrentRoute(url)
{
  const parts = url.split('/');
  return parts.at(-1);
}
const currentRoute = getCurrentRoute(window.location.href)


  const activeLinksDemo = [
  "localhost:3000",
  "user-detail",
  "https://victorjuwa-lendsqr-fe-test.vercel.app"
  ]

  const activeSect = activeLinksDemo.some(routes => routes.indexOf(currentRoute))
 const activated = ( name=="Users" || name=="User Detail") ? "activeSection" : ""
  return <div className={"sidebar-item "+ activated}>
<Box onClick={handleClick} className={link=="dashboard"?"baseActive":""}>
    <span className="icon-set">{Icon}</span>
       <span className="text">{name}</span>
    </Box>

  </div> ;
}

export default SideBarItem;
