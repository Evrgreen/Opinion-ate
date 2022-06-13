import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getRestaurantsSelector, loadRestaurants} from './restaurantSlice';

export function RestaurantList({getRestuarants, restaurants}) {
    React.useEffect(() => {
        getRestuarants();
    }, [getRestuarants]);
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
    const restaurants = useSelector(getRestaurantsSelector);
    const dispatch = useDispatch();
    const loadRestaurantsWithDispath = React.useCallback(
        () => dispatch(loadRestaurants()),
        [dispatch],
    );
    return (
        <RestaurantList
            restaurants={restaurants}
            getRestuarants={loadRestaurantsWithDispath}
        />
    );
}
