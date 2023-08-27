import React, { createContext, useReducer } from "react";
import  ProductReducer  from "../redux/reducers/courses.reducer";



export const ProductsContext = createContext();

const OnlineCoursesContextProvider = ({ children }) => {
  const courses = [] //get all products from api
  const [state] = useReducer(ProductReducer, courses);

  return (
    <ProductsContext.Provider value={[...state]}>
      {children}
    </ProductsContext.Provider>
  );
};

export default OnlineCoursesContextProvider;
