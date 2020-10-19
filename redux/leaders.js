import { createSlice } from '@reduxjs/toolkit';

export const leadersSlice = createSlice({
    name: 'leaders',
    initialState: {isLoading: true,errMess: null,leaders:[]},
    reducers: {
        ADD_LEADERS: (state, action) => {state.leaders = action.payload, state.isLoading=false},
        LEADERS_LOADING: state => {state.isLoading =true},
        LEADERS_FAILED: (state, action) => {state.errMess = action.payload, state.isLoading=false}
    }
})

export const { ADD_LEADERS, LEADERS_LOADING, LEADERS_FAILED} = leadersSlice.actions;
export default leadersSlice.reducer;