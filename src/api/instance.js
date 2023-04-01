import axios from 'axios';
// import store from '../redux/store';
import Endpoints from './Endpoints';
// Создаем инстанс аксиоса для нашего запроса.
export const axiosInstance = axios.create({
  baseURL: 'https://test.v5.pryaniky.com',
});
const urlSkipAuth = [Endpoints.AUTH.LOGIN];
const urlWithAddId = [Endpoints.USERDOCS.SET, Endpoints.USERDOCS.DELETE];
axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url && urlSkipAuth.includes(config.url)) {
      return config;
    }
    if (config.url && urlWithAddId.includes(config.url)) {
      if (config.data.id) {
        config.url += config.data.id;
      } else if (config.data) {
        config.url += config.data;
      }

      config.headers['Content-Type'] = 'application/json';
    }
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['x-auth'] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
// axiosInstance.interceptors.request.use(
//   (responce) => responce,
//   (error) => {
//     const isLoggedIn = useSelector((state) => state.auth.authData.isLoading);
//     if (
//       error.responce?.status === 401 &&
//       isLoggedIn &&
//       error.request.url !== Endpoints.AUTH.LOGOUT
//     ) {
//       // const store = useStore();
//       // store.dispatch(logoutUser());
//     }
//     throw error;
//   },
// );
