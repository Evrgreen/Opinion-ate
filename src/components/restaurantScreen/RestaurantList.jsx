import React from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

export function RestaurantList({loadRestaurants, restaurants}) {
    React.useEffect(() => {
        loadRestaurants();
    }, [loadRestaurants]);
    if (!restaurants.length) {
        return null;
    }
    return (
        <>
            <ul>
                {restaurants.map(restaurant => (
                    <li key={restaurant.id}>{restaurant.name}</li>
                ))}
            </ul>
        </>
    );
}

RestaurantList.propTypes = {};

export default function WithRedux() {
    const restaurants = useSelector(state => state.restaurants);
    return <RestaurantList restaurants={restaurants} />;
}
