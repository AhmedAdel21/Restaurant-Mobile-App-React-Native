import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetch from 'cross-fetch';
import {baseUrl} from '../shared/baseUrl';


export const fetchComments = createAsyncThunk('redux/fetchComments',async () => {
    const response = await fetch (baseUrl + 'comments')
    const comments = await response.json();
    return comments
  
  })

export function postComments(comment) {
    return async dispatch => {
  
      try {
          const response = await fetch(baseUrl + 'comments', {
            method: "POST",
            body: JSON.stringify(comment),
            headers: {
              "Content-Type": "application/json"
            },
            credentials: "same-origin"
          })
          const comment = await response.json()
          console.log(comment)
          console.log('finish try')
      } 
      catch (error) {
        console.log('in err')
          dispatch(COMMENTS_FAILED(error))
      }
      finally {
        console.log('in finally')
        setTimeout(() => {
          dispatch(ADD_COMMENTS(comment))
        }, 2000)
      }
    }
  }


export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {errMess: null,comments:[],status: 'idle'},
    reducers: {
        ADD_COMMENTS: (state, action) => {state.comments = action.payload},
        COMMENTS_FAILED:(state,action) => {state.errMess = action.payload}
    },
    extraReducers: {
      [fetchComments.pending]: (state, action) => {
        console.log('pending comments')
        state.status = 'loading'
      },
      [fetchComments.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        console.log('succeeded comments')
        state.comments = action.payload
      },
      [fetchComments.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed comments')
        state.errMess = action.error.messag 
      },
    }
})

export const { ADD_COMMENTS, COMMENTS_FAILED} = commentsSlice.actions;
export default commentsSlice.reducer;