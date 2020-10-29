import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

/*
import { useDispatch } from 'react-redux';
const dispatch = useDispatch();
export const postFavorites = createAsyncThunk('redux/postFavorites',async (dishId) => {
  
  })
*/
export const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {favorites:[],status: 'idle'},
    reducers: {
        ADD_FAVORITE: (state, action) => {
            if (state.favorites.some((el) => el === action.payload) ) {    }
            else{
                state.favorites = state.favorites.concat(action.payload)
            }
        }
    }
})

export const { ADD_FAVORITE } = favoritesSlice.actions;
export default favoritesSlice.reducer;