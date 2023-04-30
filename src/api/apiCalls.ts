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

export const postCallMock = async (url, data, params, headerConfig) => {
  const mockRes = {
    user: {
      first_name: "Victor",
      last_name: "Juwa",
      email: "juwavictor@gmail.com",
      password: "lead.developer",
      username: "saladinjake",
      token: "jde938923982jewioiejwdsjd90-212781625@!#$%^%^&*()(LLJG",
      roles: [{
        name: "SuperAdmin"
      }]
    },
    successful: true,
    status: 200,
    isAuthenticated: true,
    isSuccessful: true,
    isActive: true
  };
  const  response = await  new Promise((resolve, reject)=> {

    if(mockRes.user.email == data.email && mockRes.user.password === data.password ){
      return    setTimeout(() =>  resolve(mockRes), 2000)
    }

    return    setTimeout(() =>  reject(mockRes), 2000)
 
  }) 
  return  response
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
