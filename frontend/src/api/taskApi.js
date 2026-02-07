import axios from './axios';

export const getTasks = async () => {
  try {
    const response = await axios.get('/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await axios.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const response = await axios.put(`/tasks/${taskId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`/tasks/${taskId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const getTasksByCase = async (caseId) => {
  try {
    const response = await axios.get(`/tasks/case/${caseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks by case:', error);
    throw error;
  }
};
