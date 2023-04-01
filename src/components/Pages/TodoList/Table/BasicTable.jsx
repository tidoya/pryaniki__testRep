import { Alert, Button, Snackbar } from '@mui/material';
import { DataGrid, useGridApiRef } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeDocs,
  createRowDocs,
  deleteRowDocs,
} from '../../../../redux/Slices/auth/actionCreators';
import styles from './BasicTable.module.scss';
import Spinner from '../../../Spinner';
import ModalWindow from '../../../Modal';

//функция для преобразования даты в массиве.
const resetObjFromData = (obj) => {
  return {
    ...obj,
    employeeSigDate: new Date(obj.employeeSigDate),
    companySigDate: new Date(obj.companySigDate),
  };
};
const resetObjFromISO = (obj) => {
  return {
    ...obj,
    employeeSigDate: obj.employeeSigDate.toISOString(),
    companySigDate: obj.companySigDate.toISOString(),
  };
};

//Компонента таблицы
const BasicTable = () => {
  const dispatch = useDispatch();
  const rowArr = useSelector((state) => state.docs.docsData.docs);
  const Error = useSelector((state) => state.docs.docsData.error);
  const apiRef = useGridApiRef();
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  //Создание колонок для таблицы
  const columns = [
    { field: 'documentName', headerName: 'Document Name', width: 200, editable: true },
    { field: 'documentType', headerName: 'Document Type', width: 200, editable: true },
    { field: 'documentStatus', headerName: 'Document Status', width: 200, editable: true },
    {
      field: 'companySignatureName',
      headerName: 'Company Signature Name',
      width: 200,
      editable: true,
    },
    {
      field: 'companySigDate',
      headerName: 'Company Sig Date',
      width: 200,
      type: 'date',
      editable: true,
    },
    {
      field: 'employeeSignatureName',
      headerName: 'Employee Signature Name',
      width: 200,
      editable: true,
    },
    { field: 'employeeNumber', width: 200, headerName: 'Employee Number', editable: true },
    {
      field: 'employeeSigDate',
      width: 200,
      headerName: 'Employee Sig Date',
      type: 'date',
      editable: true,
    },
  ];
  //перебираем строки и форматируем дату
  const row = rowArr.map((item) => {
    return resetObjFromData(item);
  });

  const processRowUpdate = React.useCallback(async (newRow) => {
    // диспатчим новою строку с форматированной для хранения датой
    dispatch(changeDocs(resetObjFromISO(newRow)));
    setSnackbar({ children: 'Row changed by user', severity: 'success' });
    return newRow;
  }, []);

  //Хендл добавление строки
  const handleAddRow = () => {
    const newRow = {
      documentStatus: 'test',
      employeeNumber: 'test',
      documentType: 'test',
      documentName: 'test',
      companySignatureName: 'test',
      employeeSignatureName: 'test',
      employeeSigDate: '2022-12-23T11:19:27.017Z\t',
      companySigDate: '2022-12-23T11:19:27.017Z\t',
    };

    //Диспатчим добавление
    dispatch(createRowDocs(newRow));
    setSnackbar({ children: 'New row added', severity: 'success' });
  };
  //Вывод ошибки при краше логики в таблице
  const handleProcessRowUpdateError = React.useCallback((error) => {
    setSnackbar({ children: error.message, severity: 'error' });
  }, []);
  //хендл удаления
  const handleDeleteRow = () => {
    //берем нужную строку, которую выделил пользователь
    const rowIdSelection = apiRef.current.state.rowSelection[0];
    if (!rowIdSelection) {
      setSnackbar({ children: 'Choose needed row', severity: 'error' });
      return;
    }
    setSnackbar({ children: 'Row successfully delete', severity: 'success' });
    //Диспатчим удаление по айди
    dispatch(deleteRowDocs(rowIdSelection));
  };
  if (rowArr.length === 0) {
    return (
      <div className={styles.spinner}>
        <Spinner />;
      </div>
    );
  }
  if (Error) {
    return <ModalWindow />;
  }
  return (
    <>
      {/* кнопка добавление строчки в таблице */}
      <div className={styles.table__container__btnOnTable}>
        <Button variant="outlined" size="small" onClick={handleAddRow}>
          Add a row
        </Button>
        {/* кнопка удаления строчки в таблице */}
        <Button variant="outlined" size="small" onClick={handleDeleteRow}>
          Delete a row
        </Button>
      </div>

      {/* Компонент дата грид из material ui https://mui.com/x/react-data-grid/components/ */}
      <div style={{ height: 600, width: '90%', margin: '0 auto', marginBottom: '50px' }}>
        <DataGrid
          apiRef={apiRef}
          rows={row}
          columns={columns}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
        />
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}>
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </div>
    </>
  );
};

export default BasicTable;
