import { Button, Checkbox, FormControlLabel, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/Slices/auth/ThunkCreators';
import styles from './Login.module.scss';

//Компонента логина
const Login = () => {
  const dispatch = useDispatch();
  //Берем данные из ртк для показа ошибки в UI.
  const error = useSelector((state) => !!state.auth.authData.error);
  //локальный стейт логина
  const [login, setLogin] = useState('');
  //локальный стейт пароля
  const [password, setPassword] = useState('');
  //локальный стейт для запоминания
  const [save, setSave] = useState(false);
  //функция при отправке формы.
  const handleSubmit = (e) => {
    e.preventDefault();
    //Диспатчим экшен регистрации.
    dispatch(loginUser({ username: login, password, save }));
  };
  return (
    <div className={styles.container__form}>
      <h1>Autorization</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <div className={styles.form__field}>
            <label className={styles.label__form__login} htmlFor="password">
              Login:
            </label>
            {error ? (
              <TextField
                error
                id="outlined-error-helper-text"
                label="Login"
                helperText="Incorrect login or password."
                name="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            ) : (
              <TextField
                label="Login"
                id="demo-helper-text-aligned"
                helperText="Please enter your login"
                name="login"
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
              />
            )}
          </div>
          <div className={styles.form__field}>
            <label className={styles.label__form__password} htmlFor="password">
              Password:
            </label>
            {error ? (
              <TextField
                error
                id="outlined-error-helper-text"
                label="Password"
                helperText="Incorrect login or password."
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            ) : (
              <TextField
                label="Password"
                id="demo-helper-text-aligned"
                helperText="Please enter your password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            )}
          </div>
          <div className={styles.form__checkbox}>
            <FormControlLabel
              label="remember me"
              value="remember me"
              control={
                <Checkbox
                  checked={save}
                  onChange={(e) => {
                    setSave(e.target.checked);
                  }}
                />
              }
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
