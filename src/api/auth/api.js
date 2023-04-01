import { axiosInstance } from '../instance';
import Endpoints from '../Endpoints';

// Запрос на сервер/аутификация юзера.
export const login = (params) => axiosInstance.post(Endpoints.AUTH.LOGIN, params);
//Запрос на сервер получение таблиц с помощью инстанса
export const getDocsTable = () => axiosInstance.get(Endpoints.USERDOCS.GET);
//Запрос на изменение таблицы.
export const updateDocsTable = (updateDocs) =>
  axiosInstance.post(Endpoints.USERDOCS.SET, updateDocs);
export const createDocsTable = (newDocs) => axiosInstance.post(Endpoints.USERDOCS.CREATE, newDocs);
export const deleteDocsTable = (id) => axiosInstance.post(Endpoints.USERDOCS.DELETE, id);
