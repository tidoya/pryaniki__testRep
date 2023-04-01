import { createSlice } from '@reduxjs/toolkit';
import { loginUser, logoutUser } from './ThunkCreators';
//первоначальный стейт
const initialState = {
  authData: {
    accessToken: null,
    isLoading: false,
    error: null,
  },
};
//создаем наш слайс.
export const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Три ac для профиля
    setUserStart: (state) => {
      return {
        ...state,
        authData: {
          ...state.docsData,
          isLoading: true,
        },
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        authData: {
          ...state.docsData,
          accessToken: action.payload,
          isLoading: false,
        },
      };
    },
    setUserFailure: (state, action) => {
      return {
        ...state,
        authData: {
          ...state.docsData,
          error: action.payload,
          isLoading: false,
        },
      };
    },
    logOut: (state) => ({
      authData: {
        accessToken: null,
        isLoading: false,
        error: null,
      },
    }),
  },
  //Экстра редьюсеры, говорят о состоянии запроса.
  extraReducers: {
    [loginUser.pending]: (state) => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: true,
      },
    }),
    [loginUser.fulfilled]: (state, action) => ({
      ...state,
      authData: {
        ...state.authData,
        accessToken: action.payload,
        isLoading: false,
        error: null,
      },
    }),
    [loginUser.rejected]: (state, action) => ({
      ...state,
      authData: {
        ...state.authData,
        isLoading: false,
        error: action.error,
      },
    }),
    // Переход в первоначальное состояние(пользователь вышел)
    [logoutUser.fulfilled]: () => initialState,
  },
});

// экспортируем наши ac
export const { logOut, setUser, setUserStart, setUserFailure } = authReducer.actions;
// возвращаем reducer
export default authReducer.reducer;
