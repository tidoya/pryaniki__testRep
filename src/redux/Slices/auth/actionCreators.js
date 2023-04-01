import { createDocsTable, deleteDocsTable, updateDocsTable } from '../../../api/auth/api';
import checkError from '../checkError';
import {
  changeDocsFulfilled,
  changeDocsRejected,
  changeDocsUnLoad,
  createRowDocsFulfilled,
  createRowDocsRejected,
  createRowDocsLoad,
  deleteRowDocsFulfilled,
  deleteRowDocsRejected,
  deleteRowDocsUnLoad,
} from './docsReducer';
// action creators
// action смены поля в таблице
export const changeDocs = (updateDocs) => {
  return async (dispatch) => {
    try {
      dispatch(changeDocsFulfilled(updateDocs));
      const { data } = await updateDocsTable(updateDocs);
      checkError(data.error_code, data.error_text);
      dispatch(changeDocsUnLoad());
    } catch (e) {
      console.error(e);
      dispatch(changeDocsRejected(e.message));
    }
  };
};
// action смены поля в таблице
export const createRowDocs = (newDocs) => {
  return async (dispatch) => {
    try {
      dispatch(createRowDocsLoad());
      const { data } = await createDocsTable(newDocs);
      dispatch(createRowDocsFulfilled(data.data));
      checkError(data.error_code, data.error_text);
    } catch (e) {
      console.error(e);
      dispatch(createRowDocsRejected(e.message));
    }
  };
};
// action удаления поля в таблице
export const deleteRowDocs = (updateDocs) => {
  return async (dispatch) => {
    try {
      dispatch(deleteRowDocsFulfilled(updateDocs));
      const { data } = await deleteDocsTable(updateDocs);
      checkError(data.error_code, data.error_text);
      dispatch(deleteRowDocsUnLoad());
    } catch (e) {
      console.error(e);
      dispatch(deleteRowDocsRejected(e.message));
    }
  };
};
