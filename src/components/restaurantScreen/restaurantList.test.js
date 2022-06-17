import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {RestaurantList} from './RestaurantList';

describe('RestaurantList', () => {
    const pizzaPlace = 'Pizza Place';
    const sushiPlace = 'Sushi Place';
    const restaurants = [
        {id: 1, name: pizzaPlace},
        {id: 2, name: sushiPlace},
    ];
    let loadRestaurants;
    const renderComponent = props => {
        loadRestaurants = jest.fn().mockName('loadRestaurants');
        render(
            <RestaurantList
                getRestuarants={loadRestaurants}
                restaurants={restaurants}
                {...props}
            />,
        );
    };
    describe('On initial render', () => {
        it('fetches restaurants', () => {
            renderComponent();
            expect(loadRestaurants).toHaveBeenCalledTimes(1);
        });
        it("shouldn't show an error message", () => {
            renderComponent();
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });

        it("shouldn't show a loading spinner", () => {
            renderComponent();
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });
    });
    describe('While loading data', () => {
        it('shows a loading spinner to user', () => {
            renderComponent({isLoading: true});
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        });
    });
    describe('When loading completes', () => {
        it('shows the names of restuarants on the page', () => {
            renderComponent();
            expect(screen.getByText(pizzaPlace)).toBeInTheDocument();
            expect(screen.getByText(sushiPlace)).toBeInTheDocument();
        });

        it("doesn't display a loading spinner", () => {
            renderComponent();
            expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
        });
        it("doesn't display an error message", () => {
            renderComponent();
            expect(screen.queryByRole('alert')).not.toBeInTheDocument();
        });
    });
    describe('When there is an Error in loading', () => {
        it('displays an error message to users', () => {
            renderComponent({loadingError: true});
            expect(screen.getByRole('alert')).toBeInTheDocument();
        });
    });
});
