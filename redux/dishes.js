import { createSlice } from '@reduxjs/toolkit';
import baseUrl from '../shared/baseUrl';
export const dishesSlice = createSlice({
    name: 'dishes',
    initialState: {isLoading: true,errMess: null,dishes:[]},
    reducers: {
        ADD_DISHES: (state, action) => {state.dishes = action.payload, state.isLoading=false},
        DISHES_LOADING: state => {state.isLoading =true},
        DISHES_FAILED: (state, action) => {state.errMess = action.payload, state.isLoading=false}
    }
})

export const { ADD_DISHES, DISHES_FAILED, DISHES_LOADING} = dishesSlice.actions;
export default dishesSlice.reducer;

export const fetchDishes = () => (dispatch) =>{
    dispatch(DISHES_LOADING());
    return fetch(baseUrl + 'dishes')
    .then( response => {
        if (response.ok){
            return response;
            }
        else{
            var error = new Error('Error' + response.status + ':' + response.statusText);
            error.response =response;
            throw error;
            }
        }, error => { var errmess =new Error (error.message);
            throw errmess;}
    )
    .then(response => response.json())
    .then(dishes => dispatch(ADD_DISHES(dishes)))
    .catch(error => dispatch(DISHES_FAILED(error.message)));   
}; 