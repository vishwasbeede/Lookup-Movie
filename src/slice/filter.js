import { createSlice } from '@reduxjs/toolkit'

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    year: 1950, label: 'yafter' , genere: {
    }, title: '', ratingRange: [1, 10], yearRange: [1950, 2000]
  },
  reducers: {
    setFilter: (state, action) => {
      let data1 = action.payload;
      return state = { ...state, ...data1 }
    }
  }
})

// Action creators
export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
