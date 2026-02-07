import axios from './axios';

export const getCases = async () => {
  try {
    const response = await axios.get('/cases');
    return response.data;
  } catch (error) {
    console.error('Error fetching cases:', error);
    throw error;
  }
};

export const createCase = async (caseData) => {
  try {
    const response = await axios.post('/cases', caseData);
    return response.data;
  } catch (error) {
    console.error('Error creating case:', error);
    throw error;
  }
};

export const updateCase = async (caseId, updates) => {
  try {
    const response = await axios.put(`/cases/${caseId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating case:', error);
    throw error;
  }
};

export const updateCaseStatus = async (caseId, status) => {
  try {
    const response = await axios.put(`/cases/${caseId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error('Error updating case status:', error);
    throw error;
  }
};

export const deleteCase = async (caseId) => {
  try {
    const response = await axios.delete(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting case:', error);
    throw error;
  }
};

export const getCaseById = async (caseId) => {
  try {
    const response = await axios.get(`/cases/${caseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching case:', error);
    throw error;
  }
};
