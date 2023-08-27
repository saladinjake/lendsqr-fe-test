import moment from "moment";
import sha256 from "crypto-js/sha256";


export const sessionInfo = {
  AppToken: "AppToken",
  AppLmsToken:"AppLmsToken",
  AppUserData: "AppUserData",
  AppGoogleData: "AppGoogleData",
  AppTokenExpire: "AppTokenExpire",
  AppEncryptedUserIdentity: "AppEncryptedUserIdentity",
};

export const finishAuth = (
  token,
  userData,
  visitorId,
  expires_at,
  googleProfile
) => {
  const encryptedUserIdentity = sha256(visitorId + userData.id)
    .toString()
    .substring(0, 35);
  localStorage.setItem(sessionInfo.AppToken, token);
  localStorage.setItem(
    sessionInfo.AppEncryptedUserIdentity,
    JSON.stringify(encryptedUserIdentity)
  );
  localStorage.setItem(sessionInfo.AppUserData, JSON.stringify(userData));
  localStorage.setItem(
    sessionInfo.AppTokenExpire,
    moment().minute(expires_at)
  );
  localStorage.setItem(
    sessionInfo.AppGoogleData,
    JSON.stringify(googleProfile)
  );
};

export const getToken = () => {
  let token = localStorage.getItem(sessionInfo.AppToken);
  if (token && !isSessionExpired()) {
    return token;
  }
  return null;
};

export const getUserData = () => {
  let userData = localStorage.getItem(sessionInfo.AppUserData);
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const getUserProfile = () => {
  let googleProfile = localStorage.getItem(sessionInfo.AppGoogleData);
  if (googleProfile) {
    return JSON.parse(googleProfile);
  }
  return null;
};

export const isTokenStillValid =  async () => {
try{
  const activeUserProfile =  await Promise.resolve( () => localStorage && localStorage.getItem("token"));    //await getLoggedinUserProfile();
  return activeUserProfile
}catch(err){
  console.log(err)
}
 
};

export const getEncryptedUserIdentity = () => {
  let encryptedUserIdentity = localStorage.getItem(
    sessionInfo.KudaAppEncryptedUserIdentity
  );
  if (encryptedUserIdentity) {
    return JSON.parse(encryptedUserIdentity);
  }
  return null;
};

export const deleteToken = () => {
  localStorage.clear();
};

export const isSessionExpired = () => {
  const expire = localStorage.getItem(sessionInfo.AppTokenExpire);
  if (!expire) {
    return true;
  } else {
    return moment(expire).isBefore(moment());
  }
};
