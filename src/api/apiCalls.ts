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
    data:{
      user: {
        id: "qwertyiofudiofioid-uiopasdsjjsqwquwqwq-oieiwieiowoieoiwe-kjdksjdjdjs-ewioeuwew",
        employeeNumber: "007",
        middle_name:"James Bond",
        first_name: "Victor",
        last_name: "Juwa",
        email: "juwavictor@gmail.com",
        password: "lead.developer",
        username: "saladinjake A.K.A  JAMES BOND",
        token: "jde938923982jewioiejwdsjd90-212781625@!#$%^%^&*()(LLJG",
        phone_number: "+234-",
        image_url: "anonymous.jpg",
        roles: [
          {
            name: "SuperAdmin",
          },
        ],
      },
      success: true,
      isAuthenticated: true,
      isSuccessful: true,
      isActive: true,
      access_token: "jde938923982jewioiejwdsjd90-212781625@!#$%^%^&*()(LLJG",
      status_code:200,




    },
    
   
  };
  const response = await new Promise((resolve, reject) => {
    if (
      mockRes.data.user.email === data.email &&
      mockRes.data.user.password === data.password
    ) {
      return resolve(mockRes)
    }

    return reject(mockRes);
  });
  console.log(response);
  return response;
};

export const getCall = async (url, params) => {
  const config = {
    headers: {},
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
