import { useReducer, createContext, useContext } from "react";
function AuthProvider(props) {
        const [state, dispatch] = useReducer(null, null);
    return <>{props.children}</>
}


export default AuthProvider