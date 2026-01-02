
import api from './api';


export const getIssues = (filters = {}) => {
  const params = new URLSearchParams();
  
  
  if (filters.search) params.append('search', filters.search);

  if (filters.page) params.append('page', filters.page);
  if (filters.limit) params.append('limit', filters.limit);
  if (filters.category) params.append('category', filters.category);
  if (filters.status) params.append('status', filters.status);
  
  return api(`/issues?${params.toString()}`);
};


export const getRecentIssues = () => {
  return api('/issues/recent');
};


export const getMyIssues = () => {
  return api('/my-issues');
};


export const getIssue = (id) => {
  return api(`/issues/${id}`);
};


export const createIssue = (issueData) => {
  return api('/issues', {
    method: 'POST',
    body: issueData,
  });
};


export const updateIssue = (id, issueData) => {
  return api(`/issues/${id}`, {
    method: 'PUT',
    body: issueData,
  });
};


export const deleteIssue = (id) => {
  return api(`/issues/${id}`, {
    method: 'DELETE',
  });
};


export const getStats = () => {
  return api('/stats');
};