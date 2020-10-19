import { configureStore } from '@reduxjs/toolkit'
import dishesSlice from './dishes';
import commetsSlice from './comments';
import leadersSlice from './leaders';
import promotionsSlice from './leaders';

export default configureStore({
  reducer: {
    dishes: dishesSlice,
    commets: commetsSlice,
    leaders: leadersSlice,
    promotions: promotionsSlice
  }
})