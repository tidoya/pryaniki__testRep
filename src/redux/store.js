import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/auth/authReducer';
import docsReducer from './Slices/auth/docsReducer';
// создание нашего стора. "комбайним reducers"
const store = configureStore({
  reducer: {
    auth: authReducer,
    docs: docsReducer,
  },
});
export default store;
