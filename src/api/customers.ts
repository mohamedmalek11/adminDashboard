import axios from "axios";
import request from "./axios";

export const getCustomers = async () => {
  try {
    const response = await axios.get(
      request.defaults.baseURL + "/iam/staff/all/customers"
    );
    const data = response.data;
    return data
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};
