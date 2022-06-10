import React from 'react';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RestaurantList from './RestaurantList';

describe('RestaurantList', () => {
    it('loads restaurants on first renderkid', () => {
        const loadRestaurants = jest.fn().mockName('loadRestaurants');
        render(<RestaurantList loadRestaurants={loadRestaurants} />);

        expect(loadRestaurants).toHaveBeenCalledTimes(1);
    });
});
