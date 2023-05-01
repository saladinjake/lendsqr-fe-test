
export function isAuthenticatedByRoles(role, roles=[]){
    const hasRole = roles.every(role => role?.name == role);
   
    if(hasRole){
      return true
    }else{
      return false
    }
  }