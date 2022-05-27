import { createSlice } from '@reduxjs/toolkit'

const userSLice = createSlice({
  name: 'user',
  initialState: {
    email: null,
    username: null,
    bio: null,
    image: null,
    loggedIn: false,
  },
  reducers: {
    authorize(state, action) {
      const { email, username, bio, image } = action.payload
      state.email = email
      state.username = username
      state.bio = bio
      state.image = image
      state.loggedIn = true
    },
    unauthorize(state) {
      state.email = null
      state.username = null
      state.bio = null
      state.image = null
      state.loggedIn = false
    },
  },
})

export default userSLice.reducer
export const { authorize, unauthorize } = userSLice.actions
