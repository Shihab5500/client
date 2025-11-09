// import api from './api';
// export const contribute = (payload) => api.post('/contributions', payload).then(r => r.data);
// export const listByIssue = (issueId) => api.get(`/contributions/by-issue/${issueId}`).then(r => r.data);
// export const myContributions = () => api.get('/contributions/mine').then(r => r.data);



// src/services/contributions.js

import api from './api';

// POST /contributions (Issue Details পেজের Pay বাটনের জন্য)
export const contribute = (contributionData) => {
  return api('/contributions', {
    method: 'POST',
    body: contributionData,
  });
};

// GET /contributions/:issueId (Issue Details পেজের কন্ট্রিবিউটর লিস্ট)
export const listByIssue = (issueId) => {
  return api(`/contributions/${issueId}`);
};

// GET /my-contributions (My Contributions পেজের জন্য)
export const myContributions = () => {
  return api('/my-contributions');
};