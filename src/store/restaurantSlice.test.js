import restaurantReducer, {
    loadRestaurants,
} from '../components/restaurantScreen/restaurantSlice';
import {configureStore} from '@reduxjs/toolkit';

describe('restuarantReducer', () => {
    const sushiPlace = 'sushi place';
    const pizzaPlace = 'pizza place';

    describe('loadRestaurants action', () => {
        it('stores the restaurants', async () => {
            const records = [
                {id: 1, name: sushiPlace},
                {id: 2, name: pizzaPlace},
            ];
            const api = {
                loadRestaurants: () => {
                    console.log('loading....');
                    return Promise.resolve(records);
                },
            };

            const store = configureStore({
                reducer: restaurantReducer,
                middleware: getDefaultMiddleware =>
                    getDefaultMiddleware({thunk: {extraArgument: api}}),
            });
            console.table(store);

            await store.dispatch(loadRestaurants());

            expect(store.getState().allRestaurants).toEqual(records);
        });
    });
});
