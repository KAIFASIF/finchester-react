import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: "https://finchester.up.railway.app",
  // baseURL: "http://localhost:9090",
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

const handleResponse = (response: AxiosResponse<any>) => {
  if (response.status === 401 || response.status === 403) {
    // localStorage.removeItem('auth');
    // localStorage.removeItem('token');
    // window.location = '/signin' as any;
  }
  return response;
};

api.interceptors.request.use(async (req) => {
  const token =  JSON.parse(localStorage.getItem('token')||"")
  req.headers.Authorization = `Bearer ${token}`;
  return req;
});

api.interceptors.response.use((response) => {
    return handleResponse(response);
  },
  (error) => {
    handleResponse(error.response);
    throw error;
  },
);

export default api;
