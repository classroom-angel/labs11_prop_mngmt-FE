import axios from '../../axiosInstance';

const getHelpers = {};
['Issues', 'Tags', 'Comments'].forEach(table => {
  getHelpers[`get${table}`] = async () => await axios.get(table.toLowerCase());
});

export default getHelpers;

export const getIssue = async id => await axios.get(`issues/${id}`);

export const postIssue = async ({ name, notes, state, today }) =>
  await axios.post('issues', {
    name: name,
    notes: notes,
    status: state.issueStatus.toLowerCase(),
    isVisit: state.isVisit,
    organizationId: state.orgID,
    equipmentId: state.eid,
    date: today
  });

export const putIssue = async (id, updates) =>
  await axios.put(`issues/${id}`, updates);

export const delIssue = async id => await axios.delete(`issues/${id}`);

export const getImages = async id => await axios.get(`issues/${id}/images`);

export const postImages = async ({ id, formData }) =>
  await axios.post(`issues/${id}/images`, formData);

export const postTag = async tag => await axios.post(`tags`, tag);

export const delTag = async id => await axios.delete(`tags/${id}`);

export const postComment = async ({ content, userId, issueId }) =>
  await axios.post('comments', {
    content,
    userId,
    issueId
  });

export const delComment = async ({ target }) =>
  await axios.delete(`comments/${target.getAttribute('issue_id')}`);
