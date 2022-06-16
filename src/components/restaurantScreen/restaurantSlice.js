import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    allRestaurants: [],
    isLoading: false,
};
export const loadRestaurants = createAsyncThunk(
    'restaurants/loadRestaurants',
    async (_, thunkAPI) => {
        const records = await thunkAPI.extra.loadRestaurants();
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
            console.log({action});
            const records = action.payload;
            state.allRestaurants = records;
            state.isLoading = false;
        });
        builder.addCase(loadRestaurants.pending, (state, action) => {
            state.isLoading = true;
        });
    },
});

export const {getAllRestaurants, storeRestuarants} = restaurantsSlice.actions;
console.table(restaurantsSlice.actions);
export const getRestaurantsSelector = state => state.restaurants.allRestaurants;
export default restaurantsSlice.reducer;
