import axios from 'axios';

const serverUrl = 'http://localhost:8000/api';
// process.env.REACT_APP_SERVER_URL;

const getGuestInstance = () => {
  
  return axios.create({
    baseURL: serverUrl,
  });
};

export default getGuestInstance;
