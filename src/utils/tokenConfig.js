import moment from "moment";
import sha256 from "crypto-js/sha256";

export const sessionInfo = {
  AppToken: "AppToken",
  AppUserData: "AppData",
  AppData: "AppData",
  AppTokenExpire: "AppTokenExpire",
  AppEncryptedUserIdentity: "AppEncryptedUserIdentity",
};

export const finishAuth = (
  token,
  userData,
  visitorId,
  expires_at,
  profile
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
    sessionInfo.AppData,
    JSON.stringify(profile)
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

export const getProfile = () => {
  let profile = localStorage.getItem(sessionInfo.AppData);
  if (profile) {
    return JSON.parse(profile);
  }
  return null;
};

export const getEncryptedUserIdentity = () => {
  let encryptedUserIdentity = localStorage.getItem(
    sessionInfo.AppEncryptedUserIdentity
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
