import { createSlice } from '@reduxjs/toolkit'

const tagsSlice = createSlice({
  name: 'tags',
  initialState: { ids: 1, tags: [{ id: 0, value: '' }] },

  reducers: {
    addTag(state) {
      state.tags.push({ id: state.ids++, value: '' })
    },
    deleteTag(state, action) {
      const { id } = action.payload
      if (state.tags.length === 1) {
        state.tags[0].value = ''
        return
      }
      state.tags = state.tags.filter((tag) => tag.id !== id)
    },
    inputValueChange(state, action) {
      const { id, value } = action.payload
      const changed = state.tags.find((tag) => tag.id === id)
      changed.value = value
    },
    toInitial(state) {
      state.tags = [{ id: 0, value: '' }]
    },
    tagsFromServer(state, action) {
      const { tagList } = action.payload
      if (tagList.length === 0) {
        state.tags = [{ id: 0, value: '' }]
      } else {
        state.tags = tagList.map((tag) => ({ id: state.ids++, value: tag }))
      }
    },
  },
})

export default tagsSlice.reducer
export const { addTag, deleteTag, inputValueChange, toInitial, tagsFromServer } = tagsSlice.actions
