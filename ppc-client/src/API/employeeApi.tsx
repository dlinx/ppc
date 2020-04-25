import axios from "../utils/api";
import { API } from "../Constants/API";

interface IEmployee {
  name?: string;
  email?: string;
  password?: string;
  isAdmin?: boolean;
}

export const GetEmployeeList = () => axios.get(API.EMPLOYEES);

export const getEmployee = (uid: string) =>
  axios.get(`${API.EMPLOYEES}/${uid}`);

export const updateEmployee = (uid: string, body: IEmployee) =>
  axios.put(`${API.EMPLOYEES}/${uid}`, body);

export const createEmployee = <T extends {}>(body: IEmployee) =>
  axios.post<T>(`${API.EMPLOYEES}`, body);

export const deleteEmployees = (uids: string[]) =>
  axios.post(`${API.DELETE_EMPLOYEES}`, { uids });
