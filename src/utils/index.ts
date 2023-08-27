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