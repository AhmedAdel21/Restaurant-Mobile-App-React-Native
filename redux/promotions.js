import { createSlice } from '@reduxjs/toolkit';

export const promotions = createSlice({
    name: 'promotions',
    initialState: {isLoading: true,errMess: null,promotions:[]},
    reducers: {
        ADD_PROMOS: (state, action) => {state.promotions = action.payload, state.isLoading=false},
        PROMOS_LOADING: state => {state.isLoading =true},
        PROMOS_FAILED: (state, action) => {state.errMess = action.payload, state.isLoading=false}
    }
})

export const { ADD_PROMOS, PROMOS_LOADING, PROMOS_FAILED} = promotionsSlice.actions;
export default promotionsSlice.reducer;