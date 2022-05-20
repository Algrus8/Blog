import { createSlice } from '@reduxjs/toolkit'

const userSLice = createSlice({
  name: 'user',
  initialState: {
    user: {
      email: null,
      username: null,
      bio: null,
      image: null,
    },
  },
  reducers: {
    authorize(state, action) {
      const { email, username, bio, image } = action.payload
      state.user = { email, username, bio, image }
    },
  },
})

export default userSLice.reducer
export const { authorize } = userSLice.actions
