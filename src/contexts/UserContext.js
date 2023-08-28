import React, { createContext, useReducer } from "react";
import  UserReducer  from "../redux/reducers/courses.reducer";



export const ProductsContext = createContext();

const OnlineCoursesContextProvider = ({ children }) => {
  const courses = [] //get all products from api
  const [state] = useReducer(UserReducer, courses);

  return (
    <ProductsContext.Provider value={[...state]}>
      {children}
    </ProductsContext.Provider>
  );
};

export default OnlineCoursesContextProvider;
