import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {baseUrl} from '../shared/baseUrl';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import fetch from 'cross-fetch';
import { DISHES } from '../shared/dishes';


export const fetchDishes = createAsyncThunk('redux/fetchDishes',async () => {
  const response = await fetch (baseUrl + 'dishes')
  
  const dishes = await response.json();
  console.log("bbbbbbb")
  return dishes

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
        // Add any fetched posts to the array
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
/*
export const fetchDishes = () => (dispatch) => {

  dispatch(DISHES_LOADING());

  return fetch(baseUrl + 'dishes')
  .then(response => {
      if (response.ok) {
        console.log('response is Ok');
        return response;
      } else {
        console.log('response is NOT Ok');
        var error = new Error('Error ' + response.status + ': ' + response.statusText);
        error.response = response;
        throw error;
      }
    },
    error => {
          var errmess = new Error(error.message);
          throw errmess;
    })
  .then(response => response.json())
  .then(dishes => dispatch(ADD_DISHES(dishes)))
  .catch(error => dispatch(DISHES_FAILED(error.message)));
};
*/
export const { ADD_DISHES, DISHES_FAILED, DISHES_LOADING} = dishesSlice.actions;
export default dishesSlice.reducer;

