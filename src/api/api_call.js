//js file cause jsx ta screen ma kei render garauna po use garne ho ta, logic ko agi js,
//but actually j use garda ni huncha
//yo js file ma functions banayera basicaly euta function lai default export gareko cham, code sarra hera, you will understand.
import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const refreshToken = JSON.parse(localStorage.getItem("refresh_token"));
const email = localStorage.getItem("email");

const getRequestHeaderDetail = (
  accessToken,
  reqBodyType,
  authentication = true
) => {
  let headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + accessToken,
  };
  switch (reqBodyType) {
    case "NO-AUTH":
      delete headers["Authorization"];
      break;
    case "FORM-DATA":
      headers = {
        ...headers,
        "Content-Type": "multipart/form-data",
      };
      break;
    case "QUERY-STRING":
      headers = {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
  }
  if (!authentication) {
    delete headers["Authorization"];
  }
  console.log(headers, "hhhhh");
  return headers;
};

const handleRefreshToken = async () => {
  const resbody = {
    email: email,
    refresh_token: refreshToken,
  };
  const res = await axios.post(`${baseUrl}/auth/refresh-token`, resbody);
  console.log(res.data.data.access_token, "heeeee");

  return res.data.data.access_token; // Return the new access token
  // When using async/await within an interceptor, you need to ensure that the interceptor returns a Promise.
};

// axios interceptor for refresh token refetch
axios.interceptors.response.use(
  (res) => res,
  async (error) => {
    console.log(error.response.status, "errorkk");
    if (error.response.status === 401) {
      const newToken = await handleRefreshToken();
      console.log(error.config, "config");
      localStorage.setItem("access_token", JSON.stringify(newToken));
      return axios({ ...error.config, newToken });
    }
    return Promise.reject(error);
  }
);

const apiRequest = async (apiDetails, reqData, params) => {
  const { urlEndpoint, requestMethod, reqBodyType, authentication } =
    apiDetails;
  //This line of code appears to be using destructuring assignment in
  //JavaScript to extract specific properties from the apiDetails object and assign them to variables.
  //This is object destructuring syntax in JavaScript. It allows you to extract specific properties
  // from an object and assign them to variables with corresponding names. In this case, it's extracting
  // three properties from the apiDetails object: urlEndpoint, requestMethod, and reqBodyType.
  let accessToken = JSON.parse(localStorage.getItem("access_token"));
  console.log("check");
  const headers = getRequestHeaderDetail(
    accessToken,
    reqBodyType,
    authentication
  );
  const baseUrl = "https://ecommerce-backend-gr3e.onrender.com/api";
  let axiosPayload = {
    baseUrl: "https://ecommerce-backend-gr3e.onrender.com/api",
    url: `${baseUrl}${urlEndpoint}`,
    method: requestMethod,
    responseType: "json",
    timeout: 60 * 3 * 1000,
    headers: headers,
    data: reqData,
    //data bhanne key mai basnuparyo hai ta requestdata cuse it is what it is, axios ma estai garnnuparha
  };
  //   debugger;
  console.log(reqData, "reqData");

  if (params) {
    axiosPayload = {
      ...axiosPayload,
      params: params,
    };
  }
  let apiResponse = await axios.request(axiosPayload);
  console.log(apiResponse.status, "heyy");

  // .then((response) => {
  //   console.log(response.data, "res");
  //   if (response) {
  //     // alert(response.data.d.message);
  //     toast.success(response.data.message);
  //     return response;
  //   }
  // })
  // .catch((error) => error);
  console.log(apiResponse, "hello");

  return apiResponse;
};

export default apiRequest;
