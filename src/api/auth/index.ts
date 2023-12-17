
import { LoginParams } from "src/context/types";
import axios from "../axios";

export default async function loginRequest(data: LoginParams) {

  return await axios.post<void>(`${axios.defaults.baseURL}/iam/auth/staff/login`, data);
}
