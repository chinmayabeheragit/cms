import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4003'; // AWS deployed backend

// Admin Login
export const adminLogin = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error during admin login', error);
    throw error;
  }
};

// Admin Register
export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, adminData);
    return response.data;
  } catch (error) {
    console.error('Error during admin registration', error);
    throw error;
  }
};

// Create Candidate
export const createCandidate = async (token, candidateData) => {
  try {
    const response = await axios.post(`${API_URL}/createCandidate`, candidateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error during candidate creation', error);
    throw error;
  }
};

// Get Candidates
export const getCandidates = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/admin/candidates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching candidates', error);
    throw error;
  }
};

// Delete Candidate
export const deleteCandidate = async (token, candidateId) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteCandidate/${candidateId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting candidate', error);
    throw error;
  }
};
