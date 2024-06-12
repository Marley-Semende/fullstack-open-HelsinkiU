import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const create = async (newPerson) => {
  const response = await axios.post(baseUrl, newPerson);
  return response.data;
};

export const update = async (id, updatedPerson) => {
  const response = await axios.put(`${baseUrl}/${id}`, updatedPerson);
  return response.data;
};

export const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response.data;
};
