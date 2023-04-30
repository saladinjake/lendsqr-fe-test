import axiosInstance from "./axiosConfig";

export const postCall = async (url, data, params, headerConfig) => {
  const config = {
    headers: {
      ...headerConfig,
    },
    ...params,
  };
  return await axiosInstance.post(url, data, config);
};

export const getCall = async (url, params) => {
  const config = {
    headers: {
    },
    ...params,
  };
  return await axiosInstance.get(url, config);
};

export const postRequest = async ({ url, data }) => {
  const config = {
    headers: {},
  };
  const response = await axiosInstance.post(url, data, config);
  return response?.data || response;
};

export const getRequest = async ({ url }) => {
  const config = {
    headers: {},
  };
  const response = await axiosInstance.get(url, config);
  return response?.data || response;
};

export const putRequest = async ({ url, data }) => {
  const config = {
    headers: {},
  };
  const response = await axiosInstance.put(url, data, config);
  return response?.data || response;
};

export const deleteRequest = async ({ url, data }) => {
  const config = {
    headers: {},
  };
  const response = await axiosInstance.delete(url, config);
  return response?.data || response;
};
