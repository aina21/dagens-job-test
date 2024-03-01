import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/api',
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error: ', error.message);

    if (error.response) {
      console.error(
        'Details - Status:',
        error.response.status,
        'Data:',
        error.response.data,
        'Headers:',
        error.response.headers
      );
    } else if (error.request) {
      console.error('No response received, request details:', error.request);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
