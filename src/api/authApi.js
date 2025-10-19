import axios from "axios";

const API_URL = "https://localhost:7268/api/Auth";

export const register = (data) => axios.post(`${API_URL}/register`, data);
export const login = (data) => axios.post(`${API_URL}/login`, data);
