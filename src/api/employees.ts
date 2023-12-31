import axios from "axios";
import request from "./axios";

export const getEmployees = async () => {
  try {
    const response = await axios.get(
      request.defaults.baseURL + "/iam/staff/all/employees"
    );
    const data = response.data;
    return data
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};
