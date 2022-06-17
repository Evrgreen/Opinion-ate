import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
    getErrorSelector,
    getisLoadingSelector,
    getRestaurantsSelector,
    loadRestaurants,
} from './restaurantSlice';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';

export function RestaurantList({
    getRestuarants,
    restaurants,
    isLoading,
    loadingError,
}) {
    React.useEffect(() => {
        getRestuarants();
    }, [getRestuarants]);
    if (!restaurants.length) {
        return null;
    }
    return (
        <>
            {loadingError && (
                <Alert severity="error">
                    There was an error loading resaurants
                </Alert>
            )}
            {isLoading && <CircularProgress />}
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
    const isLoading = useSelector(getisLoadingSelector);
    const loadingError = useSelector(getErrorSelector);
    const dispatch = useDispatch();
    const loadRestaurantsWithDispath = React.useCallback(
        () => dispatch(loadRestaurants()),
        [dispatch],
    );
    return (
        <RestaurantList
            restaurants={restaurants}
            getRestuarants={loadRestaurantsWithDispath}
            isLoading={isLoading}
            loadingError={loadingError}
        />
    );
}
