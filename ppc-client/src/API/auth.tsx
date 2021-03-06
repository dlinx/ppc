import axios, { setAuthResponse, IAuthResponse } from "../utils/api";
import { API } from "../Constants/API";

export const loginUser = async (email: string, password: string) => {
  
  const { data } = await axios.post<IAuthResponse>(API.LOGIN, {
    email,
    password,
  });

  setAuthResponse(data);
  return data;
};

export const logoutUser = async () => {
  await axios.get(API.LOGOUT);
  setAuthResponse({});
};
