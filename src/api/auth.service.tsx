/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";

/*lms config auth*/
let base_url = "https://mocky.io/";

export function _userId(userId: string) {
  if (typeof userId !== "undefined") {
    sessionStorage.setItem("userId", userId);

    return;
  }

  return sessionStorage.getItem("userId");
}

export function _token(token: any) {
  if (typeof token !== "undefined") {
    sessionStorage.setItem("token", token);

    return;
  }

  return sessionStorage.getItem("token");
}

/*enrollment api*/
export const loginUser = async (data: any) => {
  const mockRes = {
    data: {
      user: {
        id: "qwertyiofudiofioid-uiopasdsjjsqwquwqwq-oieiwieiowoieoiwe-kjdksjdjdjs-ewioeuwew",
        employeeNumber: "007",
        middle_name: "James Bond",
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
      status_code: 200,
    },
  };
  const response = await new Promise((resolve, reject) => {
    console.log(data,"...")
    if (
      mockRes.data.user.email === data.email &&
      mockRes.data.user.password === data.password
    ) {
      return resolve(mockRes);
    }

    return reject(mockRes);
  });
  console.log(response);
  return response;
};

export const logoutUser = () => {
  sessionStorage.clear();
  localStorage.clear();
};
