import axios from "axios";

const baseUrl = "http://localhost:3001/api/persons";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (newPerson) => {
  try {
    const response = await axios.post(baseUrl, newPerson);
    return { data: response.data };
  } catch (error) {
    return { error: error.response ? error.response.data : "Network error" };
  }
};

export const update = async (id, updatedPerson) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
    return { data: response.data };
  } catch (error) {
    return { error: error.response ? error.response.data : "Network error" };
  }
};

export const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return { data: response.data };
  } catch (error) {
    return { error: error.response ? error.response.data : "Network error" };
  }
};
