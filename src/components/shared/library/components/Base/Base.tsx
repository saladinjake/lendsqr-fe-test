
import manageBreakpoints from "../../utilities/manageBreakpoints";
import libraryConfig from "../../utilities/libraryConfig";
import IBaseProps from "./Base.types";
import { theme } from "../../../../../themes"

const { spacing, perimeters } = libraryConfig;


const BaseComponent = ({ m,
  children,
mt="0",
mb="0",
ml="0",
mr="0",
mx="0",
my="0",
p="0",
pt="0",
pb="0",
pl="0",
pr="0",
px="0",
py="0",
width="",
height="",
position="relative",
rounded="none",
shadow="",
border="",
cursor="pointer",
backgroundColor="",
color="",
opacity="",
top="",
borderWidth="",
borderColor="",
borderStyle="",
borderBottomColor="",
borderBottomStyle="",
zIndex="",
style={},
transition=""}: IBaseProps) => {
 


return <div >{children}</div>
}

export default BaseComponent