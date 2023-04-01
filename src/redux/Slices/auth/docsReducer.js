import { createSlice } from '@reduxjs/toolkit';
import { getDocs } from './ThunkCreators';
//первоначальный стейт
const initialState = {
  docsData: {
    docs: [],
    isLoading: false,
    error: null,
  },
};
//создаем наш слайс таблиц.
export const docsReducer = createSlice({
  name: 'docs',
  initialState,
  reducers: {
    // ас для слайса
    setDocs: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        docs: action.payload,
        isLoading: true,
      },
    }),
    //Изменение состояния ячейки
    changeDocsFulfilled: (state, action) => {
      return {
        ...state,
        docsData: {
          ...state.docsData,
          docs: state.docsData.docs.map((item) => {
            if (item.id === action.payload.id) {
              return action.payload;
            }
            return item;
          }),
          isLoading: true,
        },
      };
    },
    changeDocsUnLoad: (state) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
      },
    }),
    changeDocsRejected: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
        error: action.payload,
      },
    }),
    //Добавление строки в таблицу
    createRowDocsFulfilled: (state, action) => {
      return {
        ...state,
        docsData: {
          ...state.docsData,
          docs: [...state.docsData.docs, action.payload],
          isLoading: false,
          error: null,
        },
      };
    },
    createRowDocsRejected: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
        error: action.payload,
      },
    }),
    createRowDocsLoad: (state) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: true,
      },
    }),
    //Управление стейтом, удаление строки из таблицы
    deleteRowDocsUnLoad: (state) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
      },
    }),
    deleteRowDocsFulfilled: (state, action) => {
      const copyArrDocs = [...state.docsData.docs];
      copyArrDocs.forEach((item, i) => {
        if (item.id === action.payload) {
          copyArrDocs.splice(i, 1);
        }
      });
      return {
        ...state,
        docsData: {
          ...state.docsData,
          docs: copyArrDocs,
          isLoading: false,
          error: null,
        },
      };
    },
    deleteRowDocsRejected: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
  //Экстра редьюсеры, говорят о состоянии санки и изменяют стейт, при каждом состоянии.
  extraReducers: {
    //Слежение за состоянием санки получение таблицы
    [getDocs.pending]: (state) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: true,
      },
    }),
    [getDocs.fulfilled]: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        docs: action.payload.data,
        isLoading: false,
        error: null,
      },
    }),
    [getDocs.rejected]: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
        error: action.payload,
      },
    }),
  },
});

export const {
  setDocs,
  ChangeRow,
  changeDocsFulfilled,
  changeDocsRejected,
  changeDocsUnLoad,
  createRowDocsLoad,
  createRowDocsFulfilled,
  createRowDocsRejected,
  deleteRowDocsRejected,
  deleteRowDocsUnLoad,
  deleteRowDocsFulfilled,
} = docsReducer.actions;
// возвращаем reducer
export default docsReducer.reducer;
