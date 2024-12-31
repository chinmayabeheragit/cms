import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4003'; // AWS deployed backend

// Candidate Login
export const candidateLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/candidate-login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error during candidate login', error);
    throw error;
  }
};

// View Candidate Account Details
export const viewCandidateDetails = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/candidate/viewAccount`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching candidate details', error);
    throw error;
  }
};

// Upload Candidate Files (Profile Picture and Resume)
export const uploadFiles = async (token, fileData) => {
  try {
    const response = await axios.post(`${API_URL}/candidate/uploadFiles`, fileData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading files', error);
    throw error;
  }
};
