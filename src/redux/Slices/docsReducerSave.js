import { createSlice } from '@reduxjs/toolkit';
import { changeDocs, createRowDocs, deleteRowDocs, getDocs } from './ThunkCreators';
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
  },
  //Экстра редьюсеры, говорят о состоянии санки и изменяют стейт, при каждом состоянии.
  extraReducers: {
    //Слежение за состоянием санки удаление строки из таблицы
    [deleteRowDocs.pending]: (state) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: true,
      },
    }),
    [deleteRowDocs.fulfilled]: (state, action) => {
      const copyArrDocs = [...state.docsData.docs];
      copyArrDocs.forEach((item, i) => {
        if (item.id === action.meta.arg) {
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
    [deleteRowDocs.rejected]: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
        error: action.payload,
      },
    }),

    //Слежение за состоянием санки добавление строки в таблицу
    [createRowDocs.pending]: (state) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: true,
      },
    }),
    [createRowDocs.fulfilled]: (state, action) => {
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
    [createRowDocs.rejected]: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
        error: action.payload,
      },
    }),

    //Слежение за состоянием санки изменение таблицы
    [changeDocs.pending]: (state, action) => {
      console.log(action);
      return {
        ...state,
        docsData: {
          ...state.docsData,
          isLoading: true,
        },
      };
    },
    [changeDocs.fulfilled]: (state, action) => {
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
    [changeDocs.rejected]: (state, action) => ({
      ...state,
      docsData: {
        ...state.docsData,
        isLoading: false,
        error: action.payload,
      },
    }),

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

// экспортируем наши ac
export const { setDocs, ChangeRow } = docsReducer.actions;
// возвращаем reducer
export default docsReducer.reducer;
