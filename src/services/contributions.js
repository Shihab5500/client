
import api from './api';


export const contribute = (contributionData) => {
  return api('/contributions', {
    method: 'POST',
    body: contributionData,
  });
};


export const listByIssue = (issueId) => {
  return api(`/contributions/${issueId}`);
};


export const myContributions = () => {
  return api('/my-contributions');
};