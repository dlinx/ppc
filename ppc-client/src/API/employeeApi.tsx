import axios from "../utils/api";
import { API } from "../Constants/API";

export const GetEmployeeList = () => axios.get(API.GET_EMPLOYEES);
