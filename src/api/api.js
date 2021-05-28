import axios from "axios";
import { BASE_URL } from "../config/index";

axios.defaults.baseURL = `${BASE_URL}`;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Content-Type"] = "application/json";

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error.response);
  }
);

const Api = {
  authenticate: async (data) => {
    try {
      const response = await axios.post("/authenticate", JSON.stringify(data));
      await Api.setToken(response.data.token);
      return response;
    } catch (err) {
      return err;
    }
  },
  getUser: async () => {
    await Api.setAuthToken();
    try {
      const response = await axios.get("/users");
      return response;
    } catch (err) {
      return err;
    }
  },
  logOut: async () => {
    await Api.removeToken();
    const response = await localStorage.getItem("authToken");
    return response;
  },
  setAuthToken: async () => {
    axios.defaults.headers["Authorization"] = await Api.getToken();
  },
  setToken: async (token) => {
    await localStorage.setItem("authToken", token);
  },
  getToken: async () => {
    const authToken = await localStorage.getItem("authToken");
    return authToken;
  },
  removeToken: async () => {
    await localStorage.removeItem("authToken");
  },
};

export default Api;
