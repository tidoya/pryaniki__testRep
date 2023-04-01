import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import { Button } from '@mui/material';
import { logoutUser } from '../../../redux/Slices/auth/ThunkCreators';

const Header = () => {
  const dispatch = useDispatch();
  let isLogged = useSelector((state) => !!state.auth.authData.accessToken);
  isLogged = true;
  return (
    <nav>
      <ul className={styles.ul}>
        {isLogged && (
          <>
            <li className={styles.li}>
              <Link className={styles.link} to="/">
                Main
              </Link>
            </li>
            <li className={styles.li}>
              <Link className={styles.link} to="/about">
                About
              </Link>
            </li>
            <li className={styles.button_logout}>
              <Button variant="contained" onClick={() => dispatch(logoutUser())}>
                logout
              </Button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
