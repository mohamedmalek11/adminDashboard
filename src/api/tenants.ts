import axios from "axios";
import request from "../api/axios";

export const getTenants = async () => {
  try {
    const response = await axios.get(
      request.defaults.baseURL + "/iam/staff/all/tenants"
    );
    const data = response.data;
    return data;
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};

export const updateTenant = async (id: string, props: any) => {
  try {
    const response = await axios.post(
      request.defaults.baseURL + "/iam/staff/all/tenants",
      {
        name: props.name,
      }
    );
    const data = response.data;
    return data;
  } catch (error) {
    return console.error("Error fetching data:", error);
  }
};
