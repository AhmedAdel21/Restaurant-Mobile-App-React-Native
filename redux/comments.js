import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetch from 'cross-fetch';
import {baseUrl} from '../shared/baseUrl';


export const fetchComments = createAsyncThunk('redux/fetchComments',async () => {
    const response = await fetch (baseUrl + 'comments')
    const comments = await response.json();
    return comments
  
  })

export const postComments = (rating, author, comment, dishId) => (dispatch) => {
    const newComment = {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
    };
    newComment.date = new Date().toISOString();
    console.log('newComment'+newComment)
    return fetch(baseUrl + 'comments', {
      method: "POST",
      body: JSON.stringify(newComment),
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
  })
  .then(response => {
      if (response.ok) {
        return response;
      } else {
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          throw error;
    })
  .then(response => response.json())
  .then(response => setTimeout(() => {dispatch(ADD_COMMENTS(response))}, 2000) )
  .catch(error =>  { console.log('post comments', error.message); alert('Your comment could not be posted\nError: '+error.message); });
  };
  
  
export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {errMess: null,comments:[],status: 'idle'},
    reducers: {
        ADD_COMMENTS: (state, action) => {state.comments.push(action.payload)},
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