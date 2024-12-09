import {configureStore} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './reducer';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';

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
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
