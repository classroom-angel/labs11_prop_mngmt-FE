import axios from '../../axiosInstance';

const getHelpers = {};
['Issues', 'Tags', 'Comments'].forEach(table => {
  getHelpers[`get${table}`] = async () => await axios.get(table.toLowerCase());
});

export default getHelpers;

export const postIssue = async ({ state, today }) =>
  await axios.post('issues', {
    name: state.issueName,
    notes: state.issueNotes,
    status: state.issueStatus.toLowerCase(),
    isVisit: state.isVisit,
    organizationId: state.orgID,
    equipmentId: state.eid,
    date: today
  });

export const postImages = async ({ id, formData }) =>
  await axios.post(`issues/${id}/images`, formData);

export const delIssue = async ({ id }) => await axios.delete(`issues/${id}`);
