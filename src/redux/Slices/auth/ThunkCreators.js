import { createAsyncThunk } from '@reduxjs/toolkit';
import { getDocsTable, login } from '../../../api/auth/api';
import checkError from '../checkError';

// Санка аутификации юзера.
export const loginUser = createAsyncThunk('authReducer/loginUser', async (params) => {
  const { username, password, save } = params;
  const { data } = await login({ username, password });
  checkError(data.error_code, data.error_text);
  const token = data.data.token;
  localStorage.setItem('token', token);

  return token;
});
// Санка логаута юзера(на случай если захотим отправить запрос на сервер).
export const logoutUser = createAsyncThunk('authReducer/logoutUser', async () => {
  localStorage.removeItem('token');
});

//санка получения таблиц
export const getDocs = createAsyncThunk('docsReducer/getDocs', async () => {
  const { data } = await getDocsTable();
  checkError(data.error_code, data.error_text);
  return data;
});
