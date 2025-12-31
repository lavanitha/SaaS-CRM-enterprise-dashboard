import axios from './axios';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get('/dashboard');
    return response.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

export const getLeadsStats = async () => {
  try {
    const response = await axios.get('/leads/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching leads stats:', error);
    throw error;
  }
};

export const getCasesStats = async () => {
  try {
    const response = await axios.get('/cases/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching cases stats:', error);
    throw error;
  }
};

export const getTasksStats = async () => {
  try {
    const response = await axios.get('/tasks/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks stats:', error);
    throw error;
  }
};
