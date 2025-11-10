
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

// GET /issues/recent (Home পেজের জন্য)
export const getRecentIssues = () => {
  return api('/issues/recent');
};

// GET /my-issues (My Issues পেজের জন্য)
export const getMyIssues = () => {
  return api('/my-issues');
};

// GET /issues/:id (Issue Details পেজের জন্য)
export const getIssue = (id) => {
  return api(`/issues/${id}`);
};

// POST /issues (Add Issue পেজের জন্য)
export const createIssue = (issueData) => {
  return api('/issues', {
    method: 'POST',
    body: issueData,
  });
};

// PUT /issues/:id (My Issues পেজের Update বাটনের জন্য)
export const updateIssue = (id, issueData) => {
  return api(`/issues/${id}`, {
    method: 'PUT',
    body: issueData,
  });
};

// DELETE /issues/:id (My Issues পেজের Delete বাটনের জন্য)
export const deleteIssue = (id) => {
  return api(`/issues/${id}`, {
    method: 'DELETE',
  });
};

// GET /stats (Home পেজের জন্য)
export const getStats = () => {
  return api('/stats');
};