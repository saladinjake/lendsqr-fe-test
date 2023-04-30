
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
transition=""}: IBaseProps) => {
  const Styled = {
    marginTop : manageBreakpoints("margin-top", mt || my || m, theme, spacing),
    marginBottom : manageBreakpoints("margin-bottom", mb || my || m, theme, spacing),
    marginLeft : manageBreakpoints("margin-left", ml || mx || m, theme, spacing),
    marginRight : manageBreakpoints("margin-right", mr || mx || m, theme, spacing),
   paddingTop: manageBreakpoints("padding-top", pt || py || p, theme, spacing),
    paddingBottom: manageBreakpoints("padding-bottom", pb || py || p, theme, spacing),
   paddingLeft:  manageBreakpoints("padding-left", pl || px || p, theme, spacing),
   paddingRight:  manageBreakpoints("padding-right", pr || px || p, theme, spacing),
   width:manageBreakpoints("width", width, theme, perimeters),
   height: manageBreakpoints("height", height, theme),
   position: manageBreakpoints("position", position, theme),
   rounded:  manageBreakpoints("border-radius", rounded, theme, libraryConfig.rounds),
   cursor : manageBreakpoints("cursor", cursor, theme),
   backgroundColor :
   manageBreakpoints(
     "background-color",
     backgroundColor,
     theme,
     libraryConfig.colors
   ),
   color : manageBreakpoints("color", color, theme, libraryConfig.colors),
   border: border && border,
   borderWidth : manageBreakpoints("border-width", borderWidth, theme),
   borderColor : manageBreakpoints("border-color", borderColor, theme),
   borderStyle : manageBreakpoints("border-style", borderStyle, theme),
   borderBottomColor :
   manageBreakpoints("border-bottom-color", borderBottomColor, theme),
   top: top ,
 
   borderBottomStyle :
   manageBreakpoints("border-bottom-style", borderBottomStyle, theme),

   opacity:  manageBreakpoints("opacity", opacity, theme),

   zIndex : manageBreakpoints("z-index", zIndex, theme),

   transition : manageBreakpoints("transition", transition, theme),
  

}
console.log(Styled)


return <div >{children}</div>
}

export default BaseComponent