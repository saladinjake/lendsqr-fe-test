export function isAuthenticatedByRoles(role:  any, roles: any[]){
    const hasRole = roles.every(role => role?.name == role);
   
    if(hasRole){
      return true
    }else{
      return false
    }
  }
  
  export const appendCurrency =(value: string) => value
  
  export const formatNumber = (value: string) => value

  export const currentRouteActivated = (route: string, pathname: string) => {
    if (pathname === "/dashboard" && route === "/dashboard") {
      return true;
    }
    const path = route.split("/")[2];
    return Boolean(pathname.includes(path));
  };