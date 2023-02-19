import { configureStore } from '@reduxjs/toolkit'
import tutorialReducer from './slice/filter';

const reducer = {
  filter: tutorialReducer
}

const store = configureStore({
  reducer: reducer,
  devTools: true,
})
export const AppStore = store.getState;
export default store;