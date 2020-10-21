import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetch from 'cross-fetch';
import {baseUrl} from '../shared/baseUrl';


export const fetchComments = createAsyncThunk('redux/fetchComments',async () => {
    const response = await fetch (baseUrl + 'comments')
    const comments = await response.json();
    return comments
  
  })
export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {errMess: null,comments:[],status: 'idle'},
    reducers: {
        ADD_COMMENTS: (state, action) => {state.comments = action.payload},
        COMMENTS_FAILED: (state, action) => {state.errMess = action.payload}
    },
    extraReducers: {
      [fetchComments.pending]: (state, action) => {
        console.log('pending')
        state.status = 'loading'
      },
      [fetchComments.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        console.log('succeeded')
        state.comments = action.payload
      },
      [fetchComments.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed')
        state.error = action.payload
        console.log(state.error)
      },
    }
})

export const { ADD_COMMENTS, COMMENTS_FAILED} = commentsSlice.actions;
export default commentsSlice.reducer;