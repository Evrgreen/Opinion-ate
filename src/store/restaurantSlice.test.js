import restaurantReducer, {
    loadRestaurants,
} from '../components/restaurantScreen/restaurantSlice';
import {configureStore} from '@reduxjs/toolkit';
let store;
const sushiPlace = 'sushi place';
const pizzaPlace = 'pizza place';
const records = [
    {id: 1, name: sushiPlace},
    {id: 2, name: pizzaPlace},
];

const setupStore = async (customConfig = {}) => {
    const api = {
        loadRestaurants: customConfig.api
            ? customConfig.api
            : () => Promise.resolve(records),
    };

    const config = {
        reducer: restaurantReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({thunk: {extraArgument: api}}),
    };
    store = configureStore(config);
    await store.dispatch(loadRestaurants());
};

///tests
describe('restuarantReducer', () => {
    describe('loadRestaurants action', () => {
        describe('When loading is successful', () => {
            beforeEach(() => {
                setupStore();
            });
            it('sets the isLoading flag to false in state', () => {
                expect(store.getState().isLoading).toEqual(false);
            });
            it('stores the restaurants', () => {
                expect(store.getState().allRestaurants).toEqual(records);
            });
            describe('While loading data', () => {
                beforeEach(() => {
                    setupStore({api: () => new Promise(() => {})});
                });
                it('sets the isLoading flage to true in state', () => {
                    expect(store.getState().isLoading).toEqual(true);
                });
            });
        });
    });
});
