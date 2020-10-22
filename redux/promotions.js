import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetch from 'cross-fetch';
import {baseUrl} from '../shared/baseUrl';

export const fetchPromotions = createAsyncThunk('redux/fetchPromotions',async () => {
    const response = await fetch (baseUrl + 'promotions')
    const promotions = await response.json();
    return promotions
  
  })

export const promotionsSlice = createSlice({
    name: 'promotions',
    initialState: {isLoading: true,errMess: null,promotions:[],status: 'idle'},
    reducers: {
        ADD_PROMOS: (state, action) => {state.promotions = action.payload, state.isLoading=false},
        PROMOS_LOADING: state => {state.isLoading =true},
        PROMOS_FAILED: (state, action) => {state.errMess = action.payload, state.isLoading=false}
    },
    extraReducers: {
      [fetchPromotions.pending]: (state, action) => {
        console.log('pending promo')
        state.status = 'loading'
      },
      [fetchPromotions.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        console.log('succeeded promo')
        state.promotions = action.payload
      },
      [fetchPromotions.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed promo')
        state.error = action.payload
        console.log(state.error)
      },
    }
})

export const { ADD_PROMOS, PROMOS_LOADING, PROMOS_FAILED} = promotionsSlice.actions;
export default promotionsSlice.reducer;