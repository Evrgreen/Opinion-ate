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
    const renderComponent = () => {
        loadRestaurants = jest.fn().mockName('loadRestaurants');
        render(
            <RestaurantList
                getRestuarants={loadRestaurants}
                restaurants={restaurants}
            />,
        );
    };

    it('loads restaurants on first renderkid', () => {
        renderComponent();
        expect(loadRestaurants).toHaveBeenCalledTimes(1);
    });
    it('shows the names of restuarants on the page', () => {
        renderComponent();
        expect(screen.getByText(pizzaPlace)).toBeInTheDocument();
        expect(screen.getByText(sushiPlace)).toBeInTheDocument();
    });
});
