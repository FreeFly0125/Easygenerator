/** @format */

import axios from "axios";
import { SignUpData, SignInData, AuthResponse } from "types/auth";

const API_URL = "http://localhost:3000/api";

export const authApi = {
  signUp: async (data: SignUpData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/signup`, data);
    return response.data;
  },

  signIn: async (data: SignInData): Promise<AuthResponse> => {
    const response = await axios.post(`${API_URL}/auth/signin`, data);
    return response.data;
  },
};
