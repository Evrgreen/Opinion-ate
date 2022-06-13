import {configureStore} from '@reduxjs/toolkit';
import restaurantReducer from '../components/restaurantScreen/restaurantSlice';
import API from '../api/api';
const store = configureStore({
    reducer: {
        restaurants: restaurantReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({thunk: {extraArgument: API}}),
});
export default store;
