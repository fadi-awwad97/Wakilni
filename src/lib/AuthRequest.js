import axios from 'axios';
import { getTokens } from '../storageProvider';

const serverUrl = 'http://localhost:8000/api';
// Wrapped instance in method to init only on call
// This prevents bugs where getTokens is called when the app
// is instantiated
const getAuthInstance = () => {
  const tokens = getTokens();
  return axios.create({
    baseURL: serverUrl,
    headers: {
      Authorization: `Bearer ${tokens.accessToken}`,
    },
  });
};

export default getAuthInstance;
