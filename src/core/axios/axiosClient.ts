// axiosClient.ts
import axios from 'axios';

// Create an Axios instance with default settings
const axiosClient = axios.create({
  baseURL: 'http://localhost:3000/api/v1', // Replace with your API base URL
  timeout: 5000, // Set a timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});



export default axiosClient;
