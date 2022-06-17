import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
    allRestaurants: [],
    isLoading: false,
    error: false,
};
export const loadRestaurants = createAsyncThunk(
    'restaurants/loadRestaurants',
    async (_, thunkAPI) => {
        try {
            const records = await thunkAPI.extra.loadRestaurants();
            return records;
        } catch (error) {
            throw new Error(error);
        }
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
            state.error = false;
        });
        builder.addCase(loadRestaurants.rejected, (state, action) => {
            state.isLoading = false;
            state.error = true;
        });
    },
});

export const {getAllRestaurants, storeRestuarants} = restaurantsSlice.actions;
console.table(restaurantsSlice.actions);
export const getRestaurantsSelector = state => state.restaurants.allRestaurants;
export const getisLoadingSelector = state => state.restaurants.isLoading;
export const getErrorSelector = state => state.restaurants.error;
export default restaurantsSlice.reducer;
