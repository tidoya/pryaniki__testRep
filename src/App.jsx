import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Pages/Header/Header';
import Main from './components/Pages/Main/Main';
import { useEffect } from 'react';
import { setUser } from './redux/Slices/auth/authReducer';
import Spinner from './components/Spinner';
import About from './components/Pages/About';

function App() {
  const dispatch = useDispatch();
  //берем токен из стейта
  const isLogged = useSelector((state) => !!state.auth.authData.accessToken);
  //берем лоадер из стета
  const isLoading = useSelector((state) => state.auth.authData.isLoading);
  //Делаем проверку при первом рендере на наличие токена
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // если токен есть диспатчим его в стейт
      dispatch(setUser(localStorage.getItem('token')));
    }
  }, [dispatch]);
  return (
    <div>
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={isLogged ? <About /> : <Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
