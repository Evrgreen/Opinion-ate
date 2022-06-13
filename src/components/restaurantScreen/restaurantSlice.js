import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    allRestaurants: [],
};
export const loadRestaurants = createAsyncThunk(
    'restaurants/loadRestaurants',
    async (_, thunkAPI) => {
        console.log('in loadRestaurant thunk');
        const records = await thunkAPI.extra.loadRestaurants();
        console.table(records);
        return records;
    },
);
export const restaurantsSlice = createSlice({
    name: 'restaurants',
    initialState,
    reducers: {
        storeRestuarants(state, action) {
            console.log(`in storeRestaurants ${action.payload}`);
        },
    },
    extraReducers: builder => {
        builder.addCase(loadRestaurants.fulfilled, (state, action) => {
            const records = action.payload;
            state.allRestaurants = records;
        });
    },
});

export const {getAllRestaurants, storeRestuarants} = restaurantsSlice.actions;
console.table(restaurantsSlice.actions);
export const getRestaurantsSelector = state => state.restaurants.allRestaurants;
export default restaurantsSlice.reducer;
