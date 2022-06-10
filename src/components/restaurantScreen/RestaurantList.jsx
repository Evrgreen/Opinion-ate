import React from 'react';
import PropTypes from 'prop-types';

function RestaurantList({loadRestaurants}) {
    React.useEffect(() => {
        loadRestaurants();
    }, [loadRestaurants]);
    return <div>RestaurantList</div>;
}

RestaurantList.propTypes = {};

export default RestaurantList;
