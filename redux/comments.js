import { createSlice } from '@reduxjs/toolkit';

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {errMess: null,comments:[]},
    reducers: {
        ADD_COMMENTS: (state, action) => {state.comments = action.payload},
        COMMENTS_FAILED: (state, action) => {state.errMess = action.payload}
    }
})

export const { ADD_COMMENTS, COMMENTS_FAILED} = commentsSlice.actions;
export default commentsSlice.reducer;