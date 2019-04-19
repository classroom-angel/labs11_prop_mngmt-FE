import axios from 'axios';

export default axios.create({
  baseURL: 'https://classroom-angel-development.herokuapp.com/api/',
  headers: { Authorization: '' }
});
