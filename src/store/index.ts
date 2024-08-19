import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './reducer';
import {useDispatch} from 'react-redux';

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware => {
//     const middlewares = getDefaultMiddleware();
//     if (__DEV__) {
//       const createDebugger = require('redux-flipper').default;
//       middlewares.push(createDebugger);
//     }
//     return middlewares;
//   },
// });
const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
