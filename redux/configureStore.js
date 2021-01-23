import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './dishes';
import commetsSlice from './comments';
import leadersSlice from './leaders';
import promotionsSlice from './promotions';
import favoritesSlice from './favorites';


export default configureStore({
  reducer: {
    dishes: dishesSlice,
    comments: commetsSlice,
    leaders: leadersSlice,
    promotions: promotionsSlice,
    favorites: favoritesSlice
  }
})