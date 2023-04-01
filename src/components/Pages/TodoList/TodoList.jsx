import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDocs } from '../../../redux/Slices/auth/ThunkCreators';
import BasicTable from './Table/BasicTable';
import styles from './TodoList.module.scss';
const TodoList = () => {
  const dispatch = useDispatch();
  // при мантировании компоненты получаем таблицы
  useEffect(() => {
    dispatch(getDocs());
  }, [dispatch]);
  return (
    <div>
      <div className={styles.auth__container}></div>
      <BasicTable />
    </div>
  );
};

export default TodoList;
