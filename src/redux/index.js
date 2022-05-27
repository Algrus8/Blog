import { combineReducers, configureStore } from '@reduxjs/toolkit'

import userSlice from './userSlice'
import tagsSlice from './tagsSlice'

const rootReducer = combineReducers({
  user: userSlice,
  tags: tagsSlice,
})

export const store = configureStore({
  reducer: rootReducer,
})
