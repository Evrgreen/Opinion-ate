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
    it('should have proper state on init', () => {
        const expectedState = {
            error: false,
            isLoading: false,
            allRestaurants: [],
        };
        const initStore = configureStore({
            reducer: restaurantReducer,
        });
        expect(initStore.getState()).toEqual(expectedState);
    });
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
        });
        describe('While loading data', () => {
            beforeEach(() => {
                setupStore({api: () => new Promise(() => {})});
            });
            it('sets the isLoading flag to true in state', () => {
                expect(store.getState().isLoading).toEqual(true);
            });
            it('sets the error flag to false', () => {
                const errorStore = configureStore({
                    reducer: restaurantReducer,
                    preloadedState: {
                        error: true,
                        allRestaurants: [],
                        isLoading: false,
                    },
                });
                expect(errorStore.getState().error).toEqual(true);
                errorStore.dispatch(loadRestaurants());
                expect(errorStore.getState().error).toEqual(false);
            });
        });
        describe('When an error occurs while loading data', () => {
            beforeEach(() => {
                setupStore({
                    api: () =>
                        Promise.reject(
                            'There was an error loading restuarants',
                        ),
                });
            });
            it('sets an error flag in state', () => {
                expect(store.getState().error).toEqual(true);
            });
        });
    });
});
