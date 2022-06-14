import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getRestaurantsSelector, loadRestaurants} from './restaurantSlice';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export function RestaurantList({getRestuarants, restaurants}) {
    React.useEffect(() => {
        getRestuarants();
    }, [getRestuarants]);
    if (!restaurants.length) {
        return null;
    }
    return (
        <>
            <List>
                {restaurants.map(restaurant => (
                    <ListItem key={restaurant.id}>
                        <ListItemText>{restaurant.name}</ListItemText>
                    </ListItem>
                ))}
            </List>
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
