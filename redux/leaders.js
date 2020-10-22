import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetch from 'cross-fetch';
import {baseUrl} from '../shared/baseUrl';

export const fetchLeaders = createAsyncThunk('redux/fetchLeaders',async () => {
    const response = await fetch (baseUrl + 'leaders')
    const leaders = await response.json();
    return leaders
  
  })

export const leadersSlice = createSlice({
    name: 'leaders',
    initialState: {errMess: null,leaders:[],status: 'idle'},
    reducers: {
        ADD_LEADERS: (state, action) => {state.leaders = action.payload}
    },
    extraReducers: {
      [fetchLeaders.pending]: (state, action) => {
        console.log('pending leadrs')
        state.status = 'loading'
      },
      [fetchLeaders.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        console.log('succeeded leadrs')
        state.leaders = action.payload
      },
      [fetchLeaders.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed leadrs')
        state.errMess = action.error.message
      },
    }
})

export const { ADD_LEADERS, LEADERS_LOADING, LEADERS_FAILED} = leadersSlice.actions;
export default leadersSlice.reducer;