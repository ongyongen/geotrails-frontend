import { createSlice } from '@reduxjs/toolkit'
import { nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { GET_ALL_GEOCACHES_URL } from './routes'
import { Dispatch } from 'react'


export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    geocaches: []
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },

    updateAmount: (state, action) => {
      state.value = action.payload
    },

    saveCaches:(state, action) => {
      state.geocaches = action.payload
    }
  },
})

export const { increment, decrement, incrementByAmount, saveCaches, updateAmount } = counterSlice.actions
export default counterSlice.reducer