import axios from './axios';

export const getLeads = async (page = 1, limit = 10, search = '') => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...(search && { search })
    });
    
    const response = await axios.get(`/leads?${params}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error);
    throw error;
  }
};

export const createLead = async (leadData) => {
  try {
    const response = await axios.post('/leads', leadData);
    return response.data;
  } catch (error) {
    console.error('Error creating lead:', error);
    throw error;
  }
};

export const updateLead = async (leadId, updates) => {
  try {
    const response = await axios.put(`/leads/${leadId}`, updates);
    return response.data;
  } catch (error) {
    console.error('Error updating lead:', error);
    throw error;
  }
};

export const deleteLead = async (leadId) => {
  try {
    const response = await axios.delete(`/leads/${leadId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting lead:', error);
    throw error;
  }
};
