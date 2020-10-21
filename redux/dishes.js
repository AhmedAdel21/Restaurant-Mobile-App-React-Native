import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from '../shared/baseUrl';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetch from 'cross-fetch';

export const fetchDishes = createAsyncThunk('redux/fetchDishes',async () => {
  const response = await fetch (baseUrl + 'dishes')
  const dishes = await response.json();
  return dishes;

})

export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {isLoading: true,errMess: null,dishes:[],status: 'idle'},
    reducers: {
        ADD_DISHES: (state, action) => {state.dishes = action.payload, state.isLoading=false},
        DISHES_LOADING: state => {state.isLoading =true},
        DISHES_FAILED: (state, action) => {state.errMess = action.payload, state.isLoading=false}
    },
    extraReducers: {
      [fetchDishes.pending]: (state, action) => {
        console.log('pending')
        state.status = 'loading'
      },
      [fetchDishes.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        console.log('succeeded')
        state.dishes = action.payload
      },
      [fetchDishes.rejected]: (state, action) => {
        state.status = 'failed'
        console.log('failed')
        state.error = action.payload
        console.log(state.error)
      },
    }
})
/*
export function fetchRecipes() {
  return async dispatch => {
    console.log("we are in")

    try {
      const response = await fetch('http://localhost:3001/dishes')
      console.log("haaaaaaaaanet")
      const data = await response.json()
      console.log(data)
      dispatch(ADD_DISHES(data))
    } catch (error) {
      console.log("A7aaaaaaaaaaaaaaaaaa")
    }
  }
}
*/
export const { ADD_DISHES, DISHES_FAILED, DISHES_LOADING} = dishesSlice.actions;
export default dishesSlice.reducer;

