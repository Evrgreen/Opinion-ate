import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import RestaurantList from './RestaurantList';
const RestaurantsScreen = () => {
    return (
        <Card>
            <CardContent>
                <Typography variant="h5">Restaurants</Typography>
                <RestaurantList />
            </CardContent>
        </Card>
    );
};

RestaurantsScreen.propTypes = {};

export default RestaurantsScreen;
