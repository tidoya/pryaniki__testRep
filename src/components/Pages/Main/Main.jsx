import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Login from '../Login/Login';
import TodoList from '../TodoList/TodoList';
import styles from './Main.module.scss';
import Spinner from '../../Spinner';

const Main = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  let isLogged = useSelector((state) => !!state.auth.authData.accessToken);
  // const isLoading = useSelector((state) => state.docs.docsData.isLoading);
  useEffect(() => {
    setLoading(true);
  }, []);
  if (!loading) {
    return <Spinner />;
  }
  return (
    <div className={styles.main}>
      <h1>Docs viewer</h1>
      {isLogged ? <TodoList /> : <Login />}
    </div>
  );
};

export default Main;
