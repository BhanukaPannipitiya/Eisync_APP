import axios from "axios";

// const BASE_URL = "http://localhost:3000";

export const register = (formData) => {
  console.log("first", formData);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  return axios.post('http://localhost:3000/addAppliance', formData, config);
};
